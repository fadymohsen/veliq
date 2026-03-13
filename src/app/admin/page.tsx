"use client";

import { useEffect, useState } from "react";

interface Service {
  id: number;
  icon: string;
  title: string;
  desc: string;
}

interface GalleryItem {
  bg: string;
  caption: string;
}

interface Project {
  slug: string;
  bg: string;
  tag: string;
  title: string;
  desc: string;
  fullDesc: string;
  gallery: GalleryItem[];
}

type Tab = "services" | "projects";

const GRADIENT_OPTIONS = [
  "bg-gradient-to-br from-indigo-400 to-blue-500",
  "bg-gradient-to-br from-sky-400 to-indigo-500",
  "bg-gradient-to-br from-violet-400 to-indigo-600",
  "bg-gradient-to-br from-orange-400 to-rose-500",
  "bg-gradient-to-br from-lime-400 to-green-500",
  "bg-gradient-to-br from-cyan-400 to-blue-500",
  "bg-gradient-to-br from-fuchsia-400 to-pink-500",
  "bg-gradient-to-br from-amber-400 to-orange-500",
  "bg-gradient-to-br from-rose-400 to-red-500",
  "bg-gradient-to-br from-emerald-400 to-teal-500",
  "bg-gradient-to-br from-yellow-400 to-amber-500",
  "bg-gradient-to-br from-pink-400 to-purple-500",
  "bg-gradient-to-br from-teal-400 to-cyan-500",
  "bg-gradient-to-br from-blue-400 to-violet-500",
  "bg-gradient-to-br from-green-400 to-emerald-500",
  "bg-gradient-to-br from-slate-400 to-zinc-600",
  "bg-gradient-to-br from-rose-400 to-fuchsia-500",
  "bg-gradient-to-br from-amber-400 to-yellow-500",
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("services");
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [savingServices, setSavingServices] = useState(false);
  const [savingProjects, setSavingProjects] = useState(false);
  const [message, setMessage] = useState("");
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [seeding, setSeeding] = useState(false);

  async function seedDatabase() {
    setSeeding(true);
    setMessage("");
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Database seeded! (${data.counts.services} services, ${data.counts.projects} projects, ${data.counts.blogs} blogs)`);
        // Refresh data
        const [svc, proj] = await Promise.all([
          fetch("/api/services").then((r) => r.json()),
          fetch("/api/projects").then((r) => r.json()),
        ]);
        setServices(svc);
        setProjects(proj);
      } else {
        setMessage(`Seed error: ${data.error}`);
      }
    } catch {
      setMessage("Failed to seed database.");
    }
    setSeeding(false);
  }

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then(setServices);
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setProjects);
  }, []);

  // ── Services ──
  function updateService(index: number, field: keyof Service, value: string) {
    setServices((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  }

  function addService() {
    setServices((prev) => [
      ...prev,
      { id: prev.length + 1, icon: "⭐", title: "", desc: "" },
    ]);
  }

  function removeService(index: number) {
    setServices((prev) => prev.filter((_, i) => i !== index));
  }

  async function saveServices() {
    setSavingServices(true);
    setMessage("");
    try {
      const res = await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(services),
      });
      if (!res.ok) {
        const err = await res.json();
        setMessage(`Error: ${err.error}`);
      } else {
        setMessage("Services saved successfully!");
      }
    } catch {
      setMessage("Failed to save. Please try again.");
    }
    setSavingServices(false);
  }

  // ── Projects ──
  function updateProject(
    index: number,
    field: keyof Project,
    value: string
  ) {
    setProjects((prev) =>
      prev.map((p, i) => {
        if (i !== index) return p;
        const updated = { ...p, [field]: value };
        if (field === "title") {
          updated.slug = slugify(value);
        }
        return updated;
      })
    );
  }

  function updateGalleryItem(
    projIndex: number,
    galIndex: number,
    field: keyof GalleryItem,
    value: string
  ) {
    setProjects((prev) =>
      prev.map((p, i) => {
        if (i !== projIndex) return p;
        const gallery = p.gallery.map((g, gi) =>
          gi === galIndex ? { ...g, [field]: value } : g
        );
        return { ...p, gallery };
      })
    );
  }

  function addGalleryItem(projIndex: number) {
    setProjects((prev) =>
      prev.map((p, i) => {
        if (i !== projIndex) return p;
        return {
          ...p,
          gallery: [
            ...p.gallery,
            {
              bg: "bg-gradient-to-br from-slate-300 to-slate-400",
              caption: "",
            },
          ],
        };
      })
    );
  }

  function removeGalleryItem(projIndex: number, galIndex: number) {
    setProjects((prev) =>
      prev.map((p, i) => {
        if (i !== projIndex) return p;
        return {
          ...p,
          gallery: p.gallery.filter((_, gi) => gi !== galIndex),
        };
      })
    );
  }

  function addProject() {
    setProjects((prev) => [
      ...prev,
      {
        slug: "",
        bg: GRADIENT_OPTIONS[0],
        tag: services.length > 0 ? services[0].title : "",
        title: "",
        desc: "",
        fullDesc: "",
        gallery: [
          { bg: "bg-gradient-to-br from-slate-300 to-slate-400", caption: "Screenshot 1" },
          { bg: "bg-gradient-to-br from-slate-400 to-slate-500", caption: "Screenshot 2" },
          { bg: "bg-gradient-to-br from-slate-300 to-slate-500", caption: "Screenshot 3" },
          { bg: "bg-gradient-to-br from-slate-400 to-slate-600", caption: "Screenshot 4" },
        ],
      },
    ]);
    setEditingProject(projects.length);
  }

  function removeProject(index: number) {
    setProjects((prev) => prev.filter((_, i) => i !== index));
    if (editingProject === index) setEditingProject(null);
  }

  async function saveProjects() {
    setSavingProjects(true);
    setMessage("");
    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projects),
      });
      if (!res.ok) {
        const err = await res.json();
        setMessage(`Error: ${err.error}`);
      } else {
        setMessage("Projects saved successfully!");
      }
    } catch {
      setMessage("Failed to save. Please try again.");
    }
    setSavingProjects(false);
  }

  const serviceTitles = services.map((s) => s.title).filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-2xl font-bold text-primary">
              VELIQ
            </a>
            <span className="text-sm font-medium text-slate-400 border-l border-slate-200 pl-3">
              Admin Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={seedDatabase}
              disabled={seeding}
              className="text-xs px-3 py-1.5 rounded-md bg-amber-100 text-amber-700 hover:bg-amber-200 transition font-medium disabled:opacity-50"
            >
              {seeding ? "Seeding..." : "Seed DB"}
            </button>
            <a
              href="/"
              className="text-sm text-slate-500 hover:text-primary transition"
            >
              View Site &rarr;
            </a>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 flex gap-0">
          <button
            onClick={() => { setTab("services"); setMessage(""); }}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition ${
              tab === "services"
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Services
          </button>
          <button
            onClick={() => { setTab("projects"); setMessage(""); }}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition ${
              tab === "projects"
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Projects ({projects.length})
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {message && (
          <div
            className={`mb-6 rounded-lg px-4 py-3 text-sm font-medium ${
              message.startsWith("Error")
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-green-50 text-green-700 border border-green-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* ════════════════ SERVICES TAB ════════════════ */}
        {tab === "services" && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Manage Services
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Edit the services displayed on the landing page.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={addService}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                >
                  + Add Service
                </button>
                <button
                  onClick={saveServices}
                  disabled={savingServices}
                  className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white shadow hover:bg-primary-dark transition disabled:opacity-50"
                >
                  {savingServices ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Service {index + 1}
                    </span>
                    <button
                      onClick={() => removeService(index)}
                      className="text-sm text-red-400 hover:text-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">
                        Icon
                      </label>
                      <input
                        type="text"
                        value={service.icon}
                        onChange={(e) =>
                          updateService(index, "icon", e.target.value)
                        }
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-center text-2xl focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) =>
                          updateService(index, "title", e.target.value)
                        }
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        placeholder="Service title"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Description
                    </label>
                    <textarea
                      value={service.desc}
                      onChange={(e) =>
                        updateService(index, "desc", e.target.value)
                      }
                      rows={2}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                      placeholder="Service description"
                    />
                  </div>
                </div>
              ))}
            </div>

            {services.length === 0 && (
              <div className="text-center py-16 text-slate-400">
                <p className="text-lg">No services yet.</p>
                <p className="text-sm mt-1">
                  Click &quot;+ Add Service&quot; to get started.
                </p>
              </div>
            )}

            {/* Services Live Preview */}
            {services.length > 0 && (
              <div className="mt-12">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Live Preview
                </h2>
                <div className="bg-white rounded-xl border border-slate-200 p-8">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((s, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-slate-200 p-6"
                      >
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-xl">
                          {s.icon}
                        </div>
                        <h3 className="text-base font-semibold">
                          {s.title || "Untitled"}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600">
                          {s.desc || "No description"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ════════════════ PROJECTS TAB ════════════════ */}
        {tab === "projects" && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Manage Projects
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Add, edit, or remove projects from your portfolio.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={addProject}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                >
                  + Add Project
                </button>
                <button
                  onClick={saveProjects}
                  disabled={savingProjects}
                  className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white shadow hover:bg-primary-dark transition disabled:opacity-50"
                >
                  {savingProjects ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            {/* Project List */}
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  {/* Project Header (always visible) */}
                  <div
                    className="flex items-center gap-4 p-5 cursor-pointer hover:bg-slate-50 transition"
                    onClick={() =>
                      setEditingProject(editingProject === index ? null : index)
                    }
                  >
                    <div
                      className={`h-12 w-12 rounded-lg shrink-0 ${project.bg}`}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-900 truncate">
                        {project.title || "Untitled Project"}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {project.tag || "No category"} &middot;{" "}
                        {project.gallery.length} gallery items
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeProject(index);
                        }}
                        className="text-sm text-red-400 hover:text-red-600 transition"
                      >
                        Remove
                      </button>
                      <svg
                        className={`h-4 w-4 text-slate-400 transition-transform ${
                          editingProject === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Expanded Editor */}
                  {editingProject === index && (
                    <div className="border-t border-slate-200 p-6 space-y-5">
                      {/* Title & Tag */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">
                            Project Title
                          </label>
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) =>
                              updateProject(index, "title", e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            placeholder="Project title"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">
                            Service Category (Tag)
                          </label>
                          <select
                            value={project.tag}
                            onChange={(e) =>
                              updateProject(index, "tag", e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white"
                          >
                            <option value="">Select a service...</option>
                            {serviceTitles.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Slug (read-only) */}
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">
                          URL Slug
                        </label>
                        <input
                          type="text"
                          value={project.slug}
                          readOnly
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
                        />
                      </div>

                      {/* Short Description */}
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">
                          Short Description
                        </label>
                        <textarea
                          value={project.desc}
                          onChange={(e) =>
                            updateProject(index, "desc", e.target.value)
                          }
                          rows={2}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                          placeholder="Brief project description for cards..."
                        />
                      </div>

                      {/* Full Description */}
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">
                          Full Description
                        </label>
                        <textarea
                          value={project.fullDesc}
                          onChange={(e) =>
                            updateProject(index, "fullDesc", e.target.value)
                          }
                          rows={5}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                          placeholder="Detailed project description for the project page..."
                        />
                      </div>

                      {/* Card Gradient */}
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-2">
                          Card Color
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {GRADIENT_OPTIONS.map((g) => (
                            <button
                              key={g}
                              onClick={() => updateProject(index, "bg", g)}
                              className={`h-8 w-8 rounded-lg ${g} transition ${
                                project.bg === g
                                  ? "ring-2 ring-primary ring-offset-2"
                                  : "hover:ring-2 hover:ring-slate-300 hover:ring-offset-1"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Gallery */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-xs font-medium text-slate-500">
                            Gallery ({project.gallery.length} items)
                          </label>
                          <button
                            onClick={() => addGalleryItem(index)}
                            className="text-xs text-primary hover:text-primary-dark font-medium transition"
                          >
                            + Add Image
                          </button>
                        </div>
                        <div className="space-y-3">
                          {project.gallery.map((item, gi) => (
                            <div
                              key={gi}
                              className="flex items-center gap-3 rounded-lg border border-slate-200 p-3"
                            >
                              <div
                                className={`h-10 w-14 rounded shrink-0 ${item.bg}`}
                              />
                              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                                <select
                                  value={item.bg}
                                  onChange={(e) =>
                                    updateGalleryItem(
                                      index,
                                      gi,
                                      "bg",
                                      e.target.value
                                    )
                                  }
                                  className="rounded border border-slate-300 px-2 py-1 text-xs focus:border-primary outline-none bg-white"
                                >
                                  {GRADIENT_OPTIONS.map((g) => (
                                    <option key={g} value={g}>
                                      {g
                                        .replace("bg-gradient-to-br from-", "")
                                        .replace(" to-", " → ")}
                                    </option>
                                  ))}
                                </select>
                                <input
                                  type="text"
                                  value={item.caption}
                                  onChange={(e) =>
                                    updateGalleryItem(
                                      index,
                                      gi,
                                      "caption",
                                      e.target.value
                                    )
                                  }
                                  className="rounded border border-slate-300 px-2 py-1 text-xs focus:border-primary outline-none"
                                  placeholder="Caption"
                                />
                              </div>
                              <button
                                onClick={() => removeGalleryItem(index, gi)}
                                className="text-xs text-red-400 hover:text-red-600 transition shrink-0"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Preview */}
                      <div className="pt-4 border-t border-slate-100">
                        <p className="text-xs font-medium text-slate-400 mb-3">
                          CARD PREVIEW
                        </p>
                        <div className="max-w-xs overflow-hidden rounded-2xl border border-slate-200">
                          <div className={`h-36 ${project.bg}`} />
                          <div className="p-5">
                            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                              {project.tag || "Category"}
                            </span>
                            <h3 className="mt-1.5 text-base font-semibold">
                              {project.title || "Untitled"}
                            </h3>
                            <p className="mt-1.5 text-xs text-slate-600">
                              {project.desc || "No description"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {projects.length === 0 && (
              <div className="text-center py-16 text-slate-400">
                <p className="text-lg">No projects yet.</p>
                <p className="text-sm mt-1">
                  Click &quot;+ Add Project&quot; to get started.
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
