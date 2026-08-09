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

interface KnowledgeUploadProps {
  onUploaded: (
    fileName: string,
    text: string
  ) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function KnowledgeUpload({
  onUploaded,
}: KnowledgeUploadProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] =
    useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] =
    useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setSuccess(false);

    if (file.type !== "application/pdf") {
      setError(
        "Please upload a valid PDF file."
      );
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(
        "PDF is too large. Maximum size is 10 MB."
      );
      return;
    }

    setFileName(file.name);
    setIsUploading(true);

    try {
      // --------------------------------
      // STEP 1: Extract PDF text
      // --------------------------------

      const formData = new FormData();

      formData.append("file", file);

      const extractResponse = await fetch(
        "/api/resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const extractData =
        await extractResponse.json();

      if (!extractResponse.ok) {
        throw new Error(
          extractData.error ||
            "Failed to process PDF."
        );
      }

      if (!extractData.text) {
        throw new Error(
          "No readable text was found in this PDF."
        );
      }

      // --------------------------------
      // STEP 2: Save knowledge to database
      // --------------------------------

      const saveResponse = await fetch(
        "/api/knowledge",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            fileName: file.name,
            text: extractData.text,
          }),
        }
      );

      const saveData =
        await saveResponse.json();

      if (!saveResponse.ok) {
        throw new Error(
          saveData.error ||
            "Failed to save document."
        );
      }

      // --------------------------------
      // STEP 3: Update UI
      // --------------------------------

      onUploaded(
        file.name,
        extractData.text
      );

      setSuccess(true);
    } catch (error) {
      console.error(
        "Knowledge upload error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );

      setFileName("");
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFileName("");
    setError("");
    setSuccess(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {!fileName ? (
        <button
          type="button"
          onClick={() =>
            inputRef.current?.click()
          }
          className="group w-full rounded-[2rem] border border-dashed border-white/15 bg-white/[0.025] p-10 text-center transition hover:border-cyan-400/50 hover:bg-cyan-400/[0.04]"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <Upload
              size={25}
              className="text-cyan-300 transition group-hover:scale-110"
            />
          </div>

          <h3 className="mt-5 text-lg font-bold text-white">
            Add a document
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Upload a PDF to your private
            knowledge base.
          </p>

          <span className="mt-5 inline-block rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400">
            Choose PDF
          </span>

          <p className="mt-3 text-xs text-slate-600">
            PDF only · Maximum 10 MB
          </p>
        </button>
      ) : (
        <div className="rounded-[2rem] border border-cyan-400/15 bg-cyan-400/[0.04] p-5">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10">
                <FileText
                  size={20}
                  className="text-cyan-300"
                />
              </div>

              <div>
                <p className="max-w-xs truncate text-sm font-semibold text-white">
                  {fileName}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {isUploading
                    ? "Processing..."
                    : "Knowledge added"}
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={removeFile}
              disabled={isUploading}
              className="rounded-xl border border-white/10 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
            >
              <X size={17} />
            </button>

          </div>

          {isUploading && (
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-cyan-400/10 bg-cyan-400/5 px-4 py-3 text-sm text-cyan-300">
              <Loader2
                size={17}
                className="animate-spin"
              />
              Nexora is reading and saving your document...
            </div>
          )}

          {success && !isUploading && (
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-400/10 bg-emerald-400/5 px-4 py-3 text-sm text-emerald-300">
              <CheckCircle2 size={17} />
              Document saved to your knowledge base.
            </div>
          )}

          {error && (
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-red-400/10 bg-red-400/5 px-4 py-3 text-sm text-red-300">
              <AlertCircle size={17} />
              {error}
            </div>
          )}

        </div>
      )}
    </div>
  );
}