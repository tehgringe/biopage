import Scene from "@/components/Scene";
import Overlay from "@/components/Overlay";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <Scene />
      <Overlay />
    </main>
  );
}
