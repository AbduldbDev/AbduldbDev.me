"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import { addCertificate } from "@/data/certificates";

export default function NewCertificate() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    provider: "",
    year: new Date().getFullYear().toString(),
    category: "Professional",
    Img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await addCertificate(formData);

    if (result.success) {
      alert("Certificate added successfully!");
      router.push("/admin/certificates");
    } else {
      alert("Failed to add certificate: " + result.error);
    }

    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="font-headline-sm text-2xl sm:text-3xl text-text-primary mb-2">
              Add New Certificate
            </h1>
            <p className="text-text-muted text-sm">
              Fill in the details of your certification
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
                disabled={loading}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">
                      save
                    </span>
                    <span>Add Certificate</span>
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
