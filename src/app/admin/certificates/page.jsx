"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { fetchCerts, deleteCertificate } from "@/data/certificates";

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const loadCertificates = async () => {
    setLoading(true);
    const data = await fetchCerts();
    setCertificates(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;

    setDeleting(id);
    const result = await deleteCertificate(id);

    if (result.success) {
      setCertificates(certificates.filter((c) => c.id !== id));
    } else {
      alert("Failed to delete certificate: " + result.error);
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
                Manage Certificates
              </h1>
              <p className="text-text-muted text-sm">
                Add, edit, or remove certifications
              </p>
            </div>
            <Link
              href="/admin/certificates/new"
              className="z-10 flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base shrink-0"
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">
                add
              </span>
              <span>Add Certificate</span>
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
          ) : certificates.length === 0 ? (
            <div className="glass-card p-8 sm:p-12 rounded-xl border border-border-hairline text-center">
              <span className="material-symbols-outlined text-text-muted text-5xl sm:text-6xl mb-4 block">
                workspace_premium
              </span>
              <h3 className="font-headline-sm text-lg sm:text-xl text-text-primary mb-2">
                No certificates yet
              </h3>
              <p className="text-text-muted text-sm mb-6">
                Start by adding your first certificate
              </p>
              <Link
                href="/admin/certificates/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined">add</span>
                <span>Add Certificate</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="glass-card rounded-xl border border-border-hairline overflow-hidden group hover:border-primary/30 transition-all"
                >
                  {cert.Img && (
                    <div className="aspect-[1.414/1] overflow-hidden bg-surface-container">
                      <img
                        src={cert.Img}
                        alt={cert.title || cert.image}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-primary font-label-caps uppercase tracking-widest">
                        {cert.year}
                      </span>
                      {cert.category && (
                        <span className="text-[9px] text-text-muted px-2 py-1 bg-surface-container rounded uppercase font-label-caps tracking-wide">
                          {cert.category}
                        </span>
                      )}
                    </div>
                    <h3 className="font-headline-sm text-base sm:text-lg text-text-primary mb-1 line-clamp-2">
                      {cert.title || cert.image}
                    </h3>
                    {cert.provider && (
                      <p className="text-text-muted text-xs sm:text-sm mb-4 truncate">
                        {cert.provider}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/certificates/edit/${cert.id}`}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-surface-container hover:bg-primary/10 border border-border-hairline hover:border-primary/30 rounded-lg text-text-secondary hover:text-primary transition-all text-xs sm:text-sm"
                      >
                        <span className="material-symbols-outlined text-base sm:text-lg">
                          edit
                        </span>
                        <span className="hidden xs:inline">Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(cert.id)}
                        disabled={deleting === cert.id}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-surface-container hover:bg-red-500/10 border border-border-hairline hover:border-red-500/30 rounded-lg text-text-secondary hover:text-red-500 transition-all disabled:opacity-50 text-xs sm:text-sm"
                      >
                        {deleting === cert.id ? (
                          <>
                            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                            <span className="hidden xs:inline text-xs">
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
