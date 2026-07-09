"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import { fetchProjectById, updateProject } from "@/data/projects";

const inputCls =
  "w-full bg-canvas border border-border-hairline text-text-primary text-sm rounded p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-muted/50";

const Label = ({ text, hint }) => (
  <div className="mb-1.5">
    <span className="font-label-caps text-[10px] text-text-muted uppercase tracking-widest">
      {text}
    </span>
    {hint && (
      <span className="ml-2 text-[11px] text-text-muted normal-case tracking-normal">
        — {hint}
      </span>
    )}
  </div>
);

const Section = ({ title, children }) => (
  <div className="glass-card p-5 sm:p-6 rounded-xl space-y-5">
    <h2 className="text-[16px] font-semibold text-text-primary border-b border-border-hairline pb-3">
      {title}
    </h2>
    {children}
  </div>
);

const toArray = (str) =>
  str
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);

const toObjectArray = (str) =>
  str
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(" — ");
      if (idx === -1) return { title: line, body: "" };
      return {
        title: line.slice(0, idx).trim(),
        body: line.slice(idx + 3).trim(),
      };
    });

const fromArray = (arr) => (Array.isArray(arr) ? arr.join("\n") : "");

const fromObjectArray = (arr) =>
  Array.isArray(arr)
    ? arr
        .map((obj) => `${obj.title}${obj.body ? ` — ${obj.body}` : ""}`)
        .join("\n")
    : "";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("idle");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      const result = await fetchProjectById(params.id);
      if (result.success) {
        const data = result.data;
        setForm({
          Title: data.Title || "",
          category: data.category || "commission",
          description: data.description || "",
          overview: fromArray(data.overview),
          problems: fromArray(data.problems),
          solutions: fromObjectArray(data.solutions),
          features: fromObjectArray(data.features),
          stack: fromArray(data.stack),
          tags: fromArray(data.tags),
          Img: data.Img || "",
          heroImage: data.heroImage || "",
          screenshots: fromArray(data.screenshots),
          demoUrl: data.demoUrl || "",
          projectUrl: data.projectUrl || "",
          codeSnippet: data.codeSnippet || "",
          snippetFile: data.snippetFile || "",
        });
      } else {
        alert("Failed to load project");
        router.push("/admin/projects");
      }
      setLoading(false);
    };

    if (params.id) {
      loadProject();
    }
  }, [params.id, router]);

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    setStatus("loading");
    setMsg("Updating project…");

    const payload = {
      Title: form.Title.trim(),
      category: form.category,
      description: form.description.trim(),
      overview: toArray(form.overview),
      problems: toArray(form.problems),
      solutions: toObjectArray(form.solutions),
      features: toObjectArray(form.features),
      stack: toArray(form.stack),
      tags: toArray(form.tags),
      Img: form.Img.trim(),
      heroImage: form.heroImage.trim() || form.Img.trim(),
      screenshots: toArray(form.screenshots),
      demoUrl: form.demoUrl.trim(),
      projectUrl: form.projectUrl.trim(),
      codeSnippet: form.codeSnippet.trim(),
      snippetFile: form.snippetFile.trim(),
    };

    const result = await updateProject(params.id, payload);

    if (result.success) {
      setStatus("success");
      setMsg("✓ Project updated successfully!");
      setTimeout(() => {
        router.push("/admin/projects");
      }, 1500);
    } else {
      setStatus("error");
      setMsg(result.error ?? "Update failed");
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-text-muted">Loading project...</p>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  if (!form) {
    return null;
  }

  const statusColors = {
    loading: "bg-primary/10 border-primary/30 text-primary",
    success: "bg-success/10 border-success/30 text-success",
    error: "bg-error/10   border-error/30   text-error",
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <span className="font-label-caps text-[10px] text-primary tracking-widest uppercase block mb-2">
              Admin
            </span>
            <h1 className="text-2xl sm:text-[32px] font-bold text-text-primary">
              Edit <span className="text-primary">Project</span>
            </h1>
            <p className="text-text-muted text-sm mt-2">
              Update the project details in Firestore
            </p>
          </div>

          {status !== "idle" && (
            <div
              className={`sticky top-20 z-40 flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium mb-6 ${statusColors[status]}`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${status === "loading" ? "animate-spin" : ""}`}
              >
                {status === "loading"
                  ? "progress_activity"
                  : status === "success"
                    ? "check_circle"
                    : "error"}
              </span>
              <span className="flex-1">{msg}</span>
              {status !== "loading" && (
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="material-symbols-outlined text-[18px] opacity-60 hover:opacity-100"
                >
                  close
                </button>
              )}
            </div>
          )}

          <div className="space-y-4 sm:space-y-6">
            <Section title="Basic Info">
              <div>
                <Label text="Title *" />
                <input
                  className={inputCls}
                  placeholder="Dspeed Cargo PH"
                  value={form.Title}
                  onChange={set("Title")}
                />
              </div>
              <div>
                <Label text="Category *" />
                <select
                  className={inputCls}
                  value={form.category}
                  onChange={set("category")}
                >
                  <option value="commission">Commission</option>
                  <option value="mini">Mini</option>
                  <option value="personal">Personal</option>
                  <option value="academic">Academic</option>
                </select>
              </div>
              <div>
                <Label
                  text="Short Description *"
                  hint="shown on the project card"
                />
                <textarea
                  className={inputCls}
                  rows={3}
                  placeholder="A comprehensive logistics ecosystem..."
                  value={form.description}
                  onChange={set("description")}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label text="Demo URL" />
                  <input
                    className={inputCls}
                    placeholder="https://..."
                    value={form.demoUrl}
                    onChange={set("demoUrl")}
                  />
                </div>
                <div>
                  <Label text="Repo / GitHub URL" />
                  <input
                    className={inputCls}
                    placeholder="https://github.com/..."
                    value={form.projectUrl}
                    onChange={set("projectUrl")}
                  />
                </div>
              </div>
            </Section>

            <Section title="Images">
              <div>
                <Label text="Cover Image URL *" hint="Img field" />
                <input
                  className={inputCls}
                  placeholder="/placeholder.png or https://..."
                  value={form.Img}
                  onChange={set("Img")}
                />
              </div>
              <div>
                <Label
                  text="Hero Image URL"
                  hint="defaults to cover if blank"
                />
                <input
                  className={inputCls}
                  placeholder="https://..."
                  value={form.heroImage}
                  onChange={set("heroImage")}
                />
              </div>
              <div>
                <Label
                  text="Screenshot URLs"
                  hint="one per line or comma-separated"
                />
                <textarea
                  className={inputCls}
                  rows={4}
                  placeholder={"https://img1.png\nhttps://img2.png"}
                  value={form.screenshots}
                  onChange={set("screenshots")}
                />
              </div>
            </Section>

            <Section title="Tags & Stack">
              <div>
                <Label text="Card Tags" hint="comma-separated" />
                <input
                  className={inputCls}
                  placeholder="React.js, Node.js, PostgreSQL"
                  value={form.tags}
                  onChange={set("tags")}
                />
              </div>
              <div>
                <Label text="Tech Stack" hint="comma-separated" />
                <input
                  className={inputCls}
                  placeholder="Laravel, React, MySQL, Tailwind CSS"
                  value={form.stack}
                  onChange={set("stack")}
                />
              </div>
            </Section>

            <Section title="Detail Page Content">
              <div>
                <Label text="Overview" hint="one paragraph per line" />
                <textarea
                  className={inputCls}
                  rows={4}
                  placeholder={"First paragraph...\nSecond paragraph..."}
                  value={form.overview}
                  onChange={set("overview")}
                />
              </div>
              <div>
                <Label text="Problems" hint="one per line" />
                <textarea
                  className={inputCls}
                  rows={3}
                  placeholder={
                    "Manual tracking causing issues.\nZero client visibility."
                  }
                  value={form.problems}
                  onChange={set("problems")}
                />
              </div>
              <div>
                <Label text="Solutions" hint='one per line · "Title — Body"' />
                <textarea
                  className={inputCls}
                  rows={4}
                  placeholder={
                    "Centralized Architecture — Unified MySQL database.\nLive Updates — React Context for instant sync."
                  }
                  value={form.solutions}
                  onChange={set("solutions")}
                />
              </div>
              <div>
                <Label text="Features" hint='one per line · "Title — Body"' />
                <textarea
                  className={inputCls}
                  rows={5}
                  placeholder={
                    "Real-time Tracking — GPS updates and ETA monitoring.\nInventory Management — Automated stock alerts."
                  }
                  value={form.features}
                  onChange={set("features")}
                />
              </div>
            </Section>

            <Section title="Code Snippet (optional)">
              <div>
                <Label text="Filename label" />
                <input
                  className={inputCls}
                  placeholder="app/Services/ShipmentTracker.php"
                  value={form.snippetFile}
                  onChange={set("snippetFile")}
                />
              </div>
              <div>
                <Label text="Code" />
                <textarea
                  className={`${inputCls} font-mono text-[12px]`}
                  rows={8}
                  placeholder="public function ..."
                  value={form.codeSnippet}
                  onChange={set("codeSnippet")}
                />
              </div>
            </Section>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-3 sm:py-4 bg-surface-container hover:bg-surface-container-highest border border-border-hairline rounded text-text-secondary hover:text-text-primary transition-all text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="flex-1 py-3 sm:py-4 bg-primary text-on-primary font-label-caps font-bold rounded uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {status === "loading" ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">
                      progress_activity
                    </span>
                    <span>Updating…</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">
                      save
                    </span>
                    <span>Update Project</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </main>
      </AdminLayout>
    </ProtectedRoute>
  );
}
