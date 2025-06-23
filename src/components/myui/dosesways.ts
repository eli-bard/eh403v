interface JeitosdeDoses {
  id: string;
  title: string;
  description: string;
  category: string;
}

export const dosesways: JeitosdeDoses[] = [
  {
    id: "iacalcdoses",
    title: "Inteligência artificial",
    description:
      "EM CONSTRUÇÃO IA dedicada a responder a dose das medicações com referência bibliográfica",
    category: "WhatsApp",
  },
  {
    id: "calcdoses",
    title: "Calcular doses de medicamentos",
    description:
      "Aprenda a calcular a dose das medicações através da fórmula da Pri que resume as regras de 3.",
    category: "Online",
  },
  {
    id: "calcdvas",
    title: "DVAs e sedoanalgesia",
    description:
      "Aprenda a calcular a dose das DVAs e sedoanalgesia e a montar a diluição para administrar EV em BIC.",
    category: "Online",
  },
];
