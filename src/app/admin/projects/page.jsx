"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { fetchProjects, deleteProject } from "@/data/projects";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const loadProjects = async () => {
    setLoading(true);
    const data = await fetchProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setDeleting(id);
    const result = await deleteProject(id);

    if (result.success) {
      setProjects(projects.filter((p) => p.id !== id));
    } else {
      alert("Failed to delete project: " + result.error);
    }
    setDeleting(null);
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="font-headline-sm text-2xl sm:text-3xl text-text-primary mb-1 sm:mb-2">
                Manage Projects
              </h1>
              <p className="text-text-muted text-sm">
                Add, edit, or remove portfolio projects
              </p>
            </div>
            <Link
              href="/admin/projects/new"
              className="z-10 flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base shrink-0"
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">
                add
              </span>
              <span>Add Project</span>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="glass-card p-4 sm:p-6 rounded-xl border border-border-hairline animate-pulse"
                >
                  <div className="h-40 sm:h-48 bg-surface-container rounded mb-4" />
                  <div className="h-5 sm:h-6 bg-surface-container rounded mb-2" />
                  <div className="h-4 bg-surface-container rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="glass-card p-8 sm:p-12 rounded-xl border border-border-hairline text-center">
              <span className="material-symbols-outlined text-text-muted text-5xl sm:text-6xl mb-4 block">
                work_off
              </span>
              <h3 className="font-headline-sm text-lg sm:text-xl text-text-primary mb-2">
                No projects yet
              </h3>
              <p className="text-text-muted text-sm mb-6">
                Start by adding your first project
              </p>
              <Link
                href="/admin/projects/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined">add</span>
                <span>Add Project</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="glass-card rounded-xl border border-border-hairline overflow-hidden group hover:border-primary/30 transition-all"
                >
                  {project.Img && (
                    <div className="aspect-video overflow-hidden bg-surface-container">
                      <img
                        src={project.Img}
                        alt={project.Title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] text-primary font-label-caps uppercase tracking-widest px-2 py-1 bg-primary/10 rounded">
                        {project.category || "project"}
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-base sm:text-lg text-text-primary mb-2 line-clamp-2">
                      {project.Title}
                    </h3>
                    <p className="text-text-muted text-xs sm:text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/projects/edit/${project.id}`}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-surface-container hover:bg-primary/10 border border-border-hairline hover:border-primary/30 rounded-lg text-text-secondary hover:text-primary transition-all text-xs sm:text-sm"
                      >
                        <span className="material-symbols-outlined text-base sm:text-lg">
                          edit
                        </span>
                        <span className="hidden xs:inline">Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deleting === project.id}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-surface-container hover:bg-red-500/10 border border-border-hairline hover:border-red-500/30 rounded-lg text-text-secondary hover:text-red-500 transition-all disabled:opacity-50 text-xs sm:text-sm"
                      >
                        {deleting === project.id ? (
                          <>
                            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                            <span className="hidden xs:inline">
                              Deleting...
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-base sm:text-lg">
                              delete
                            </span>
                            <span className="hidden xs:inline">Delete</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
