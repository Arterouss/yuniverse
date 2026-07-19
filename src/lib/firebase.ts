import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  increment,
  serverTimestamp
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { Project } from "@/types";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

const COLLECTION_NAME = "projects";

// Fetch projects with optional filters
export async function getProjects(options?: {
  onlyPublished?: boolean;
  onlyFeatured?: boolean;
  category?: string;
  searchQuery?: string;
}): Promise<Project[]> {
  try {
    const projectsRef = collection(db, COLLECTION_NAME);
    let q = query(projectsRef);

    if (options?.onlyPublished) {
      q = query(q, where("isPublished", "==", true));
    }
    if (options?.onlyFeatured) {
      q = query(q, where("isFeatured", "==", true));
    }
    if (options?.category && options.category !== "All") {
      q = query(q, where("category", "==", options.category));
    }

    const snapshot = await getDocs(q);
    let projects: Project[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    } as Project));

    // Sort by createdAt descending
    projects.sort((a, b) => {
      const timeA = typeof a.createdAt === 'number' ? a.createdAt : new Date(a.createdAt || 0).getTime();
      const timeB = typeof b.createdAt === 'number' ? b.createdAt : new Date(b.createdAt || 0).getTime();
      return timeB - timeA;
    });

    if (options?.searchQuery && options.searchQuery.trim() !== "") {
      const lowQuery = options.searchQuery.toLowerCase();
      projects = projects.filter(
        (p) =>
          p.title.toLowerCase().includes(lowQuery) ||
          p.tagline.toLowerCase().includes(lowQuery) ||
          p.overview.toLowerCase().includes(lowQuery) ||
          p.technologies.some((tech) => tech.toLowerCase().includes(lowQuery)) ||
          p.category.toLowerCase().includes(lowQuery)
      );
    }

    return projects;
  } catch (error) {
    console.error("Error fetching projects from Firestore:", error);
    return [];
  }
}

// Fetch single project by Slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const projectsRef = collection(db, COLLECTION_NAME);
    const q = query(projectsRef, where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const docSnap = snapshot.docs[0];
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Project;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}

// Fetch single project by ID
export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Project;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return null;
  }
}

// Create new project
export async function createProject(projectData: Omit<Project, 'id'>): Promise<string> {
  try {
    const projectsRef = collection(db, COLLECTION_NAME);
    const now = Date.now();
    const payload = {
      ...projectData,
      createdAt: now,
      updatedAt: now,
      githubClicks: projectData.githubClicks || 0,
      liveDemoClicks: projectData.liveDemoClicks || 0,
    };
    const docRef = await addDoc(projectsRef, payload);
    return docRef.id;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

// Update project
export async function updateProject(id: string, projectData: Partial<Project>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...projectData,
      updatedAt: Date.now(),
    });
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

// Delete project
export async function deleteProject(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}

// Increment click counters
export async function incrementProjectClicks(id: string, type: 'github' | 'liveDemo'): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    if (type === 'github') {
      await updateDoc(docRef, { githubClicks: increment(1) });
    } else {
      await updateDoc(docRef, { liveDemoClicks: increment(1) });
    }
  } catch (error) {
    console.error(`Error incrementing ${type} clicks:`, error);
  }
}
