import { Heading } from "@/components/Heading";
import { Settings } from "lucide-react";

export default function Suporte() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Heading
        title="Suporte"
        description="Entre em contato com nosso suporte para resolver suas dúvidas ou problemas com relação à plataforma"
        icon={Settings}
        iconColor="text-gray-500"
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
