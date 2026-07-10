import { collection, getDocs } from "firebase/firestore";
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
