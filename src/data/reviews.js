import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";

export const fetchReviews = async () => {
  try {
    const q = query(
      collection(db, "portfolio-comments"),
      orderBy("createdAt", "desc"),
    );

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
