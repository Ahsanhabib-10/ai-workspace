import Link from "next/link";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <Container>
        <nav className="flex h-20 items-center justify-between">

          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-white"
          >
            Nexora
          </Link>

          <div className="hidden items-center gap-8 md:flex">

            <Link href="#" className="text-sm text-gray-300 hover:text-white">
              Features
            </Link>

            <Link href="#" className="text-sm text-gray-300 hover:text-white">
              AI Assistant
            </Link>

            <Link href="#" className="text-sm text-gray-300 hover:text-white">
              Knowledge Base
            </Link>

            <Link href="#" className="text-sm text-gray-300 hover:text-white">
              Dashboard
            </Link>

          </div>

          <Button>

            Get Started

          </Button>

        </nav>
      </Container>
    </header>
  );
}