"use client";

import { useRef, useState } from "react";
import {
  FileText,
  Upload,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface ResumeUploadProps {
  onReview: (review: {
    score: number;
    summary: string;
    strengths: string[];
    weaknesses: string[];
    skills: string[];
    recommendedSkills: string[];
    experienceFeedback: string;
    educationFeedback: string;
    atsSuggestions: string[];
    improvements: string[];
  }) => void;
}

export default function ResumeUpload({
  onReview,
}: ResumeUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);
    setSuccess(false);
    setError("");
    setIsUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to process resume."
        );
      }

      console.log(
        "Extracted Resume Text:",
        data.text
      );

      console.log(
        "AI Resume Review:",
        data.review
      );

      let review;

      if (typeof data.review === "string") {
        review = JSON.parse(data.review);
      } else {
        review = data.review;
      }

      onReview(review);

      setSuccess(true);
    } catch (error) {
      console.error(
        "Resume upload error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFileName("");
    setSuccess(false);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="mx-auto max-w-4xl">

      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {!fileName ? (
        <button
          type="button"
          onClick={() =>
            inputRef.current?.click()
          }
          className="group w-full rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-12 text-center transition hover:border-cyan-400/50 hover:bg-cyan-500/[0.04]"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <Upload
              size={28}
              className="text-cyan-300 transition group-hover:scale-110"
            />
          </div>

          <h2 className="mt-6 text-xl font-bold text-white">
            Upload your resume
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            PDF format supported
          </p>

          <span className="mt-6 inline-block rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400">
            Choose Resume
          </span>
        </button>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10">
                <FileText
                  className="text-cyan-300"
                  size={22}
                />
              </div>

              <div>
                <p className="font-semibold text-white">
                  {fileName}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {isUploading
                    ? "Analyzing resume..."
                    : success
                      ? "Analysis complete"
                      : "Resume selected"}
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={removeFile}
              disabled={isUploading}
              className="rounded-xl border border-white/10 p-3 text-slate-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <X size={18} />
            </button>

          </div>

          {isUploading && (
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 px-4 py-3 text-sm text-cyan-300">
              <Loader2
                size={18}
                className="animate-spin"
              />
              Nexora is analyzing your resume...
            </div>
          )}

          {success && (
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/5 px-4 py-3 text-sm text-emerald-300">
              <CheckCircle2 size={18} />
              Resume analysis completed successfully.
            </div>
          )}

          {error && (
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-red-400/10 bg-red-400/5 px-4 py-3 text-sm text-red-300">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

        </div>
      )}

    </div>
  );
}