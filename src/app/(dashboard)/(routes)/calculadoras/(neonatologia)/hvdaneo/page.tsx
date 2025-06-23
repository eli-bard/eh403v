"use client";
import { useState } from "react";

export default function HidratacaoVenosa() {
  // Estados para os inputs
  const [peso, setPeso] = useState<number>(0);
  const [oh, setOh] = useState<number>(0);
  const [vig, setVig] = useState<number>(0);
  const [ca, setCa] = useState<number>(0);
  const [na, setNa] = useState<number>(0);
  const [k, setK] = useState<number>(0);

  // Estados para as apresentações
  const [apresentacaoCa, setApresentacaoCa] = useState<string>("glucal10");
  const [apresentacaoNa, setApresentacaoNa] = useState<string>("nacl20");
  const [apresentacaoK, setApresentacaoK] = useState<string>("kcl10");

  // Estados para os resultados
  const [resultados, setResultados] = useState({
    volumeGlicosado5: 0,
    volumeGlicose50: 0,
    volumeCalcio: 0,
    volumeSodio: 0,
    volumePotassio: 0,
    vazao: 0,
    concentracaoGlicose: 0,
    alertaGlicose: "",
    mostrarResultados: false,
  });

  // Objeto de concentrações
  const concentracoes = {
    glucal10: { mEq: 0.45 }, // Gluconato de Cálcio 10% → 0.45 mEq/mL
    nacl20: { mEq: 3.4 }, // NaCl 20% → 3.4 mEq/mL
    nacl10: { mEq: 1.7 }, // NaCl 10% → 1.7 mEq/mL
    kcl10: { mEq: 1.34 }, // KCl 10% → 1.34 mEq/mL
    kcl191: { mEq: 2.56 }, // KCl 19,1% → 2.56 mEq/mL
  };

  // Função de cálculo
  const calcularHVNeo = () => {
    // Calcular valores conforme fórmulas
    const volumeTotal = peso * oh;
    const gramasGlicose = vig * peso * 1.44;

    // Calcular volumes (ajustando pela concentração em mEq/mL)
    const volumeCalcio =
      (peso * ca) /
      concentracoes[apresentacaoCa as keyof typeof concentracoes].mEq;
    const volumeSodio =
      (peso * na) /
      concentracoes[apresentacaoNa as keyof typeof concentracoes].mEq;
    const volumePotassio =
      (peso * k) /
      concentracoes[apresentacaoK as keyof typeof concentracoes].mEq;

    const volumeParaGlicose =
      volumeTotal - (volumeCalcio + volumeSodio + volumePotassio);

    const aaa = gramasGlicose * 100;
    const bbb = volumeParaGlicose * 5;
    const volumeGlicose50 = (aaa - bbb) / 45;
    const volumeGlicosado5 = volumeParaGlicose - volumeGlicose50;

    const concentracaoGlicose = (gramasGlicose / volumeTotal) * 100;
    const vazao = volumeTotal / 24;

    // Verificar concentração de glicose
    let alertaGlicose = "";
    if (concentracaoGlicose > 12.5) {
      alertaGlicose = "Atenção: Concentração de glicose acima de 12.5%!";
    }

    // Atualizar resultados
    setResultados({
      volumeGlicosado5,
      volumeGlicose50,
      volumeCalcio,
      volumeSodio,
      volumePotassio,
      vazao,
      concentracaoGlicose,
      alertaGlicose,
      mostrarResultados: true,
    });
  };

  // Obter texto da apresentação
  const getApresentacaoText = (tipo: string, valor: string) => {
    switch (tipo) {
      case "ca":
        return valor === "glucal10" ? "Gluconato de cálcio 10%" : "";
      case "na":
        return valor === "nacl20"
          ? "NaCl 20%"
          : valor === "nacl10"
          ? "NaCl 10%"
          : "";
      case "k":
        return valor === "kcl10"
          ? "KCl 10%"
          : valor === "kcl191"
          ? "KCl 19,1%"
          : "";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Calculadora de Hidratação Venosa em Neonatologia
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Coluna 1 - Inputs */}
        <div className="space-y-4">
          <div className="form-group">
            <label
              htmlFor="peso"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Peso (kg)
            </label>
            <input
              id="peso"
              type="number"
              step="0.01"
              className="w-full p-2 border rounded-md"
              value={peso}
              onChange={(e) => setPeso(parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="oh"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              OH/HV (mL/kg/dia)
            </label>
            <input
              id="oh"
              type="number"
              step="0.1"
              className="w-full p-2 border rounded-md"
              value={oh}
              onChange={(e) => setOh(parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="vig"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              VIG (mg/kg/min)
            </label>
            <input
              id="vig"
              type="number"
              step="0.1"
              className="w-full p-2 border rounded-md"
              value={vig}
              onChange={(e) => setVig(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Coluna 2 - Eletrólitos */}
        <div className="space-y-4">
          <div className="form-group">
            <label
              htmlFor="ca"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cálcio (mEq/kg/dia)
            </label>
            <div className="flex gap-2">
              <input
                id="ca"
                type="number"
                step="0.1"
                className="flex-1 p-2 border rounded-md"
                value={ca}
                onChange={(e) => setCa(parseFloat(e.target.value) || 0)}
              />
              <select
                className="p-2 border rounded-md"
                value={apresentacaoCa}
                onChange={(e) => setApresentacaoCa(e.target.value)}
              >
                <option value="glucal10">Gluconato 10%</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label
              htmlFor="na"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sódio (mEq/kg/dia)
            </label>
            <div className="flex gap-2">
              <input
                id="na"
                type="number"
                step="0.1"
                className="flex-1 p-2 border rounded-md"
                value={na}
                onChange={(e) => setNa(parseFloat(e.target.value) || 0)}
              />
              <select
                className="p-2 border rounded-md"
                value={apresentacaoNa}
                onChange={(e) => setApresentacaoNa(e.target.value)}
              >
                <option value="nacl20">NaCl 20%</option>
                <option value="nacl10">NaCl 10%</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label
              htmlFor="k"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Potássio (mEq/kg/dia)
            </label>
            <div className="flex gap-2">
              <input
                id="k"
                type="number"
                step="0.1"
                className="flex-1 p-2 border rounded-md"
                value={k}
                onChange={(e) => setK(parseFloat(e.target.value) || 0)}
              />
              <select
                className="p-2 border rounded-md"
                value={apresentacaoK}
                onChange={(e) => setApresentacaoK(e.target.value)}
              >
                <option value="kcl10">KCl 10%</option>
                <option value="kcl191">KCl 19,1%</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={calcularHVNeo}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Calcular
        </button>
      </div>

      {/* Resultados */}
      {resultados.mostrarResultados && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Resultados
          </h2>

          {resultados.alertaGlicose && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
              {resultados.alertaGlicose}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Glicosado 5%</p>
              <p className="text-lg font-semibold">
                {resultados.volumeGlicosado5.toFixed(2)} mL
              </p>
            </div>

            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Glicose 50%</p>
              <p className="text-lg font-semibold">
                {resultados.volumeGlicose50.toFixed(2)} mL
              </p>
            </div>

            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">
                Cálcio ({getApresentacaoText("ca", apresentacaoCa)})
              </p>
              <p className="text-lg font-semibold">
                {resultados.volumeCalcio.toFixed(2)} mL
              </p>
            </div>

            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">
                Sódio ({getApresentacaoText("na", apresentacaoNa)})
              </p>
              <p className="text-lg font-semibold">
                {resultados.volumeSodio.toFixed(2)} mL
              </p>
            </div>

            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">
                Potássio ({getApresentacaoText("k", apresentacaoK)})
              </p>
              <p className="text-lg font-semibold">
                {resultados.volumePotassio.toFixed(2)} mL
              </p>
            </div>

            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Vazão</p>
              <p className="text-lg font-semibold">
                {resultados.vazao.toFixed(2)} mL/h
              </p>
            </div>

            <div className="bg-white p-3 rounded-md shadow-sm md:col-span-2">
              <p className="text-sm text-gray-500">
                Concentração de Glicose Final
              </p>
              <p className="text-lg font-semibold">
                {resultados.concentracaoGlicose.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500">
        <p>
          Esta ferramenta não substitui o julgamento clínico. Consulte sempre as
          diretrizes mais recentes.
        </p>
      </div>
    </div>
  );
}
