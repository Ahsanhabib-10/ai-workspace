"use client";

import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Brain,
  GraduationCap,
  BriefcaseBusiness,
  Target,
  ShieldCheck,
} from "lucide-react";

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

interface ResumeResultsProps {
  review: ResumeReview;
}

export default function ResumeResults({
  review,
}: ResumeResultsProps) {
  return (
    <section className="mt-10 space-y-6">

      {/* Score + Summary */}
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

        <div className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/[0.04] p-8 text-center">
          <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-8 border-cyan-400/20">
            <div>
              <p className="text-5xl font-black text-white">
                {review.score}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                / 100
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Resume Score
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-8">
          <div className="flex items-center gap-3">
            <Sparkles
              size={22}
              className="text-cyan-300"
            />

            <h2 className="text-2xl font-bold text-white">
              AI Summary
            </h2>
          </div>

          <p className="mt-5 text-base leading-8 text-slate-400">
            {review.summary}
          </p>
        </div>

      </div>

      {/* Strengths + Weaknesses */}
      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-[2rem] border border-emerald-400/10 bg-emerald-400/[0.025] p-8">

          <div className="flex items-center gap-3">
            <CheckCircle2
              size={22}
              className="text-emerald-300"
            />

            <h2 className="text-xl font-bold text-white">
              Strengths
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            {review.strengths.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 text-sm leading-6 text-slate-400"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />

                <span>{item}</span>
              </div>
            ))}
          </div>

        </div>

        <div className="rounded-[2rem] border border-amber-400/10 bg-amber-400/[0.025] p-8">

          <div className="flex items-center gap-3">
            <AlertTriangle
              size={22}
              className="text-amber-300"
            />

            <h2 className="text-xl font-bold text-white">
              Weaknesses
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            {review.weaknesses.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 text-sm leading-6 text-slate-400"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />

                <span>{item}</span>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Skills */}
      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-8">

          <div className="flex items-center gap-3">
            <Brain
              size={22}
              className="text-cyan-300"
            />

            <h2 className="text-xl font-bold text-white">
              Skills Detected
            </h2>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {review.skills.map((skill, index) => (
              <span
                key={index}
                className="rounded-xl border border-cyan-400/15 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-200"
              >
                {skill}
              </span>
            ))}
          </div>

        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-8">

          <div className="flex items-center gap-3">
            <Target
              size={22}
              className="text-violet-300"
            />

            <h2 className="text-xl font-bold text-white">
              Recommended Skills
            </h2>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {review.recommendedSkills.map(
              (skill, index) => (
                <span
                  key={index}
                  className="rounded-xl border border-violet-400/15 bg-violet-400/5 px-4 py-2 text-sm text-violet-200"
                >
                  {skill}
                </span>
              )
            )}
          </div>

        </div>

      </div>

      {/* Experience + Education */}
      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-8">

          <div className="flex items-center gap-3">
            <BriefcaseBusiness
              size={22}
              className="text-cyan-300"
            />

            <h2 className="text-xl font-bold text-white">
              Experience Feedback
            </h2>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-400">
            {review.experienceFeedback}
          </p>

        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-8">

          <div className="flex items-center gap-3">
            <GraduationCap
              size={22}
              className="text-cyan-300"
            />

            <h2 className="text-xl font-bold text-white">
              Education Feedback
            </h2>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-400">
            {review.educationFeedback}
          </p>

        </div>

      </div>

      {/* ATS */}
      <div className="rounded-[2rem] border border-cyan-400/10 bg-cyan-400/[0.025] p-8">

        <div className="flex items-center gap-3">
          <ShieldCheck
            size={22}
            className="text-cyan-300"
          />

          <h2 className="text-xl font-bold text-white">
            ATS Suggestions
          </h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {review.atsSuggestions.map(
            (item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-sm leading-6 text-slate-400"
              >
                {item}
              </div>
            )
          )}
        </div>

      </div>

      {/* Improvements */}
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-8">

        <div className="flex items-center gap-3">
          <Sparkles
            size={22}
            className="text-cyan-300"
          />

          <h2 className="text-xl font-bold text-white">
            Recommended Improvements
          </h2>
        </div>

        <div className="mt-6 space-y-4">
          {review.improvements.map(
            (item, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-sm font-bold text-cyan-300">
                  {index + 1}
                </div>

                <p className="text-sm leading-7 text-slate-400">
                  {item}
                </p>
              </div>
            )
          )}
        </div>

      </div>

    </section>
  );
}