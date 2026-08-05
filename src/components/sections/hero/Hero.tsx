import Container from "@/components/common/Container";
import Section from "@/components/common/Section";

import HeroContent from "./HeroContent";
import HeroPreview from "@/components/sections/hero-preview/HeroPreview";

export default function Hero() {
  return (
    <Section className="pt-36">

      <Container>

        <div className="grid items-center gap-20 lg:grid-cols-2">

          <HeroContent />

          <HeroPreview />

        </div>

      </Container>

    </Section>
  );
}