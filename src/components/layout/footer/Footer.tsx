import Container from "@/components/common/Container";
import Link from "next/link";

const links = [
  "Features",
  "Workspace",
  "Dashboard",
  "Pricing",
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">

      <Container>

        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

          <div>

            <h3 className="text-2xl font-bold text-white">
              Nexora AI
            </h3>

            <p className="mt-2 text-slate-400">
              Your Intelligent Second Brain.
            </p>

          </div>

          <div className="flex gap-8">

            {links.map((link) => (
              <Link
                key={link}
                href="#"
                className="text-slate-400 transition hover:text-white"
              >
                {link}
              </Link>
            ))}

          </div>

        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
          © 2026 Nexora AI. All rights reserved.
        </div>

      </Container>

    </footer>
  );
}