"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { db } from "@/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function AdminExperience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchExperiences = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "experience"));
      const expData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExperiences(
        expData.sort((a, b) => (b.startYear || 0) - (a.startYear || 0)),
      );
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    setDeleting(id);
    try {
      await deleteDoc(doc(db, "experience", id));
      setExperiences(experiences.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error deleting experience:", error);
      alert("Failed to delete experience");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-headline-sm text-3xl text-text-primary mb-2">
                Manage Experience
              </h1>
              <p className="text-text-muted">
                Add, edit, or remove work experience entries
              </p>
            </div>
            <Link
              href="/admin/experience/new"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <span className="material-symbols-outlined">add</span>
              <span>Add Experience</span>
            </Link>
          </div>

          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="glass-card p-6 rounded-xl border border-border-hairline animate-pulse"
                >
                  <div className="h-6 bg-surface-container rounded mb-4 w-1/3" />
                  <div className="h-4 bg-surface-container rounded mb-2 w-1/2" />
                  <div className="h-4 bg-surface-container rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : experiences.length === 0 ? (
            <div className="glass-card p-12 rounded-xl border border-border-hairline text-center">
              <span className="material-symbols-outlined text-text-muted text-6xl mb-4 block">
                business_center
              </span>
              <h3 className="font-headline-sm text-xl text-text-primary mb-2">
                No experience entries yet
              </h3>
              <p className="text-text-muted mb-6">
                Start by adding your first work experience
              </p>
              <Link
                href="/admin/experience/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined">add</span>
                <span>Add Experience</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="glass-card p-6 rounded-xl border border-border-hairline hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-headline-sm text-xl text-text-primary mb-2">
                        {exp.position || exp.title}
                      </h3>
                      <p className="text-primary font-medium mb-2">
                        {exp.company}
                      </p>
                      <p className="text-text-muted text-sm mb-4">
                        {exp.duration ||
                          `${exp.startYear} - ${exp.endYear || "Present"}`}
                      </p>
                      {exp.description && (
                        <p className="text-text-secondary mb-4">
                          {exp.description}
                        </p>
                      )}
                      {exp.responsibilities &&
                        exp.responsibilities.length > 0 && (
                          <ul className="list-disc list-inside text-text-secondary text-sm space-y-1">
                            {exp.responsibilities
                              .slice(0, 3)
                              .map((resp, idx) => (
                                <li key={idx}>{resp}</li>
                              ))}
                            {exp.responsibilities.length > 3 && (
                              <li className="text-text-muted">
                                +{exp.responsibilities.length - 3} more
                              </li>
                            )}
                          </ul>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <Link
                        href={`/admin/experience/edit/${exp.id}`}
                        className="flex items-center gap-2 px-4 py-2 bg-surface-container hover:bg-primary/10 border border-border-hairline hover:border-primary/30 rounded-lg text-text-secondary hover:text-primary transition-all"
                      >
                        <span className="material-symbols-outlined text-lg">
                          edit
                        </span>
                        <span className="text-sm">Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        disabled={deleting === exp.id}
                        className="flex items-center gap-2 px-4 py-2 bg-surface-container hover:bg-red-500/10 border border-border-hairline hover:border-red-500/30 rounded-lg text-text-secondary hover:text-red-500 transition-all disabled:opacity-50"
                      >
                        {deleting === exp.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm">Deleting...</span>
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-lg">
                              delete
                            </span>
                            <span className="text-sm">Delete</span>
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
