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

// In-memory SWR cache for instant 0ms responses across page navigations
const memoryCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes

// Fetch projects with optional filters + instant SWR caching
export async function getProjects(options?: {
  onlyPublished?: boolean;
  onlyFeatured?: boolean;
  category?: string;
  searchQuery?: string;
}): Promise<Project[]> {
  const cacheKey = `projects_cache_${JSON.stringify(options || {})}`;

  // 1. Check fast in-memory cache
  const mem = memoryCache.get(cacheKey);
  if (mem && Date.now() - mem.timestamp < CACHE_TTL_MS) {
    return mem.data;
  }

  // 2. Check persistent localStorage cache for instant cold load rendering
  if (typeof window !== "undefined") {
    const local = localStorage.getItem(cacheKey);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed && Array.isArray(parsed.data) && Date.now() - parsed.timestamp < 15 * 60 * 1000) {
          memoryCache.set(cacheKey, parsed);
          // Trigger silent background refresh
          setTimeout(() => fetchAndCacheProjects(options, cacheKey).catch(() => {}), 100);
          return parsed.data;
        }
      } catch (e) {}
    }
  }

  return await fetchAndCacheProjects(options, cacheKey);
}

async function fetchAndCacheProjects(options: any, cacheKey: string): Promise<Project[]> {
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
          p.technologies.some((tech: string) => tech.toLowerCase().includes(lowQuery)) ||
          p.category.toLowerCase().includes(lowQuery)
      );
    }

    // Save fresh data to in-memory and local storage caches
    const cachePayload = { data: projects, timestamp: Date.now() };
    memoryCache.set(cacheKey, cachePayload);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(cacheKey, JSON.stringify(cachePayload));
      } catch (e) {}
    }

    return projects;
  } catch (error) {
    console.error("Error fetching projects from Firestore:", error);
    return [];
  }
}

// Fetch single project by Slug + instant SWR caching
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const cacheKey = `project_slug_${slug}`;

  // 1. Check in-memory cache
  const mem = memoryCache.get(cacheKey);
  if (mem && Date.now() - mem.timestamp < CACHE_TTL_MS) {
    return mem.data;
  }

  // 2. Check localStorage cache
  if (typeof window !== "undefined") {
    const local = localStorage.getItem(cacheKey);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed && parsed.data && Date.now() - parsed.timestamp < 15 * 60 * 1000) {
          memoryCache.set(cacheKey, parsed);
          setTimeout(() => fetchAndCacheBySlug(slug, cacheKey).catch(() => {}), 100);
          return parsed.data;
        }
      } catch (e) {}
    }
  }

  return await fetchAndCacheBySlug(slug, cacheKey);
}

async function fetchAndCacheBySlug(slug: string, cacheKey: string): Promise<Project | null> {
  try {
    const projectsRef = collection(db, COLLECTION_NAME);
    const q = query(projectsRef, where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const docSnap = snapshot.docs[0];
    const project = {
      id: docSnap.id,
      ...docSnap.data(),
    } as Project;

    const cachePayload = { data: project, timestamp: Date.now() };
    memoryCache.set(cacheKey, cachePayload);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(cacheKey, JSON.stringify(cachePayload));
      } catch (e) {}
    }

    return project;
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

// Helper to invalidate SWR cache immediately on mutation
export function clearProjectsCache() {
  memoryCache.clear();
  if (typeof window !== "undefined") {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("projects_cache_") || key.startsWith("project_slug_")) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {}
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
    clearProjectsCache();
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
    clearProjectsCache();
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
    clearProjectsCache();
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
