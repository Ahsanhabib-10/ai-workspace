import Section from "@/components/common/Section";
import Container from "@/components/common/Container";

import AIContent from "./AIContent";
import AIChat from "./AIChat";

export default function AIPreview() {
  return (
    <Section id="workspace">

      <Container>

        <div className="grid items-center gap-20 lg:grid-cols-2">

          <AIContent />

          <AIChat />

        </div>

      </Container>

    </Section>
  );
}