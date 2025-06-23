import { Heading } from "@/components/Heading";
import { Paperclip } from "lucide-react";

export default function Materiais() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Heading
        title="Materiais e Resumos"
        description="Acesse os melhores materiais e resumos feitos por residentes e especialistas com residência médica"
        icon={Paperclip}
        iconColor="text-emerald-500"
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
