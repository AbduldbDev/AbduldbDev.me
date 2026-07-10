"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function NewExperience() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    startYear: new Date().getFullYear().toString(),
    endYear: "",
    current: false,
    description: "",
    responsibilities: [""],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleResponsibilityChange = (index, value) => {
    const newResponsibilities = [...formData.responsibilities];
    newResponsibilities[index] = value;
    setFormData((prev) => ({ ...prev, responsibilities: newResponsibilities }));
  };

  const addResponsibility = () => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, ""],
    }));
  };

  const removeResponsibility = (index) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const duration = formData.current
        ? `${formData.startYear} - Present`
        : `${formData.startYear} - ${formData.endYear}`;

      await addDoc(collection(db, "experience"), {
        position: formData.position,
        title: formData.position, // For backward compatibility
        company: formData.company,
        startYear: parseInt(formData.startYear),
        endYear: formData.current ? null : parseInt(formData.endYear),
        duration,
        description: formData.description,
        responsibilities: formData.responsibilities.filter((r) => r.trim()),
        createdAt: new Date().toISOString(),
      });

      alert("Experience added successfully!");
      router.push("/admin/experience");
    } catch (error) {
      console.error("Error adding experience:", error);
      alert("Failed to add experience");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="font-headline-sm text-3xl text-text-primary mb-2">
              Add New Experience
            </h1>
            <p className="text-text-muted">
              Fill in the details of your work experience
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass-card p-6 sm:p-8 rounded-xl border border-border-hairline space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Position/Job Title *
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-surface-container border border-border-hairline rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="e.g., Senior Full Stack Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Company *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-surface-container border border-border-hairline rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="e.g., Tech Company Inc."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Start Year *
                </label>
                <input
                  type="text"
                  name="startYear"
                  value={formData.startYear}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-surface-container border border-border-hairline rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  End Year {!formData.current && "*"}
                </label>
                <input
                  type="text"
                  name="endYear"
                  value={formData.endYear}
                  onChange={handleChange}
                  required={!formData.current}
                  disabled={formData.current}
                  className="w-full px-4 py-3 bg-surface-container border border-border-hairline rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
                  placeholder="2026"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="current"
                name="current"
                checked={formData.current}
                onChange={handleChange}
                className="w-4 h-4 text-primary border-border-hairline rounded focus:ring-primary"
              />
              <label
                htmlFor="current"
                className="text-sm text-text-secondary cursor-pointer"
              >
                I currently work here
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-surface-container border border-border-hairline rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                placeholder="Brief description of your role and achievements..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Key Responsibilities
              </label>
              <div className="space-y-3">
                {formData.responsibilities.map((resp, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={resp}
                      onChange={(e) =>
                        handleResponsibilityChange(index, e.target.value)
                      }
                      className="flex-1 px-4 py-3 bg-surface-container border border-border-hairline rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="e.g., Led development of scalable APIs"
                    />
                    {formData.responsibilities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeResponsibility(index)}
                        className="px-3 py-2 bg-surface-container hover:bg-red-500/10 border border-border-hairline hover:border-red-500/30 rounded-lg text-text-secondary hover:text-red-500 transition-all"
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addResponsibility}
                  className="flex items-center gap-2 px-4 py-2 bg-surface-container hover:bg-primary/10 border border-border-hairline hover:border-primary/30 rounded-lg text-text-secondary hover:text-primary transition-all"
                >
                  <span className="material-symbols-outlined">add</span>
                  <span className="text-sm">Add Responsibility</span>
                </button>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 bg-surface-container hover:bg-surface-container-highest border border-border-hairline rounded-lg text-text-secondary hover:text-text-primary transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">save</span>
                    Add Experience
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
