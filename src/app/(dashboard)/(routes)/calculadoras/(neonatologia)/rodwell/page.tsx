"use client";

import { useState } from "react";
import { differenceInHours } from "date-fns";
import Image from "next/image";

export default function RodwellPage() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [sampleTime, setSampleTime] = useState("");
  const [birthWeight, setBirthWeight] = useState("");

  // Dados laboratoriais
  const [wbc, setWbc] = useState("");
  const [segs, setSegs] = useState("");
  const [bands, setBands] = useState("");
  const [metamyelocytes, setMetamyelocytes] = useState("");
  const [myelocytes, setMyelocytes] = useState("");
  const [platelets, setPlatelets] = useState("");
  const [toxicGranulation, setToxicGranulation] = useState(false);

  // Fatores de risco maternos
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

  const totalNeutrophils =
    Number(segs) + Number(bands) + Number(metamyelocytes) + Number(myelocytes);
  const immatureNeutrophils =
    Number(bands) + Number(metamyelocytes) + Number(myelocytes);

  const ratioIT = totalNeutrophils ? immatureNeutrophils / totalNeutrophils : 0;
  const ratioIM = Number(segs) ? immatureNeutrophils / Number(segs) : 0;

  // ESCALA DE RODWELL (valores fictícios para exemplo - ajuste conforme a tabela real)
  let score = 0;
  if (Number(wbc) < 5000 || Number(wbc) > 30000) score += 1;
  if (Number(bands) > 1600) score += 1;
  if (ratioIT > 0.2) score += 2;
  if (ratioIM > 0.3) score += 1;
  if (Number(platelets) < 150000) score += 1;
  if (toxicGranulation) score += 1;

  const maternalRiskCount = Object.values(maternalRisks).filter(Boolean).length;

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Calculadora de Escore de Rodwell
      </h1>

      {/* Riscos maternos */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Fatores de risco maternos</h2>
        <em>
          Lembrando que os fatores de risco só influenciam na necessidade de
          avaliar o risco infeccioso{" "}
        </em>
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

      {/* Entrada de nascimento */}
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

      {/* Exames laboratoriais */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Parâmetros laboratoriais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Leucócitos totais (WBC)"
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

      {/* Resultados */}
      <section className="mt-6 text-center space-y-2">
        <p>
          <strong>Horas de vida:</strong> {getHoursOfLife()}h
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
