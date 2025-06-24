"use client";

import { useState } from "react";
import { differenceInHours } from "date-fns";
import Image from "next/image";

export default function RodwellPage() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [sampleTime, setSampleTime] = useState("");
  const [birthWeight, setBirthWeight] = useState("");

  const [wbc, setWbc] = useState("");
  const [segs, setSegs] = useState("");
  const [bands, setBands] = useState("");
  const [metamyelocytes, setMetamyelocytes] = useState("");
  const [myelocytes, setMyelocytes] = useState("");
  const [platelets, setPlatelets] = useState("");
  const [toxicGranulation, setToxicGranulation] = useState(false);

  const [maternalRisks, setMaternalRisks] = useState({
    bolsaRota: false,
    tpp: false,
    itu: false,
    corio: false,
    febre: false,
    cerclagem: false,
    medicinaFetal: false,
  });

  const getHoursOfLife = () => {
    if (!birthDate || !birthTime || !sampleTime) return 0;
    const birth = new Date(`${birthDate}T${birthTime}`);
    const sample = new Date(sampleTime);
    return differenceInHours(sample, birth);
  };

  type ReferenceLimits = {
    neutropenia: number;
    neutrofilia: number;
    nImaturos: number;
    ratioIT: number;
  };

  function getReferenceLimits(
    peso: number,
    horas: number
  ): ReferenceLimits | null {
    const isLowWeight = peso < 1500;
    const ranges = [
      { h: 0, label: "Nascimento" },
      { h: 12, label: "12 H" },
      { h: 24, label: "24 H" },
      { h: 36, label: "36 H" },
      { h: 48, label: "48 H" },
      { h: 60, label: "60 H" },
      { h: 72, label: "72 H" },
      { h: 120, label: "120 H" },
      { h: 672, label: "4º ao 28º dia" },
    ];
    const closestRange = ranges.reduce((prev, curr) =>
      horas >= curr.h ? curr : prev
    );
    const ref: Record<string, ReferenceLimits> = {
      Nascimento: {
        neutropenia: isLowWeight ? 500 : 1800,
        neutrofilia: isLowWeight ? 6300 : 5400,
        nImaturos: 1100,
        ratioIT: 0.16,
      },
      "12 H": {
        neutropenia: isLowWeight ? 1800 : 7800,
        neutrofilia: isLowWeight ? 12400 : 14500,
        nImaturos: 1500,
        ratioIT: 0.16,
      },
      "24 H": {
        neutropenia: isLowWeight ? 2200 : 7000,
        neutrofilia: isLowWeight ? 14000 : 12600,
        nImaturos: 1280,
        ratioIT: 0.15,
      },
      "36 H": {
        neutropenia: isLowWeight ? 1800 : 5400,
        neutrofilia: isLowWeight ? 11600 : 10600,
        nImaturos: 1100,
        ratioIT: 0.13,
      },
      "48 H": {
        neutropenia: isLowWeight ? 1100 : 3600,
        neutrofilia: isLowWeight ? 9000 : 8500,
        nImaturos: 850,
        ratioIT: 0.13,
      },
      "60 H": {
        neutropenia: isLowWeight ? 1100 : 3000,
        neutrofilia: isLowWeight ? 6000 : 7200,
        nImaturos: 650,
        ratioIT: 0.13,
      },
      "72 H": {
        neutropenia: isLowWeight ? 1100 : 1800,
        neutrofilia: isLowWeight ? 6000 : 7000,
        nImaturos: 550,
        ratioIT: 0.13,
      },
      "120 H": {
        neutropenia: isLowWeight ? 1100 : 1800,
        neutrofilia: isLowWeight ? 6000 : 7000,
        nImaturos: 500,
        ratioIT: 0.13,
      },
      "4º ao 28º dia": {
        neutropenia: isLowWeight ? 1100 : 1800,
        neutrofilia: isLowWeight ? 6000 : 5400,
        nImaturos: 500,
        ratioIT: 0.12,
      },
    };
    return ref[closestRange.label];
  }

  const horasDeVida = getHoursOfLife();
  const pesoNum = Number(birthWeight);
  const ref = getReferenceLimits(pesoNum, horasDeVida);

  const totalNeutrophils =
    Number(segs) + Number(bands) + Number(metamyelocytes) + Number(myelocytes);
  const immatureNeutrophils =
    Number(bands) + Number(metamyelocytes) + Number(myelocytes);
  const ratioIT = totalNeutrophils ? immatureNeutrophils / totalNeutrophils : 0;
  const ratioIM = Number(segs) ? immatureNeutrophils / Number(segs) : 0;

  const neutropenia = totalNeutrophils < (ref?.neutropenia || 0);
  const neutrofilia = totalNeutrophils > (ref?.neutrofilia || Infinity);
  const imaturosElevados = immatureNeutrophils > (ref?.nImaturos || 0);
  const itElevado = ratioIT > (ref?.ratioIT || 0);

  let score = 0;
  const interpretacoes = [] as string[];

  if (
    (horasDeVida <= 0 && (Number(wbc) < 5000 || Number(wbc) > 25000)) ||
    (horasDeVida > 0 && horasDeVida <= 24 && Number(wbc) > 30000) ||
    (horasDeVida > 48 && Number(wbc) > 21000)
  ) {
    interpretacoes.push(
      "Leucocitose ou leucopenia conforme horas de vida (1 ponto)"
    );
    score += 1;
  }
  if (neutropenia || neutrofilia) {
    interpretacoes.push("Neutropenia ou neutrofilia (1 ponto)");
    score += 1;
  }
  if (imaturosElevados) {
    interpretacoes.push("Aumento de neutrófilos imaturos (1 ponto)");
    score += 1;
  }
  if (itElevado) {
    interpretacoes.push("Índice I/T aumentado (1 ponto)");
    score += 1;
  }
  if (ratioIM >= 0.3) {
    interpretacoes.push(
      "Razão de neutrófilos imaturos/segmentados ≥ 0,3 (1 ponto)"
    );
    score += 1;
  }
  if (toxicGranulation) {
    interpretacoes.push(
      "Neutrófilos com vacuolização ou granulação tóxica (1 ponto)"
    );
    score += 1;
  }
  if (Number(platelets) < 150000) {
    interpretacoes.push("Plaquetopenia (<150.000) (1 ponto)");
    score += 1;
  }

  const maternalRiskCount = Object.values(maternalRisks).filter(Boolean).length;

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Calculadora de Escore de Rodwell
      </h1>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Fatores de risco maternos</h2>
        {Object.entries(maternalRisks).map(([key, val]) => (
          <Checkbox
            key={key}
            label={riscoLabel(key)}
            checked={val}
            onChange={(checked) =>
              setMaternalRisks((r) => ({ ...r, [key]: checked }))
            }
          />
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Dados do nascimento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Data de nascimento"
            type="date"
            value={birthDate}
            onChange={setBirthDate}
          />
          <Input
            label="Hora de nascimento"
            type="time"
            value={birthTime}
            onChange={setBirthTime}
          />
          <Input
            label="Hora da coleta"
            type="datetime-local"
            value={sampleTime}
            onChange={setSampleTime}
          />
          <Input
            label="Peso ao nascer (g)"
            type="number"
            value={birthWeight}
            onChange={setBirthWeight}
          />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Parâmetros laboratoriais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Leucócitos totais"
            type="number"
            value={wbc}
            onChange={setWbc}
          />
          <Input
            label="Segmentados"
            type="number"
            value={segs}
            onChange={setSegs}
          />
          <Input
            label="Bastonetes"
            type="number"
            value={bands}
            onChange={setBands}
          />
          <Input
            label="Metamielócitos"
            type="number"
            value={metamyelocytes}
            onChange={setMetamyelocytes}
          />
          <Input
            label="Mielócitos"
            type="number"
            value={myelocytes}
            onChange={setMyelocytes}
          />
          <Input
            label="Plaquetas"
            type="number"
            value={platelets}
            onChange={setPlatelets}
          />
        </div>
        <Checkbox
          label="Presença de neutrófilos com granulação tóxica ou vacuolização"
          checked={toxicGranulation}
          onChange={setToxicGranulation}
        />
      </div>

      <Image
        src="/imgs/calculatorimgs/rodwell.png"
        alt="Tabela do escore de Rodwell"
        width={500}
        height={300}
      />

      <section className="mt-6 text-center space-y-2">
        <p>
          <strong>Horas de vida no momento da coleta:</strong> {horasDeVida}h
        </p>
        <p>
          <strong>Índice I/T:</strong> {ratioIT.toFixed(2)}
        </p>
        <p>
          <strong>Índice I/M:</strong> {ratioIM.toFixed(2)}
        </p>
        <p>
          <strong>Fatores de risco maternos:</strong> {maternalRiskCount}
        </p>
        <p className="text-xl font-bold">Escore de Rodwell: {score}</p>

        {interpretacoes.length > 0 && (
          <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded space-y-1 text-red-800">
            <p className="font-semibold">Alterações detectadas:</p>
            <ul className="list-disc list-inside">
              {interpretacoes.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}

type InputProps = {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
};

function Input({ label, type, value, onChange }: InputProps) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border p-2 rounded"
      />
    </div>
  );
}

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
};

function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

function riscoLabel(key: string) {
  const labels: Record<string, string> = {
    bolsaRota: "Bolsa rota > 18h",
    tpp: "Trabalho de parto prematuro sem causa aparente",
    itu: "ITU vigente ou tratada há < 72h do parto",
    corio: "Corioamnionite",
    febre: "Febre materna nas 48h antes do parto",
    cerclagem: "Cerclagem",
    medicinaFetal: "Procedimento de medicina fetal",
  };
  return labels[key] ?? key;
}
