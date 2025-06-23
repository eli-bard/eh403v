"use client";

import Image from "next/image";
import { useState } from "react";

type Option = {
  label: string;
  value: number;
};

const texturaPele: Option[] = [
  { label: "Fina, gelatinosa (0 pontos)", value: 0 },
  { label: "Fina e lisa (5 pontos)", value: 5 },
  { label: "Lisa com discreta descamação superficial (10 pontos)", value: 10 },
  {
    label:
      "Grossa, com sulcos superficiais e descamação de mãos e pés (15 pontos)",
    value: 15,
  },
  {
    label: "Grossa, descamação profunda e de mãos e pés (20 pontos)",
    value: 20,
  },
];

const formaOrelha: Option[] = [
  { label: "Pavilhão não encurvado (0 pontos)", value: 0 },
  { label: "Parcialmente encurvado no bordo superior (8 pontos)", value: 8 },
  {
    label: "Pavilhão parcialmente encurvado em todo bordo superior (16 pontos)",
    value: 16,
  },
  { label: "Pavilhão auricular totalmente encurvado (24 pontos)", value: 24 },
];

const glandulaMamaria: Option[] = [
  { label: "Ausência de tecido mamário (0 pontos)", value: 0 },
  { label: "Diâmetro < 0,5 cm (5 pontos)", value: 5 },
  { label: "Diâmetro entre 0,5 e 1,0 cm (10 pontos)", value: 10 },
  { label: "Diâmetro > 1,0 cm (15 pontos)", value: 15 },
];

const tamanhoMamilo: Option[] = [
  { label: "Pouco visível, sem aréola (0 pontos)", value: 0 },
  { label: "Nítido, aréola lisa, diâmetro < 0,75 cm (5 pontos)", value: 5 },
  {
    label: "Puntiforme, aréola de borda NÃO elevada > 0,75 cm (10 pontos)",
    value: 10,
  },
  {
    label: "Puntiforme, aréola de borda elevado > 0,75 cm (15 pontos)",
    value: 15,
  },
  {
    label: "Grossa, apergaminhada com sulcos profundos (20 pontos)",
    value: 20,
  },
];

const pregasPlantares: Option[] = [
  { label: "Ausentes (0 pontos)", value: 0 },
  {
    label: "Marcas mal definidas na metade anterior da planta (5 pontos)",
    value: 5,
  },
  {
    label:
      "Marcas bem definidas na metade anterior e sulcos no 1/3 anterior (10 pontos)",
    value: 10,
  },
  { label: "Sulcos na metade anterior da planta (15 pontos)", value: 15 },
];

export default function CapurroPage() {
  const [pele, setPele] = useState(0);
  const [orelha, setOrelha] = useState(0);
  const [glandula, setGlandula] = useState(0);
  const [mamilo, setMamilo] = useState(0);
  const [pregas, setPregas] = useState(0);

  const total = pele + orelha + glandula + mamilo + pregas;
  const escore = (204 + total) / 7;
  const semanas = Math.floor(escore);
  const dias = Math.round((escore - semanas) * 7);

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Calculadora de Capurro Somático
      </h1>

      <Image
        src="/imgs/calculatorimgs/capurro.png"
        alt="Parâmetros Capurro somático"
        width={500}
        height={300}
      />

      <div className="space-y-4">
        <Field
          label="Textura da pele"
          value={pele}
          onChange={setPele}
          options={texturaPele}
        />
        <Field
          label="Forma da orelha"
          value={orelha}
          onChange={setOrelha}
          options={formaOrelha}
        />
        <Field
          label="Tamanho da glândula mamária"
          value={glandula}
          onChange={setGlandula}
          options={glandulaMamaria}
        />
        <Field
          label="Tamanho do mamilo"
          value={mamilo}
          onChange={setMamilo}
          options={tamanhoMamilo}
        />
        <Field
          label="Pregas plantares"
          value={pregas}
          onChange={setPregas}
          options={pregasPlantares}
        />
      </div>

      <div className="text-center mt-8">
        <p className="text-lg font-medium">Pontuação total: {total}</p>
        <p className="text-xl font-bold">
          Idade gestacional: {semanas} semanas e {dias} dias
        </p>
      </div>
    </main>
  );
}

type FieldProps = {
  label: string;
  options: Option[];
  value: number;
  onChange: (v: number) => void;
};

function Field({ label, options, value, onChange }: FieldProps) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <select
        className="w-full border p-2 rounded"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
