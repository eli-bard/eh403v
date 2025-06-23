"use client";

import { MedicalProduct } from "@/components/myui/products";
import Image from "next/image";

interface ProductCardProps {
  product: MedicalProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Registra o clique para analytics (opcional)
    console.log(`Product clicked: ${product.name}`);

    // Redireciona para o link de afiliado (abre em nova aba)
    window.open(product.affiliateLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="card cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
      aria-label={`Comprar ${product.name}`}
    >
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="product-image w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-2">{product.description}</p>
        {/* <p className="text-blue-600 font-bold mt-2">{product.price}</p> */}
        <button
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          onClick={handleClick}
        >
          Ver na Loja
        </button>
      </div>
    </div>
  );
}
