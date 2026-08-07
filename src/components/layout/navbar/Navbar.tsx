import Link from "next/link";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "Workspace",
    href: "#workspace",
  },
  {
    name: "Knowledge",
    href: "#knowledge",
  },
  {
    name: "About",
    href: "#about",
  },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 py-4">
      <Container>
        <nav
  className="
    mt-2
    flex
    h-[72px]
    items-center
    justify-between
    rounded-3xl
    border
    border-white/10
    bg-white/[0.04]
    px-6
    backdrop-blur-2xl
    shadow-[0_10px_50px_rgba(0,0,0,0.35)]
  "
>

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 font-bold text-white shadow-lg shadow-blue-500/30">
              N
            </div>

            <div>
              <p className="text-lg font-bold text-white">
                Nexora AI
              </p>

              <p className="text-xs text-slate-400">
                Intelligent Second Brain
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-300 transition-all duration-300 hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}

          <div className="hidden items-center gap-3 lg:flex">

            <Button
              variant="ghost"
              className="text-slate-300 hover:bg-white/10 hover:text-white"
            >
              Login
            </Button>

            <Button
  className="
       rounded-xl
       bg-gradient-to-r
       from-blue-500
       to-violet-600
        px-6
       text-white
        transition-all
        duration-300
        hover:scale-105
        hover:opacity-90
  "
      >
              Get Started
            </Button>

          </div>

        </nav>
      </Container>
    </header>
  );
}