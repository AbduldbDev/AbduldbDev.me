import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";

export const fetchProjects = async () => {
  try {
    const q = query(collection(db, "projects-new"), orderBy("Date", "desc"));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        title: data.Title,
        link: data.Link,
        thumbnail: data.Img,
        ...data,
      };
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};
