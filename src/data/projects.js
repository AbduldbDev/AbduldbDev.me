import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebase";

export const fetchProjects = async () => {
  try {
    const q = query(collection(db, "projects-new"), orderBy("Date", "desc"));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const fetchProjectById = async (id) => {
  try {
    const docRef = doc(db, "projects-new", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: "Project not found" };
    }
  } catch (error) {
    console.error("Error fetching project:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Insert a new project document into Firestore.
 *
 * Expected shape:
 * {
 *   Title        : string        — display title
 *   category     : string        — "commission" | "mini" | "personal" | "academic"
 *   description  : string        — short card description
 *   overview     : string[]      — paragraph(s) for the detail page
 *   problems     : string[]      — bullet list of problems solved
 *   solutions    : { title, body }[]
 *   features     : { title, body }[]
 *   stack        : string[]      — tech stack labels
 *   tags         : string[]      — card tags
 *   Img          : string        — cover image URL
 *   heroImage    : string        — hero image URL (can be same as Img)
 *   screenshots  : string[]      — array of screenshot URLs
 *   demoUrl      : string
 *   projectUrl   : string        — GitHub or repo URL
 *   codeSnippet  : string        — optional code block text
 *   snippetFile  : string        — optional filename label for snippet
 *   Date         : Timestamp     — auto-set to now if omitted
 * }
 */
export const insertProject = async (data) => {
  try {
    const payload = {
      ...data,
      Date: data.Date ?? Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, "projects-new"), payload);
    console.log("Project inserted with ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error inserting project:", error);
    return { success: false, error: error.message };
  }
};

export const updateProject = async (id, data) => {
  try {
    const docRef = doc(db, "projects-new", id);
    await updateDoc(docRef, data);
    console.log("Project updated:", id);
    return { success: true, id };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: error.message };
  }
};

export const deleteProject = async (id) => {
  try {
    await deleteDoc(doc(db, "projects-new", id));
    console.log("Project deleted:", id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: error.message };
  }
};
