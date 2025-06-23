import { Heading } from "@/components/Heading";
import { ShoppingBag } from "lucide-react";

import ProductCard from "@/components/myui/ProductCard";
import { MedicalProduct } from "@/components/myui/products";

const medicalProducts: MedicalProduct[] = [
  {
    id: 1,
    name: "Estetoscopio neo",
    description: "Classic 2 Neo - Preto",
    image: "/imgs/productimgs/esteto-neo.png",
    affiliateLink: "https://amzn.to/4kUvm8o",
    //price: "R$ 129,90",
  },
  {
    id: 2,
    name: "Termômetro digital G-tech",
    description:
      "Medidor de temperatura da g-tech, resistente, fácil de carregar e necessário para pediatria e neonatologia",
    image: "/imgs/productimgs/termometro.png",
    affiliateLink: "https://amzn.to/4n9wZ3O",
    //price: "R$ 129,90",
  },
  {
    id: 3,
    name: "Estetoscópio Littman Pediátrico",
    description: "Classic 2 pediátrico - Rainbow",
    image: "/imgs/productimgs/esteto-rainbow.png",
    affiliateLink: "https://amzn.to/3TpZyMB",
    //price: "R$ 129,90",
  },
  {
    id: 4,
    name: "Estetoscópio Littman Pediátrico",
    description: "Classic 2 pediátrico - Preto",
    image: "/imgs/productimgs/esteto-preto.png",
    affiliateLink: "https://amzn.to/3HLBOjr",
    //price: "R$ 129,90",
  },
  {
    id: 5,
    name: "Otoscópio digital BEBIRD",
    description:
      "Otoscópio com conexão para o celular e visualização com boa definição, permite tirar fotos.",
    image: "/imgs/productimgs/otoscopio-bebird.png",
    affiliateLink: "https://amzn.to/43J78YO",
    //price: "R$ 129,90",
  },
  {
    id: 6,
    name: "Otoscópio digital SmartOtoscope",
    description:
      "Otoscópio com conexão para o celular e visualização com boa definição, permite tirar fotos.",
    image: "/imgs/productimgs/otoscopio-smart.png",
    affiliateLink: "https://amzn.to/3ZxijkM",
    //price: "R$ 129,90",
  },
  {
    id: 7,
    name: "Oxímetro de Dedo Adulto",
    description: "Medidor de saturação de oxigênio e frequência cardíaca",
    image: "/imgs/productimgs/oximetro-adulto.png",
    affiliateLink: "https://amzn.to/3I94D9z",
    //price: "R$ 129,90",
  },
  {
    id: 8,
    name: "Oxímetro de Dedo Pediátrico",
    description: "Medidor de saturação de oxigênio e frequência cardíaca",
    image: "/imgs/productimgs/oximetro.png",
    affiliateLink: "https://amzn.to/3HKlwHO",
    //price: "R$ 129,90",
  },
];

export default function Shopping() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Heading
        title="Compras"
        description="Encontre os produtos usados e indicados por chefes e residentes"
        icon={ShoppingBag}
        iconColor="text-pink-700"
        bgColor="bg-violet-500/10"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            O que os R+ tem indicado para o dia a dia?
          </h1>

          <p className="text-gray-600 mb-8">
            Selecionamos os melhores produtos para você começar bem sua
            residência ou sua carreira como médico(a)
          </p>

          <div className="bg-yellow-50 p-4 rounded-lg mb-8">
            <p className="text-yellow-900">
              <strong>Aviso:</strong> Ao clicar nos produtos, você será
              redirecionado para um site de compras. Aqui fazemos apenas
              indicações de produtos conforme os criadores e colegas costumam
              usar. Garantias e provisões técnicas são determinadas pelo
              vendedor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {medicalProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg mb-8">
            <p className="text-yellow-900">
              Somos afiliados e podemos receber uma comissão por algumas das
              compras.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
