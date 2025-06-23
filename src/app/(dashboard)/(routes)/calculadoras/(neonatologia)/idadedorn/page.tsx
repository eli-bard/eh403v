"use client";
import { useState, useEffect, useCallback } from "react";

export default function IdadeNeonatal() {
  // Estados para os inputs
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [horaNascimento, setHoraNascimento] = useState<string>("");
  const [semanasGestacao, setSemanasGestacao] = useState<number>(40);
  const [diasGestacao, setDiasGestacao] = useState<number>(0);

  // Estados para os resultados
  const [idade, setIdade] = useState<string>("Preencha os dados de nascimento");
  const [idadeCorrigida, setIdadeCorrigida] = useState<string | null>(null);

  // Função para calcular idade gestacional corrigida (agora só com data, sem hora)
  const calcularIdadeCorrigida = useCallback(
    (dataNasc: string) => {
      if (!dataNasc) return null;

      const hoje = new Date();
      const nascimento = new Date(dataNasc);

      // Zerar horas para cálculo baseado apenas em dias
      hoje.setHours(0, 0, 0, 0);
      nascimento.setHours(0, 0, 0, 0);

      const diffTempo = hoje.getTime() - nascimento.getTime();
      const diasVida = Math.floor(diffTempo / (1000 * 60 * 60 * 24));

      // Calcular idade corrigida apenas para prematuros (<37 semanas)
      if (semanasGestacao > 0 && semanasGestacao < 37) {
        const diasGestacaoTotal = semanasGestacao * 7 + diasGestacao;
        const diasCorrigidosTotal = diasGestacaoTotal + diasVida;

        // Verificar se já alcançou 40 semanas
        if (diasCorrigidosTotal >= 40 * 7) {
          const diasApos40Semanas = diasCorrigidosTotal - 40 * 7;
          return `40 semanas já alcançadas, hoje com ${diasApos40Semanas} dias de vida pós-termo`;
        } else {
          const semanasCorrigidas = Math.floor(diasCorrigidosTotal / 7);
          const diasCorrigidos = diasCorrigidosTotal % 7;
          return `${semanasCorrigidas} semanas e ${diasCorrigidos} dias (corrigida)`;
        }
      }
      return null;
    },
    [semanasGestacao, diasGestacao]
  );

  // Função principal de cálculo
  const calcularIdade = useCallback(() => {
    if (!dataNascimento) {
      setIdade("Preencha a data de nascimento");
      setIdadeCorrigida(null);
      return;
    }

    try {
      // Cálculo da idade cronológica (continua usando hora)
      const dataHoraNascimento = horaNascimento
        ? `${dataNascimento}T${horaNascimento}`
        : `${dataNascimento}T00:00`;

      const nascimento = new Date(dataHoraNascimento);
      const hoje = new Date();

      const diffTempo = hoje.getTime() - nascimento.getTime();
      const horasVida = Math.floor(diffTempo / (1000 * 60 * 60));

      // Se menor que 4 dias (96 horas), mostrar em horas
      if (horasVida < 96) {
        setIdade(`${horasVida} horas de vida`);
      } else {
        // Cálculo padrão para > 4 dias
        let anos = hoje.getFullYear() - nascimento.getFullYear();
        let meses = hoje.getMonth() - nascimento.getMonth();
        let dias = hoje.getDate() - nascimento.getDate();

        if (dias < 0) {
          const ultimoDiaMesAnterior = new Date(
            hoje.getFullYear(),
            hoje.getMonth(),
            0
          ).getDate();
          meses--;
          dias += ultimoDiaMesAnterior;
        }
        if (meses < 0) {
          anos--;
          meses += 12;
        }

        let textoIdade = "";
        if (anos > 0) textoIdade += `${anos} ano${anos !== 1 ? "s" : ""}`;
        if (meses > 0)
          textoIdade += `${textoIdade ? ", " : ""}${meses} mês${
            meses !== 1 ? "es" : ""
          }`;
        if (dias > 0 || (!anos && !meses))
          textoIdade += `${textoIdade ? " e " : ""}${dias} dia${
            dias !== 1 ? "s" : ""
          }`;

        setIdade(textoIdade);
      }

      // Cálculo da idade corrigida (só com data)
      setIdadeCorrigida(calcularIdadeCorrigida(dataNascimento));
    } catch {
      setIdade("Erro ao calcular idade");
      setIdadeCorrigida(null);
    }
  }, [dataNascimento, horaNascimento, calcularIdadeCorrigida]);

  useEffect(() => {
    calcularIdade();
  }, [calcularIdade]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Calculadora de Idade Neonatal
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div className="form-group">
            <label
              htmlFor="dataNascimento"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Data de Nascimento *
            </label>
            <input
              id="dataNascimento"
              type="date"
              className="w-full p-2 border rounded-md"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="horaNascimento"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Hora de Nascimento (opcional)
            </label>
            <input
              id="horaNascimento"
              type="time"
              className="w-full p-2 border rounded-md"
              value={horaNascimento}
              onChange={(e) => setHoraNascimento(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="form-group">
            <label
              htmlFor="semanasGestacao"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Idade Gestacional ao Nascer (semanas) *
            </label>
            <input
              id="semanasGestacao"
              type="number"
              min="22"
              max="42"
              className="w-full p-2 border rounded-md"
              value={semanasGestacao}
              onChange={(e) =>
                setSemanasGestacao(parseInt(e.target.value) || 40)
              }
              required
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="diasGestacao"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Dias adicionais
            </label>
            <input
              id="diasGestacao"
              type="number"
              min="0"
              max="6"
              className="w-full p-2 border rounded-md"
              value={diasGestacao}
              onChange={(e) => setDiasGestacao(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Resultados</h2>

        <div className="space-y-2">
          <div className="bg-white p-3 rounded-md shadow-sm">
            <p className="text-sm text-gray-500">Idade Cronológica</p>
            <p className="text-lg font-semibold">{idade}</p>
          </div>

          {idadeCorrigida && (
            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">
                Idade Gestacional Corrigida
              </p>
              <p className="text-lg font-semibold">{idadeCorrigida}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>
          <strong>Notas:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Caso não seja inserida a hora de nascimento, consideramos que a
            criança nasceu à 00:00 do dia escolhido
          </li>
          <li>
            Para recém-nascidos com menos de 96 horas (4 dias), a idade é
            exibida em horas
          </li>
          <li>
            A idade corrigida é calculada apenas para prematuros (&lt;37
            semanas)
          </li>
          <li>
            A idade corrigida considera apenas a data de nascimento (ignora a
            hora)
          </li>
        </ul>
      </div>
    </div>
  );
}
