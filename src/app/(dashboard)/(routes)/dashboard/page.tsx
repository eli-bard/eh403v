"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Biohazard,
  Calculator,
  Paperclip,
  ShoppingBag,
  Settings,
  CopyCheck,
  BookUser,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Doses",
    icon: Biohazard,
    href: "/doses",
    bgColor: "bg-violet-500/10",
    color: "text-violet-500",
  },
  {
    label: "Calculadoras",
    icon: Calculator,
    href: "/calculadoras",
    bgColor: "bg-violet-500/10",
    color: "text-yellow-500",
  },
  {
    label: "Resumos",
    icon: Paperclip,
    href: "/materiais",
    bgColor: "bg-violet-500/10",
    color: "text-emerald-500",
  },
  {
    label: "Indicações de produtos",
    icon: ShoppingBag,
    href: "/shopping",
    bgColor: "bg-violet-500/10",
    color: "text-pink-700",
  },
  {
    label: "Faça flashcards",
    icon: CopyCheck,
    href: "/flashcards",
    bgColor: "bg-violet-500/10",
    color: "text-orange-300",
  },
  {
    label: "Passômetro virtual",
    icon: BookUser,
    href: "/passometro",
    bgColor: "bg-violet-500/10",
    color: "text-white-300",
  },
  {
    label: "Suporte",
    icon: Settings,
    href: "/suporte",
    bgColor: "bg-violet-500/10",
    color: "text-gray-500",
  },
];

const DashboardHome = () => {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Seja muito bem-vindo!!
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Aprenda mais rápido - Aproveite os benefícios de uma IA dedicada e um
          preceptor disponível 24/7
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
