export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      {/* Main Background */}

      <div className="absolute inset-0 bg-[#030712]" />

      {/* Top Blue Glow */}

      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />

      {/* Bottom Violet Glow */}

      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[140px]" />

      {/* Left Glow */}

      <div className="absolute left-0 top-1/2 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-[120px]" />

    </div>
  );
}