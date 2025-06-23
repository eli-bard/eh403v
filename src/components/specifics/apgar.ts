export type ApgarParameter =
  | "appearance"
  | "pulse"
  | "grimace"
  | "activity"
  | "respiration";

export interface ApgarScore {
  appearance: number;
  pulse: number;
  grimace: number;
  activity: number;
  respiration: number;
}

export const apgarCriteria = {
  appearance: [
    { score: 0, description: "Pálido ou azulado" },
    { score: 1, description: "Corpo rosado, extremidades azuladas" },
    { score: 2, description: "Completamente rosado" },
  ],
  pulse: [
    { score: 0, description: "Ausente" },
    { score: 1, description: "< 100 batimentos/min" },
    { score: 2, description: "≥ 100 batimentos/min" },
  ],
  grimace: [
    { score: 0, description: "Nenhuma resposta a estímulos" },
    { score: 1, description: "Careta ou movimento fraco" },
    { score: 2, description: "Tosse ou espirro vigoroso" },
  ],
  activity: [
    { score: 0, description: "Flácido" },
    { score: 1, description: "Alguma flexão de extremidades" },
    { score: 2, description: "Movimentos ativos" },
  ],
  respiration: [
    { score: 0, description: "Ausente" },
    { score: 1, description: "Irregular ou choro fraco" },
    { score: 2, description: "Choro vigoroso" },
  ],
};

export const interpretApgarScore = (total: number): string => {
  if (total >= 7) return "Normal";
  if (total >= 4) return "Moderadamente deprimido";
  return "Gravemente deprimido";
};
