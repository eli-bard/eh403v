import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  const animalJobs = [
    {
      animal: "Tartaruga",
      job: "Entregadora Express",
      description: "Prometemos entregar seu pacote... eventualmente.",
      image: "/imgs/notfoundimgs/adult-turtle.jpg",
      alt: "Tartaruga usando boné de entregador",
    },
    {
      animal: "Bicho-preguiça",
      job: "CEO de Startup",
      description:
        "Nossa reunião de board vai durar aproximadamente 3 semanas.",
      image: "/imgs/notfoundimgs/sloth.jpg",
      alt: "Bicho-preguiça usando gravata e segurando um café",
    },
    {
      animal: "Polvo",
      job: "Estagiário",
      description:
        "Pode preparar 8 cafés simultaneamente, mas todos ficam com gosto de água salgada.",
      image: "/imgs/notfoundimgs/octopus.jpg",
      alt: "Polvo estagiário procurando uma função",
    },
    {
      animal: "Pinguim",
      job: "Chefe de cozinha",
      description:
        "Especialista em fazer pratos quentes, mas geralmente tem dificuldades.",
      image: "/imgs/notfoundimgs/pinguin.jpg",
      alt: "Pinguim com roupa de chefe de cozinha",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-12 px-4">
      <div>
        <Image
          src="/logo-black.png"
          alt="EliHelp Logo"
          width={60}
          height={20}
        />
      </div>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Oops! Parece que você encontrou nossa equipe de animais estagiários...
        </h2>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Enquanto nossos humanos competentes tentam consertar isso, aqui estão
          alguns membros inusitados da nossa equipe tentando ajudar:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {animalJobs.map(({ animal, job, description, image, alt }, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 w-full mb-4">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {animal} como {job}
              </h3>
              <p className="text-gray-600 mt-2">{description}</p>
            </div>
          ))}
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 max-w-2xl mx-auto mb-8">
          <p className="text-yellow-700">
            <strong>Aviso importante:</strong> Nenhum animal foi realmente
            prejudicado na criação desta página. Eles são todos atores
            profissionais (ou pelo menos receberam bananas como pagamento).
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Voltar para a página segura (onde humanos trabalham)
        </Link>
      </div>
    </main>
  );
}
