"use client";

import { useState } from "react";
import { differenceInHours } from "date-fns";
import Image from "next/image";

export default function BilirrubinaPage() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [sampleDateTime, setSampleDateTime] = useState("");
  const [gestAgeWeeks, setGestAgeWeeks] = useState("");
  const [gestAgeDays, setGestAgeDays] = useState("");
  const [btTotal, setBtTotal] = useState("");
  const [btDireta, setBtDireta] = useState("");
  const [btIndireta, setBtIndireta] = useState("");
  const [hasRiskFactor, setHasRiskFactor] = useState(false);

  const getHoursOfLife = () => {
    if (!birthDate || !birthTime || !sampleDateTime) return 0;
    const birth = new Date(`${birthDate}T${birthTime}`);
    const sample = new Date(sampleDateTime);
    return differenceInHours(sample, birth);
  };

  const hoursOfLife = getHoursOfLife();
  const gaWeeks = parseInt(gestAgeWeeks);
  const gaDays = parseInt(gestAgeDays);
  const bt = parseFloat(btTotal);
  const btDir = parseFloat(btDireta);

  const tabelaTermo = [
    { hora: 24, nf: [8], nex: [15] },
    { hora: 36, nf: [9.5], nex: [16] },
    { hora: 48, nf: [11], nex: [17] },
    { hora: 72, nf: [13], nex: [18] },
    { hora: 96, nf: [14], nex: [20] },
    { hora: 120, nf: [15], nex: [21] },
  ];

  const tabelaTermo38 = [
    { hora: 24, nf: [10], nex: [18] },
    { hora: 36, nf: [11.5], nex: [20] },
    { hora: 48, nf: [13], nex: [21] },
    { hora: 72, nf: [15], nex: [22] },
    { hora: 96, nf: [16], nex: [23] },
    { hora: 120, nf: [17], nex: [24] },
  ];

  const tabelaPreTermo = [
    { ga: 28, nf: [5, 6], nex: [11, 14] },
    { ga: 30, nf: [6, 8], nex: [12, 14] },
    { ga: 32, nf: [8, 10], nex: [13, 16] },
    { ga: 34, nf: [10, 12], nex: [17, 19] },
  ];

  const verificarTabelaTermo = () => {
    const tabela = gaWeeks >= 38 ? tabelaTermo38 : tabelaTermo;
    const faixa = tabela.find((linha) => hoursOfLife <= linha.hora);
    if (!faixa) return {};
    let nf = faixa.nf[0];
    let nex = faixa.nex[0];
    let ajustado = false;
    if (hasRiskFactor) {
      nf -= 2;
      nex -= 2;
      ajustado = true;
    }
    return {
      nf: bt >= nf,
      nex: bt >= nex,
      valores: faixa,
      ajustado,
    };
  };

  const verificarTabelaPreTermo = () => {
    const faixa = tabelaPreTermo.find((linha) => gaWeeks <= linha.ga);
    if (!faixa) return {};
    let nf = faixa.nf[0];
    let nex = faixa.nex[0];
    let ajustado = false;
    if (hasRiskFactor) {
      nf -= 2;
      nex -= 2;
      ajustado = true;
    }
    return {
      nf: bt >= nf,
      nex: bt >= nex,
      valores: faixa,
      ajustado,
    };
  };

  const resultados =
    gaWeeks >= 35 && gaWeeks < 38
      ? verificarTabelaTermo()
      : gaWeeks >= 38
      ? verificarTabelaTermo()
      : verificarTabelaPreTermo();

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Calculadora de Bilirrubina Neonatal
      </h1>

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
          label="IG ao nascer (semanas)"
          type="number"
          value={gestAgeWeeks}
          onChange={setGestAgeWeeks}
        />
        <Input
          label="IG ao nascer (dias)"
          type="number"
          value={gestAgeDays}
          onChange={setGestAgeDays}
        />
        <Input
          label="Data e hora da coleta"
          type="datetime-local"
          value={sampleDateTime}
          onChange={setSampleDateTime}
        />
      </div>

      <Checkbox
        label="Presença de fator de risco"
        checked={hasRiskFactor}
        onChange={setHasRiskFactor}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Bilirrubina Total (mg/dL)"
          type="number"
          value={btTotal}
          onChange={setBtTotal}
        />
        <Input
          label="Direta (mg/dL)"
          type="number"
          value={btDireta}
          onChange={setBtDireta}
        />
        <Input
          label="Indireta (mg/dL)"
          type="number"
          value={btIndireta}
          onChange={setBtIndireta}
        />
      </div>

      <div className="text-center space-y-2">
        <p>
          <strong>Horas de vida:</strong> {hoursOfLife}h
        </p>
        {btDir > 1 && (
          <p className="text-red-600 font-semibold">
            Atenção: bilirrubina direta acima de 1 mg/dL.
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <strong>Referência para NF:</strong>{" "}
            {resultados.valores?.nf?.join(" a ")} mg/dL
          </p>
          <p>
            <strong>Referência para NEx:</strong>{" "}
            {resultados.valores?.nex?.join(" a ")} mg/dL
          </p>
        </div>
        {resultados.ajustado && (
          <p className="text-yellow-600">
            Devido à presença de um fator de risco, devemos subtrair 2 mg/dL do
            valor de referência para fototerapia ou exsanguineotransfusão.
          </p>
        )}
        <p>
          <strong>Resultado:</strong>
        </p>
        <p>
          {resultados.nex ? (
            <span className="text-red-600 block">
              Nível de exsanguineotransfusão (NEx) atingido.
            </span>
          ) : resultados.nf ? (
            <span className="text-yellow-600">
              Nível de fototerapia (NF) atingido.
            </span>
          ) : (
            <span className="text-green-600">Nenhum limite atingido.</span>
          )}
        </p>

        <p className="text-sm text-gray-600">
          Referência: Sociedade Brasileira de Pediatria, 2021.
        </p>
      </div>
      <div>
        <Image
          src="/imgs/calculatorimgs/ictericia1.png"
          alt="Nível de BT para indicação de fototerapia e est em RN > 35 semanas"
          className="text-align: justify"
          width={500}
          height={300}
        />
        <Image
          src="/imgs/calculatorimgs/ictericia2.png"
          alt="Nível de BT para indicação de fototerapia e est em RN < 35 semanas"
          className="text-align: justify"
          width={500}
          height={300}
        />
        <Image
          src="/imgs/calculatorimgs/ictericiasusp.png"
          alt="Parâmetros Capurro somático"
          className="text-align: justify"
          width={300}
          height={100}
        />
      </div>
    </main>
  );
}

function Input({ label, type, value, onChange }: any) {
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

function Checkbox({ label, checked, onChange }: any) {
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
