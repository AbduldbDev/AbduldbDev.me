"use client";

import { useState, useEffect } from "react";
import AnimatedStat from "@/components/ui/animatedStat";
import { db } from "@/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export default function Statistics() {
  const [stats, setStats] = useState({
    projects: 0,
    certificates: 0,
    experience: 3, // Default to 3 if calculation fails
    visits: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1. Fetch total projects from projects-new collection
        const projectsSnapshot = await getDocs(collection(db, "projects-new"));
        const projectsCount = projectsSnapshot.size;

        // 2. Fetch professional certificates only
        const certsSnapshot = await getDocs(collection(db, "certificates"));
        const professionalCerts = certsSnapshot.docs.filter(
          (doc) => doc.data().category === "Professional",
        );
        const certsCount = professionalCerts.length;

        // 3. Calculate years of experience (from 2023 to current year)
        const currentYear = new Date().getFullYear();
        const startYear = 2023;
        const yearsOfExperience = currentYear - startYear;

        // 4. Fetch visit count from analytics collection
        const analyticsRef = doc(db, "analytics", "visits");
        const analyticsDoc = await getDoc(analyticsRef);
        const visitsCount = analyticsDoc.exists()
          ? analyticsDoc.data().count || 0
          : 0;

        setStats({
          projects: projectsCount,
          certificates: certsCount,
          experience: yearsOfExperience,
          visits: visitsCount,
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
        // Set default values on error
        setStats({
          projects: 10,
          certificates: 2,
          experience: 3,
          visits: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="py-10 sm:py-12 border-y border-border-hairline bg-surface-container-lowest/30">
      <div className="px-5 sm:px-6 md:px-margin-desktop max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-gutter">
          <div
            data-aos="fade-up"
            data-aos-delay="0"
            className="flex flex-col items-center md:items-start p-4 sm:p-6 border-l border-primary/20"
          >
            {loading ? (
              <div className="h-12 w-20 bg-surface-container animate-pulse rounded mb-2" />
            ) : (
              <AnimatedStat value={stats.projects} suffix="+" />
            )}
            <span className="font-label-caps text-label-caps-xs sm:text-label-caps text-text-muted uppercase tracking-widest text-center md:text-left">
              Projects
            </span>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="flex flex-col items-center md:items-start p-4 sm:p-6 border-l border-primary/20"
          >
            {loading ? (
              <div className="h-12 w-20 bg-surface-container animate-pulse rounded mb-2" />
            ) : (
              <AnimatedStat value={stats.certificates} suffix="+" />
            )}
            <span className="font-label-caps text-label-caps-xs sm:text-label-caps text-text-muted uppercase tracking-widest text-center md:text-left">
              Certifications
            </span>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex flex-col items-center md:items-start p-4 sm:p-6 border-l border-primary/20"
          >
            {loading ? (
              <div className="h-12 w-20 bg-surface-container animate-pulse rounded mb-2" />
            ) : (
              <AnimatedStat value={stats.experience} suffix="+" />
            )}
            <span className="font-label-caps text-label-caps-xs sm:text-label-caps text-text-muted uppercase tracking-widest text-center md:text-left">
              Years Experience
            </span>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex flex-col items-center md:items-start p-4 sm:p-6 border-l border-primary/20"
          >
            {loading ? (
              <div className="h-12 w-20 bg-surface-container animate-pulse rounded mb-2" />
            ) : (
              <AnimatedStat value={stats.visits} suffix="+" />
            )}
            <span className="font-label-caps text-label-caps-xs sm:text-label-caps text-text-muted uppercase tracking-widest text-center md:text-left">
              Portfolio Visits
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
