"use client";

import { useEffect, useState } from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { fetchProjects } from "@/data/homeParallax";

export default function HeroParallaxDemo() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();

      // Map Firestore fields to what HeroParallax expects
      const formatted = data.map((project) => ({
        title: project.Title,
        link: project.Link,
        thumbnail: project.Img,
      }));

      setProjects(formatted);
    };

    loadProjects();
  }, []);

  return <HeroParallax products={projects} />;
}
