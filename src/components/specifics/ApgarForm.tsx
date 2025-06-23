"use client";

import {
  ApgarParameter,
  ApgarScore,
  apgarCriteria,
} from "@/components/specifics/apgar";

interface ApgarFormProps {
  scores: ApgarScore;
  onScoreChange: (parameter: ApgarParameter, value: number) => void;
}

export default function ApgarForm({ scores, onScoreChange }: ApgarFormProps) {
  const parameters: ApgarParameter[] = [
    "appearance",
    "pulse",
    "grimace",
    "activity",
    "respiration",
  ];
  const parameterLabels = {
    appearance: "Aparência (Coloração)",
    pulse: "Frequência Cardíaca",
    grimace: "Reflexos/Resposta a Estímulos",
    activity: "Tônus Muscular",
    respiration: "Respiração",
  };

  return (
    <div className="space-y-6">
      {parameters.map((param) => (
        <div key={param} className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">
            {parameterLabels[param]}
          </h3>
          <div className="space-y-2">
            {apgarCriteria[param].map((criterion) => (
              <div
                key={`${param}-${criterion.score}`}
                className="flex items-center"
              >
                <input
                  type="radio"
                  id={`${param}-${criterion.score}`}
                  name={param}
                  value={criterion.score}
                  checked={scores[param] === criterion.score}
                  onChange={() => onScoreChange(param, criterion.score)}
                  className="mr-2"
                />
                <label htmlFor={`${param}-${criterion.score}`}>
                  {criterion.score} ponto(s): {criterion.description}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
