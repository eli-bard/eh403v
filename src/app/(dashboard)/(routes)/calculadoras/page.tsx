import { Heading } from "@/components/Heading";
import CalculatorCard from "@/components/myui/CalculatorCard";
import { calculators } from "@/components/myui/calculators";
import { Calculator } from "lucide-react";

export default function Calculadoras() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Heading
        title="Calculadoras"
        description="Aprenda e confira seus cálculos com calculadoras eficientes e rápidas"
        icon={Calculator}
        iconColor="text-yellow-500"
        bgColor="bg-violet-500/10"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calculator) => (
            <CalculatorCard
              key={calculator.id}
              id={calculator.id}
              title={calculator.title}
              icon={calculator.icon}
              //iconColor={calculator.iconColor}
              //bgColor={calculator.bgColor}
              description={calculator.description}
              category={calculator.category}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
