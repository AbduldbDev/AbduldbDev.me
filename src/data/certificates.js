import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

export const fetchCerts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "certificates"));

    const certs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return certs;
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return [];
  }
};

export const fetchCertById = async (id) => {
  try {
    const docRef = doc(db, "certificates", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: "Certificate not found" };
    }
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return { success: false, error: error.message };
  }
};

export const addCertificate = async (data) => {
  try {
    const payload = {
      ...data,
      image: data.title, // For backward compatibility
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "certificates"), payload);
    console.log("Certificate added with ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding certificate:", error);
    return { success: false, error: error.message };
  }
};

export const updateCertificate = async (id, data) => {
  try {
    const docRef = doc(db, "certificates", id);
    const payload = {
      ...data,
      image: data.title, // For backward compatibility
    };
    await updateDoc(docRef, payload);
    console.log("Certificate updated:", id);
    return { success: true, id };
  } catch (error) {
    console.error("Error updating certificate:", error);
    return { success: false, error: error.message };
  }
};

export const deleteCertificate = async (id) => {
  try {
    await deleteDoc(doc(db, "certificates", id));
    console.log("Certificate deleted:", id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting certificate:", error);
    return { success: false, error: error.message };
  }
};
