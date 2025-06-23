"use client";
import Image from "next/image";
import { useState } from "react";

// Tipos para as constantes das fórmulas
interface FormulaConstants {
  name: string;
  OC: number; // Oferta calórica
  OP: number; // Oferta proteica
  Caformula: number; // Cálcio
  Pformula: number; // Fósforo
}

// Constantes para cada opção
const optionConstants: Record<string, FormulaConstants> = {
  lh: { name: "Leite Humano", OC: 62, OP: 1.3, Caformula: 34, Pformula: 14 },
  lhfm85: {
    name: "Leite Humano com FM85",
    OC: 85,
    OP: 3.1,
    Caformula: 100,
    Pformula: 60,
  },
  prenan: { name: "Pré-NAN", OC: 73, OP: 2, Caformula: 85, Pformula: 54 },
  aptamilpre: {
    name: "Aptamil Pré",
    OC: 80,
    OP: 2.5,
    Caformula: 100,
    Pformula: 56,
  },
  aptamil1: { name: "Aptamil 1", OC: 66, OP: 1.2, Caformula: 63, Pformula: 38 },
  nan1supreme: {
    name: "NAN 1 Supreme",
    OC: 67,
    OP: 1.2,
    Caformula: 47,
    Pformula: 25,
  },
  nan1confor: {
    name: "NAN 1 Confort",
    OC: 67,
    OP: 1.2,
    Caformula: 42,
    Pformula: 23,
  },
  pregomin: { name: "Pregomin", OC: 66, OP: 1.8, Caformula: 50, Pformula: 28 },
  alfare: { name: "Alfaré", OC: 68, OP: 1.9, Caformula: 68, Pformula: 46 },
  alfamino: { name: "Alfamino", OC: 70, OP: 1.8, Caformula: 57, Pformula: 39 },
  neocate: { name: "Neocate", OC: 67, OP: 1.9, Caformula: 77, Pformula: 55 },
  infatrini: {
    name: "Infatrini",
    OC: 100,
    OP: 2.6,
    Caformula: 101,
    Pformula: 57,
  },
};

export default function OfertaNutricional() {
  // Estados para os inputs
  const [peso, setPeso] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);
  const [formula, setFormula] = useState<string>("");

  // Estados para os resultados
  const [resultados, setResultados] = useState({
    ofertaHidrica: 0,
    ofertaCalorica: 0,
    ofertaProteica: 0,
    ofertaCalcio: 0,
    ofertaFosforo: 0,
    mostrarResultados: false,
  });

  // Função de cálculo
  const calcularOfertas = () => {
    // Validar entradas
    if (peso <= 0 || volume <= 0 || !formula) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    // Obter as constantes para a fórmula selecionada
    const constants = optionConstants[formula];

    // Calcular os resultados
    const vol8 = volume * 8; // Volume diário (3/3h = 8 tomadas/dia)
    const OHDieta = vol8 / peso;
    const b = vol8 / (peso * 100);

    // Atualizar estado com os resultados
    setResultados({
      ofertaHidrica: OHDieta,
      ofertaCalorica: b * constants.OC,
      ofertaProteica: b * constants.OP,
      ofertaCalcio: b * constants.Caformula,
      ofertaFosforo: b * constants.Pformula,
      mostrarResultados: true,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Calculadora de Oferta Nutricional
      </h1>
      <h5 className="font-bold">
        Conforme os seguintes valores padrão de oferta conforme 100 mL de
        fórmula
      </h5>

      <Image
        src="/imgs/calculatorimgs/tabela-ucin.png"
        alt="Tabela da UCIN"
        width={500}
        height={300}
      />
      <br></br>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Coluna 1 - Dados do Paciente */}
        <div className="space-y-4">
          <div className="form-group">
            <label
              htmlFor="peso"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Peso do Paciente (kg) *
            </label>
            <input
              id="peso"
              type="number"
              step="0.01"
              min="0"
              className="w-full p-2 border rounded-md"
              value={peso || ""}
              onChange={(e) => setPeso(parseFloat(e.target.value) || 0)}
              required
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="volume"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Volume por tomada (ml, 3/3h) *
            </label>
            <input
              id="volume"
              type="number"
              step="1"
              min="0"
              className="w-full p-2 border rounded-md"
              value={volume || ""}
              onChange={(e) => setVolume(parseInt(e.target.value) || 0)}
              required
            />
          </div>
        </div>

        {/* Coluna 2 - Seleção da Fórmula */}
        <div className="space-y-4">
          <div className="form-group">
            <label
              htmlFor="formula"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tipo de Fórmula *
            </label>
            <select
              id="formula"
              className="w-full p-2 border rounded-md"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              required
            >
              <option value="">Selecione uma fórmula</option>
              {Object.entries(optionConstants).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
            <h3 className="text-lg font-medium text-blue-800 mb-2">
              Informações:
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
              <li>Volume deve ser o administrado a cada 3 horas</li>
              <li>O cálculo considera 8 tomadas diárias (3/3h)</li>
              <li>Resultados são por kg/dia</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={calcularOfertas}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Calcular Ofertas
        </button>
      </div>

      {/* Resultados */}
      {resultados.mostrarResultados && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Resultados para {peso} kg, {volume} ml de{" "}
            {optionConstants[formula].name} 3/3h
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Oferta Hídrica</p>
              <p className="text-lg font-semibold">
                {resultados.ofertaHidrica.toFixed(1)} ml/kg/dia
              </p>
            </div>

            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Oferta Calórica</p>
              <p className="text-lg font-semibold">
                {resultados.ofertaCalorica.toFixed(1)} kcal/kg/dia
              </p>
            </div>

            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Oferta Proteica</p>
              <p className="text-lg font-semibold">
                {resultados.ofertaProteica.toFixed(1)} g/kg/dia
              </p>
            </div>

            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Oferta de Cálcio</p>
              <p className="text-lg font-semibold">
                {resultados.ofertaCalcio.toFixed(1)} mg/kg/dia
              </p>
            </div>

            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Oferta de Fósforo</p>
              <p className="text-lg font-semibold">
                {resultados.ofertaFosforo.toFixed(1)} mg/kg/dia
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500">
        <p>
          <strong>Nota:</strong> Esta calculadora fornece estimativas baseadas
          nas fórmulas selecionadas. Consulte sempre um nutricionista para
          avaliação individualizada.
        </p>
      </div>
    </div>
  );
}
