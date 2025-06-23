import { interpretApgarScore } from "@/components/specifics/apgar";

interface ApgarResultProps {
  totalScore: number;
}

export default function ApgarResult({ totalScore }: ApgarResultProps) {
  const interpretation = interpretApgarScore(totalScore);
  const scoreColor =
    totalScore >= 7
      ? "bg-green-100 text-green-800"
      : totalScore >= 4
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";

  return (
    <div className="mt-8 p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Resultado do Escore de Apgar</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600">Pontuação Total:</p>
          <br></br>
          <span
            className={`text-4xl font-semibold px-4 py-2 rounded-full ${scoreColor}`}
          >
            {totalScore}
          </span>
        </div>
        <div>
          <p className="text-gray-600">Interpretação:</p>
          <p className="text-lg font-semibold">{interpretation}</p>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <p>0-3: Gravemente deprimido</p>
        <p>4-6: Moderadamente deprimido</p>
        <p>7-10: Normal</p>
      </div>
    </div>
  );
}
