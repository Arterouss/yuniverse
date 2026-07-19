import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

// Private target email - completely hidden from public browser/inspect element
const PRIVATE_DESTINATION_EMAIL = "yulverynthbusiness@gmail.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // 1. Save inquiry securely into Cloud Firestore 'inquiries' collection
    try {
      await addDoc(collection(db, "inquiries"), {
        name,
        email,
        subject: subject || "General Inquiry",
        budget: budget || "Not specified",
        message,
        createdAt: Date.now(),
      });
    } catch (dbErr) {
      console.warn("Could not save to Firestore inquiries collection:", dbErr);
    }

    // 2. Dispatch email notification directly to private email (yulverynthbusiness@gmail.com) via FormSubmit AJAX service
    // Note: Since this fetch runs on the Node.js server side, your email is 100% INVISIBLE to website visitors!
    try {
      await fetch(`https://formsubmit.co/ajax/${PRIVATE_DESTINATION_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `🚀 [Portfolio Inquiry] ${subject || "New Message"} — from ${name}`,
          Name: name,
          Sender_Email: email,
          Subject: subject,
          Budget_Range: budget,
          Message: message,
          _template: "table",
        }),
      });
    } catch (emailErr) {
      console.error("Failed to forward email via FormSubmit:", emailErr);
    }

    return NextResponse.json({ success: true, message: "Inquiry sent successfully!" });
  } catch (error) {
    console.error("API /api/contact error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred while sending your inquiry." },
      { status: 500 }
    );
  }
}
