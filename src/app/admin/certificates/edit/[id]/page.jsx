"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import { fetchCertById, updateCertificate } from "@/data/certificates";

export default function EditCertificate() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const loadCertificate = async () => {
      const result = await fetchCertById(params.id);
      if (result.success) {
        const data = result.data;
        setFormData({
          title: data.title || data.image || "",
          provider: data.provider || "",
          year: data.year || new Date().getFullYear().toString(),
          category: data.category || "Professional",
          Img: data.Img || "",
        });
      } else {
        alert("Failed to load certificate");
        router.push("/admin/certificates");
      }
      setLoading(false);
    };

    if (params.id) {
      loadCertificate();
    }
  }, [params.id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const result = await updateCertificate(params.id, formData);

    if (result.success) {
      alert("Certificate updated successfully!");
      router.push("/admin/certificates");
    } else {
      alert("Failed to update certificate: " + result.error);
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-text-muted text-sm">Loading certificate...</p>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  if (!formData) {
    return null;
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="font-headline-sm text-2xl sm:text-3xl text-text-primary mb-2">
              Edit Certificate
            </h1>
            <p className="text-text-muted text-sm">
              Update the certificate details
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass-card p-5 sm:p-6 md:p-8 rounded-xl border border-border-hairline space-y-5 sm:space-y-6"
          >
            <div>
              <label className="block text-xs sm:text-sm font-medium text-text-secondary mb-2">
                Certificate Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface-container border border-border-hairline rounded-lg text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="e.g., AWS Certified Solutions Architect"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-text-secondary mb-2">
                Provider/Issuer *
              </label>
              <input
                type="text"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface-container border border-border-hairline rounded-lg text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="e.g., Amazon Web Services"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-text-secondary mb-2">
                  Year *
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface-container border border-border-hairline rounded-lg text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="2024"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-text-secondary mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface-container border border-border-hairline rounded-lg text-text-primary text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                >
                  <option value="Professional">Professional</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Participation">Participation</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-text-secondary mb-2">
                Certificate Image URL *
              </label>
              <input
                type="url"
                name="Img"
                value={formData.Img}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface-container border border-border-hairline rounded-lg text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="https://example.com/certificate.jpg"
              />
              {formData.Img && (
                <div className="mt-4 border border-border-hairline rounded-lg overflow-hidden">
                  <img
                    src={formData.Img}
                    alt="Preview"
                    className="w-full h-48 sm:h-64 object-contain bg-surface-container"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-surface-container hover:bg-surface-container-highest border border-border-hairline rounded-lg text-text-secondary hover:text-text-primary transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">
                      save
                    </span>
                    <span>Update Certificate</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
