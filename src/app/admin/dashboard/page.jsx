"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    projects: 0,
    certificates: 0,
    experience: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsSnap, certsSnap, expSnap] = await Promise.all([
          getDocs(collection(db, "projects")),
          getDocs(collection(db, "certificates")),
          getDocs(collection(db, "experience")),
        ]);

        setStats({
          projects: projectsSnap.size,
          certificates: certsSnap.size,
          experience: expSnap.size,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Projects",
      value: stats.projects,
      icon: "work",
      color: "primary",
      href: "/admin/projects",
    },
    {
      label: "Certificates",
      value: stats.certificates,
      icon: "workspace_premium",
      color: "primary",
      href: "/admin/certificates",
    },
    {
      label: "Experience",
      value: stats.experience,
      icon: "business_center",
      color: "primary",
      href: "/admin/experience",
    },
  ];

  const quickActions = [
    {
      label: "Add Project",
      icon: "add_circle",
      href: "/admin/projects/new",
    },
    {
      label: "Add Certificate",
      icon: "add_circle",
      href: "/admin/certificates/new",
    },
    {
      label: "Add Experience",
      icon: "add_circle",
      href: "/admin/experience/new",
    },
  ];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="font-headline-sm text-3xl text-text-primary mb-2">
              Welcome back, {user?.email?.split("@")[0]}
            </h1>
            <p className="text-text-muted">
              Manage your portfolio content from here
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {loading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="glass-card p-6 rounded-xl border border-border-hairline animate-pulse"
                  >
                    <div className="h-20 bg-surface-container rounded" />
                  </div>
                ))}
              </>
            ) : (
              cards.map((card) => (
                <Link
                  key={card.label}
                  href={card.href}
                  className="glass-card p-6 rounded-xl border border-border-hairline hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      {card.icon}
                    </span>
                    <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors">
                      arrow_forward
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-text-primary mb-2">
                    {card.value}
                  </div>
                  <div className="text-text-muted text-sm">{card.label}</div>
                </Link>
              ))
            )}
          </div>

          {/* Quick Actions */}
          <div className="glass-card p-6 rounded-xl border border-border-hairline">
            <h2 className="font-headline-sm text-xl text-text-primary mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 p-4 bg-surface-container hover:bg-primary/10 border border-border-hairline hover:border-primary/30 rounded-lg transition-all group"
                >
                  <span className="material-symbols-outlined text-primary text-2xl">
                    {action.icon}
                  </span>
                  <span className="text-text-secondary group-hover:text-text-primary font-medium">
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
