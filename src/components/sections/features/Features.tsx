import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import FadeIn from "@/components/common/animations/FadeIn";

import FeatureGrid from "./FeatureGrid";

export default function Features() {
  return (
    <Section id="features"
      className="relative"
    >
      <Container>

        <FadeIn>

  <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Features
          </p>

          <h2 className="mt-5 text-4xl font-black text-white md:text-6xl">
            Everything You Need
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              In One AI Workspace
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Organize documents, chat with AI, manage projects,
            build knowledge bases and boost productivity
            using one intelligent platform.
          </p>

        </div>
        </FadeIn>
        <FadeIn delay={0.2}>

  <div className="mt-20">

    <FeatureGrid />

  </div>

</FadeIn>

      </Container>
    </Section>
  );
}