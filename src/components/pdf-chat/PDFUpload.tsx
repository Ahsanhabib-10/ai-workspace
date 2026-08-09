"use client";

import { useRef, useState } from "react";
import {
  FileText,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

interface PDFUploadProps {
  onTextExtracted: (
    text: string,
    fileName: string
  ) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export default function PDFUpload({
  onTextExtracted,
}: PDFUploadProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] =
    useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Reset previous error
    setError("");

    // Check file type
    if (file.type !== "application/pdf") {
      setError(
        "Please upload a valid PDF file."
      );

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      return;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError(
        "PDF file is too large. Maximum allowed size is 10 MB."
      );

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      return;
    }

    setFileName(file.name);
    setIsUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "/api/resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to process PDF."
        );
      }

      if (!data.text) {
        throw new Error(
          "No readable text was found in this PDF."
        );
      }

      onTextExtracted(
        data.text,
        file.name
      );
    } catch (error) {
      console.error(
        "PDF upload error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while processing the PDF."
      );

      setFileName("");
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFileName("");
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {!fileName ? (
        <>
          {/* Upload Area */}
          <button
            type="button"
            onClick={() =>
              inputRef.current?.click()
            }
            className="group w-full rounded-[2rem] border border-dashed border-white/15 bg-white/[0.025] p-12 text-center transition hover:border-cyan-400/50 hover:bg-cyan-400/[0.04]"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
              <Upload
                size={28}
                className="text-cyan-300 transition group-hover:scale-110"
              />
            </div>

            <h2 className="mt-6 text-xl font-bold text-white">
              Upload a PDF
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Upload a document and chat
              with its contents.
            </p>

            <span className="mt-6 inline-block rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400">
              Choose PDF
            </span>

            <p className="mt-4 text-xs text-slate-600">
              PDF only · Maximum 10 MB
            </p>
          </button>

          {/* Error */}
          {error && (
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-red-400/10 bg-red-400/5 px-4 py-3 text-sm text-red-300">
              <AlertCircle
                size={18}
                className="shrink-0"
              />

              <span>{error}</span>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-[2rem] border border-cyan-400/15 bg-cyan-400/[0.04] p-6">

          {/* File Header */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10">
                <FileText
                  size={22}
                  className="text-cyan-300"
                />
              </div>

              <div>
                <p className="max-w-[220px] truncate font-semibold text-white sm:max-w-md">
                  {fileName}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {isUploading
                    ? "Reading PDF..."
                    : "PDF ready for chat"}
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={removeFile}
              disabled={isUploading}
              aria-label="Remove PDF"
              className="rounded-xl border border-white/10 p-3 text-slate-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <X size={18} />
            </button>

          </div>

          {/* Loading */}
          {isUploading && (
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 px-4 py-3 text-sm text-cyan-300">

              <Loader2
                size={18}
                className="animate-spin"
              />

              Nexora is reading your PDF...

            </div>
          )}

          {/* Success */}
          {!isUploading && !error && (
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/5 px-4 py-3 text-sm text-emerald-300">

              <CheckCircle2 size={18} />

              PDF successfully processed.

            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-red-400/10 bg-red-400/5 px-4 py-3 text-sm text-red-300">

              <AlertCircle
                size={18}
                className="shrink-0"
              />

              <span>{error}</span>

            </div>
          )}

        </div>
      )}
    </div>
  );
}