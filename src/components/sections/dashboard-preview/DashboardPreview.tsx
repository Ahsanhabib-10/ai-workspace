import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import FadeIn from "@/components/common/animations/FadeIn";

import DashboardContent from "./DashboardContent";
import DashboardMockup from "./DashboardMockup";

export default function DashboardPreview() {
  return (
    <Section id="dashboard">

      <Container>

        <div className="grid items-center gap-20 lg:grid-cols-2">

          <FadeIn>

            <DashboardContent />

          </FadeIn>

          <FadeIn delay={0.2}>

            <DashboardMockup />

          </FadeIn>

        </div>

      </Container>

    </Section>
  );
}