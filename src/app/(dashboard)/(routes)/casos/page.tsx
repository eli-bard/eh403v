import { Heading } from "@/components/Heading";
import { CopyCheck } from "lucide-react";

export default function Casos() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Heading
        title="Simulador de casos"
        description="Avalie seus conhecimentos com o simulador de casos clínicos"
        icon={CopyCheck}
        iconColor="text-orange-300"
        bgColor="bg-violet-500/10"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <h3>Ainda estamos em construção</h3>
        </div>
      </main>
    </div>
  );
}
