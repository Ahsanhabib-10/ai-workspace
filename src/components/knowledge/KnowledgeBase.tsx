"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  FileText,
  Plus,
  Search,
  Sparkles,
  Database,
  Trash2,
  Loader2,
} from "lucide-react";

import KnowledgeChat from "./KnowledgeChat";
import KnowledgeUpload from "./KnowledgeUpload";

interface KnowledgeItem {
  id: string;
  fileName: string;
  createdAt: string;
}

export default function KnowledgeBase() {
  const [showUpload, setShowUpload] = useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [knowledge, setKnowledge] =
    useState<KnowledgeItem[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // --------------------------------
  // Load documents from database
  // --------------------------------

  const loadKnowledge = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(
        "/api/knowledge",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to load knowledge."
        );
      }

      setKnowledge(data.documents || []);
    } catch (error) {
      console.error(
        "Knowledge loading error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load knowledge."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadKnowledge();
  }, []);

  // --------------------------------
  // After successful upload
  // --------------------------------

  const handleUploaded = () => {
    setShowUpload(false);
    loadKnowledge();
  };

  // --------------------------------
  // Delete document
  // --------------------------------

  const handleDelete = async (
    id: string
  ) => {
    try {
      const response = await fetch(
        `/api/knowledge?id=${encodeURIComponent(id)}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to delete document."
        );
      }

      setKnowledge((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Knowledge delete error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete document."
      );
    }
  };

  // --------------------------------
  // Search
  // --------------------------------

  const filteredKnowledge = useMemo(() => {
    const query =
      searchQuery.trim().toLowerCase();

    if (!query) {
      return knowledge;
    }

    return knowledge.filter((item) =>
      item.fileName
        .toLowerCase()
        .includes(query)
    );
  }, [knowledge, searchQuery]);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] px-8 py-10">

        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

          <div>
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                <BookOpen
                  size={21}
                  className="text-cyan-300"
                />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Nexora AI
              </p>

            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-white lg:text-5xl">
              Knowledge Base
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
              Give Nexora access to your
              documents, notes and important
              information so it can understand
              and use your knowledge.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setShowUpload(true)
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400"
          >
            <Plus size={18} />
            Add Knowledge
          </button>

        </div>
      </div>

      {/* Upload */}
      {showUpload && (
        <div className="rounded-[2rem] border border-cyan-400/10 bg-white/[0.02] p-6">

          <div className="mb-5 flex items-center justify-between">

            <div>
              <p className="text-sm font-semibold text-white">
                Add to your knowledge
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Upload a PDF that Nexora can
                learn from.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowUpload(false)
              }
              className="text-xs text-slate-500 transition hover:text-white"
            >
              Cancel
            </button>

          </div>

          <KnowledgeUpload
            onUploaded={handleUploaded}
          />

        </div>
      )}

      {/* Search + Stats */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(
                event.target.value
              )
            }
            placeholder="Search your knowledge..."
            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.025] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/30"
          />

        </div>

        <div className="flex h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4">

          <Database
            size={17}
            className="text-cyan-300"
          />

          <span className="text-sm text-slate-400">
            {knowledge.length}{" "}
            {knowledge.length === 1
              ? "document"
              : "documents"}
          </span>

        </div>

      </div>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-400/10 bg-red-400/5 px-5 py-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Documents */}
      {isLoading ? (
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] px-6 py-20 text-center">

          <Loader2
            size={28}
            className="mx-auto animate-spin text-cyan-300"
          />

          <p className="mt-5 text-sm text-slate-500">
            Loading your knowledge...
          </p>

        </div>
      ) : filteredKnowledge.length > 0 ? (

        <div className="grid gap-4">

          {filteredKnowledge.map(
            (item) => (
              <div
                key={item.id}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.025]"
              >

                <div className="flex min-w-0 items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/10">
                    <FileText
                      size={21}
                      className="text-cyan-300"
                    />
                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-sm font-semibold text-white">
                      {item.fileName}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      PDF · Knowledge document
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(item.id)
                  }
                  className="ml-4 rounded-xl border border-white/10 p-2.5 text-slate-500 opacity-0 transition hover:border-red-400/20 hover:bg-red-400/5 hover:text-red-300 group-hover:opacity-100"
                  aria-label={`Delete ${item.fileName}`}
                >
                  <Trash2 size={16} />
                </button>

              </div>
            )
          )}

        </div>

      ) : knowledge.length > 0 ? (

        /* No Search Results */
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] px-6 py-16 text-center">

          <Search
            size={28}
            className="mx-auto text-slate-600"
          />

          <h2 className="mt-5 text-xl font-bold text-white">
            No documents found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Try a different search term.
          </p>

        </div>

      ) : (

        /* Empty State */
        <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] px-6 py-20 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <Sparkles
              size={27}
              className="text-cyan-300"
            />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-white">
            Your knowledge starts here
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
            Upload documents and build a
            private knowledge base that
            Nexora can use to answer your
            questions.
          </p>

          <button
            type="button"
            onClick={() =>
              setShowUpload(true)
            }
            className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-white"
          >
            <FileText size={17} />
            Upload your first document
          </button>

        </div>
      )}

      {/* AI Knowledge Assistant */}
      <KnowledgeChat />

    </div>
  );
}