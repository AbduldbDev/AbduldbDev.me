"use client";

import React, { useState } from "react";
import { insertProject } from "@/data/projects";

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

const INIT = {
  Title: "",
  category: "commission",
  description: "",
  overview: "",
  problems: "",
  solutions: "",
  features: "",
  stack: "",
  tags: "",
  Img: "",
  heroImage: "",
  screenshots: "",
  demoUrl: "",
  projectUrl: "",
  codeSnippet: "",
  snippetFile: "",
};

export default function NewProjectPage() {
  const [form, setForm] = useState(INIT);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [msg, setMsg] = useState("");

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    console.log("▶ handleSubmit fired");
    setStatus("loading");
    setMsg("Sending to Firestore…");

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

    console.log("▶ payload:", payload);

    try {
      const result = await insertProject(payload);
      console.log("▶ result:", result);

      if (result.success) {
        setStatus("success");
        setMsg(`✓ Inserted! ID: ${result.id}`);
        setForm(INIT);
      } else {
        setStatus("error");
        setMsg(result.error ?? "Insert failed — check console.");
      }
    } catch (err) {
      console.error("▶ caught error:", err);
      setStatus("error");
      setMsg(err.message ?? "Unexpected error");
    }
  }

  const statusColors = {
    loading: "bg-primary/10 border-primary/30 text-primary",
    success: "bg-success/10 border-success/30 text-success",
    error: "bg-error/10   border-error/30   text-error",
  };

  return (
    <main className="max-w-3xl mx-auto px-5 sm:px-6 py-20 relative">
      {/* Header */}
      <div className="mb-8">
        <span className="font-label-caps text-[10px] text-primary tracking-widest uppercase block mb-2">
          Admin
        </span>
        <h1 className="text-[32px] sm:text-[40px] font-bold text-text-primary">
          New <span className="text-primary">Project</span>
        </h1>
        <p className="text-text-muted text-sm mt-2">
          Inserts a document into the Firestore{" "}
          <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded">
            projects
          </code>{" "}
          collection.
        </p>
      </div>

      {/* Status banner */}
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

      {/* Form — no fieldset, no required, no native validation */}
      <div className="space-y-6">
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
            <Label text="Hero Image URL" hint="defaults to cover if blank" />
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

        {/* Submit — plain button, no form element at all */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="z-100 cursor-pointer w-full py-4 bg-primary text-on-primary font-label-caps text-label-caps font-bold rounded uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[18px]">
                progress_activity
              </span>
              Inserting…
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">
                upload
              </span>
              Insert Project
            </>
          )}
        </button>
      </div>
    </main>
  );
}
