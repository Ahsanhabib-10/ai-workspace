import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import FadeIn from "@/components/common/animations/FadeIn";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <Section>

      <Container>

        <FadeIn>

          <div className="relative overflow-hidden rounded-[40px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-white/5 to-violet-500/10 px-8 py-24 text-center">

            <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />

            <p className="relative text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              Start Today
            </p>

            <h2 className="relative mt-6 text-5xl font-black text-white md:text-7xl">
              Build Your
              <br />
              AI Workspace
            </h2>

            <p className="relative mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
              Join thousands of users organizing documents,
              chatting with AI and building their intelligent
              second brain.
            </p>

            <Button
              size="lg"
              className="relative mt-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-10"
            >
              Get Started Free
            </Button>

          </div>

        </FadeIn>

      </Container>

    </Section>
  );
}