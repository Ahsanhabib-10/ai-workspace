"use client";

import { useState } from "react";

import ResumeUpload from "@/components/resume/ResumeUpload";
import ResumeResults from "@/components/resume/ResumeResults";

interface ResumeReview {
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
}

export default function ResumePage() {
  const [review, setReview] = useState<ResumeReview | null>(null);

  return (
    <main className="min-h-full bg-[#030712] px-6 py-8 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] px-8 py-10 shadow-2xl lg:px-12">

          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
              Nexora AI
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-white lg:text-5xl">
              Resume Review
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 lg:text-lg">
              Turn your resume into a stronger career profile.
              Nexora AI analyzes your experience, skills,
              structure, and areas for improvement.
            </p>
          </div>
        </div>

        {/* Upload */}
        {!review && (
          <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 lg:p-8">

            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">
                Upload your resume
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Upload a PDF resume to begin your AI analysis.
              </p>
            </div>

            <ResumeUpload onReview={setReview} />

          </section>
        )}

        {/* Results */}
        {review && (
          <>
            <ResumeResults review={review} />

            <button
              onClick={() => setReview(null)}
              className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Review Another Resume
            </button>
          </>
        )}

        {/* Analysis Cards */}
        {!review && (
          <section className="mt-8 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <p className="text-sm font-semibold text-cyan-300">
                01
              </p>

              <h3 className="mt-3 font-bold text-white">
                Resume Quality
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Structure, clarity, wording and overall presentation.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <p className="text-sm font-semibold text-cyan-300">
                02
              </p>

              <h3 className="mt-3 font-bold text-white">
                Skills & Experience
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Identify strengths, missing skills and experience gaps.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <p className="text-sm font-semibold text-cyan-300">
                03
              </p>

              <h3 className="mt-3 font-bold text-white">
                AI Recommendations
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Get actionable suggestions to improve your resume.
              </p>
            </div>

          </section>
        )}

      </div>
    </main>
  );
}