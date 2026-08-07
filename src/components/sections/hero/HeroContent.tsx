import HeroBadge from "./HeroBadge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import GradientText from "@/components/common/gradients/GradientText";

export default function HeroContent() {
  return (
    <div className="flex flex-col">

      <HeroBadge />

      <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">

        One Workspace.

        <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">

         <GradientText>
            Infinite Intelligence.
         </GradientText>

        </span>

      </h1>

      <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">

        Upload documents, build your knowledge base,
        chat with AI, organize projects and transform
        information into actionable intelligence.

      </p>

      <div className="mt-10 flex flex-wrap gap-4">

        <Button
          size="lg"
          className="group h-13 rounded-xl bg-blue-600 px-8 text-white hover:bg-blue-500"
        >

          Get Started

          <ArrowRight
            size={18}
            className="ml-2 transition-transform group-hover:translate-x-1"
          />

        </Button>

        <Button
          variant="outline"
          size="lg"
          className="h-13 rounded-xl border-white/15 bg-white/5 px-8 text-white hover:bg-white/10"
        >

          <Play
            size={16}
            className="mr-2"
          />

          Live Demo

        </Button>

      </div>

      <div className="mt-14 flex gap-12">

        <div>

          <h2 className="text-3xl font-bold text-white">

            50K+

          </h2>

          <p className="mt-2 text-sm text-slate-400">

            AI Responses

          </p>

        </div>

        <div>

          <h2 className="text-3xl font-bold text-white">

            10K+

          </h2>

          <p className="mt-2 text-sm text-slate-400">

            Documents

          </p>

        </div>

        <div>

          <h2 className="text-3xl font-bold text-white">

            98%

          </h2>

          <p className="mt-2 text-sm text-slate-400">

            Accuracy

          </p>

        </div>

      </div>

    </div>
  );
}