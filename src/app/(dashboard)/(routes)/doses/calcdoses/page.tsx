// app/calculadora-medicamentos/page.tsx
"use client";

import { useState } from "react";

type DoseUnit = "mg/kg/dia" | "mcg/kg/dia" | "mg/kg/dose" | "mcg/kg/dose";
type ConcentrationUnit = "mg/mL" | "mcg/mL";

export default function CalculadoraMedicamentos() {
  const [peso, setPeso] = useState<string>("");
  const [dose, setDose] = useState<string>("");
  const [doseUnit, setDoseUnit] = useState<DoseUnit>("mg/kg/dia");
  const [diluicao, setDiluicao] = useState<string>("");
  const [doseApresentacao, setDoseApresentacao] = useState<string>("");
  const [apresentacaoUnit, setApresentacaoUnit] = useState<"mg" | "mcg">("mg");
  const [vezesAdministrar, setVezesAdministrar] = useState<string>("1");
  const [concentracaoMinima, setConcentracaoMinima] = useState<string>("");
  const [concentracaoMinimaUnit, setConcentracaoMinimaUnit] =
    useState<ConcentrationUnit>("mg/mL");
  const [concentracaoUsual, setConcentracaoUsual] = useState<string>("");
  const [concentracaoUsualUnit, setConcentracaoUsualUnit] =
    useState<ConcentrationUnit>("mg/mL");
  const [activeTab, setActiveTab] = useState<"resultados" | "explicacao">(
    "resultados"
  );

  const calcularResultados = () => {
    const pesoNum = parseFloat(peso) || 0;
    const doseNum = parseFloat(dose) || 0;
    const diluicaoNum = parseFloat(diluicao) || 0;
    const doseApresentacaoNum = parseFloat(doseApresentacao) || 0;
    const vezesNum = parseFloat(vezesAdministrar) || 1;
    const concMinimaNum = parseFloat(concentracaoMinima) || 0;
    const concUsualNum = parseFloat(concentracaoUsual) || 0;

    // Converter unidades para mg para cálculos consistentes
    let doseConvertida = doseNum;
    if (doseUnit.includes("mcg")) {
      doseConvertida = doseNum / 1000; // converte mcg para mg
    }

    let doseApresentacaoConvertida = doseApresentacaoNum;
    if (apresentacaoUnit === "mcg") {
      doseApresentacaoConvertida = doseApresentacaoNum / 1000;
    }

    let concMinimaConvertida = concMinimaNum;
    if (concentracaoMinimaUnit === "mcg/mL") {
      concMinimaConvertida = concMinimaNum / 1000;
    }

    let concUsualConvertida = concUsualNum;
    if (concentracaoUsualUnit === "mcg/mL") {
      concUsualConvertida = concUsualNum / 1000;
    }

    // Cálculos
    const a = pesoNum * doseConvertida;
    const b = diluicaoNum / doseApresentacaoConvertida;
    const c = a * b;
    const d = c / vezesNum;
    const g = a / vezesNum;
    const e = concMinimaConvertida > 0 ? g / concMinimaConvertida : 0;
    const f = concUsualConvertida > 0 ? g / concUsualConvertida : 0;

    return { a, b, c, d, e, f, g };
  };

  const { a, b, c, d, e, f, g } = calcularResultados();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Calculadora de Medicamentos
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coluna 1 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Peso (kg)
              </label>
              <input
                type="number"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ex: 70"
                step="0.1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dose
                </label>
                <input
                  type="number"
                  value={dose}
                  onChange={(e) => setDose(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ex: 5"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unidade
                </label>
                <select
                  value={doseUnit}
                  onChange={(e) => setDoseUnit(e.target.value as DoseUnit)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="mg/kg/dia">mg/kg/dia</option>
                  <option value="mcg/kg/dia">mcg/kg/dia</option>
                  <option value="mg/kg/dose">mg/kg/dose</option>
                  <option value="mcg/kg/dose">mcg/kg/dose</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diluição (mL)
              </label>
              <input
                type="number"
                value={diluicao}
                onChange={(e) => setDiluicao(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ex: 10"
                step="0.1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dose da Apresentação
                </label>
                <input
                  type="number"
                  value={doseApresentacao}
                  onChange={(e) => setDoseApresentacao(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ex: 500"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unidade
                </label>
                <select
                  value={apresentacaoUnit}
                  onChange={(e) =>
                    setApresentacaoUnit(e.target.value as "mg" | "mcg")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="mg">mg</option>
                  <option value="mcg">mcg</option>
                </select>
              </div>
            </div>
          </div>

          {/* Coluna 2 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nº de vezes a administrar a medicação por dia
              </label>
              <input
                type="number"
                value={vezesAdministrar}
                onChange={(e) => setVezesAdministrar(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ex: 8/8h = 3"
                min="1"
              />
              <div className="absolute hidden group-hover:block z-10 w-64 p-2 mt-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-md shadow-lg">
                <p>
                  Caso seja um cálculo por dose ou de uma medicação SOS, deixe
                  sempre esse valor = 1
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Concentração Máxima
                </label>
                <input
                  type="number"
                  value={concentracaoMinima}
                  onChange={(e) => setConcentracaoMinima(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ex: 1"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unidade
                </label>
                <select
                  value={concentracaoMinimaUnit}
                  onChange={(e) =>
                    setConcentracaoMinimaUnit(
                      e.target.value as ConcentrationUnit
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="mg/mL">mg/mL</option>
                  <option value="mcg/mL">mcg/mL</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Concentração Usual
                </label>
                <input
                  type="number"
                  value={concentracaoUsual}
                  onChange={(e) => setConcentracaoUsual(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ex: 5"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unidade
                </label>
                <select
                  value={concentracaoUsualUnit}
                  onChange={(e) =>
                    setConcentracaoUsualUnit(
                      e.target.value as ConcentrationUnit
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="mg/mL">mg/mL</option>
                  <option value="mcg/mL">mcg/mL</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Abas de Resultados e Explicação */}
        <div className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("resultados")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "resultados"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Resultados
              </button>
              <button
                onClick={() => setActiveTab("explicacao")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "explicacao"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Explicação dos Cálculos
              </button>
            </nav>
          </div>

          {/* Conteúdo das Abas */}
          <div className="pt-4">
            {activeTab === "resultados" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded shadow">
                  <p className="text-sm text-gray-600">peso * dose</p>
                  <p className="text-xl font-bold text-indigo-600">
                    Dose para o paciente = {a.toFixed(2)} mg
                  </p>
                </div>
                <div className="bg-white p-3 rounded shadow">
                  <p className="text-sm text-gray-600">
                    diluição / dose da apresentação
                  </p>
                  <p className="text-xl font-bold text-indigo-600">
                    (b) = {b.toFixed(2)}
                  </p>
                </div>
                <div className="bg-white p-3 rounded shadow">
                  <p className="text-sm text-gray-600">
                    Dose para o paciente * b{" "}
                  </p>
                  <p className="text-xl font-bold text-indigo-600">
                    Volume total a ser administrado = {c.toFixed(2)} mL
                  </p>
                </div>
                <div className="bg-white p-3 rounded shadow">
                  <p className="text-sm text-gray-600">
                    Volume total a ser administrado / nº de vezes a administrar
                  </p>
                  <p className="text-xl font-bold text-indigo-600">
                    Volume por dose = {d.toFixed(2)} mL
                  </p>
                </div>
                <div className="bg-white p-3 rounded shadow">
                  <p className="text-sm text-gray-600">
                    {" "}
                    Dose por administração / concentração máxima
                  </p>
                  <p className="text-xl font-bold text-indigo-600">
                    Volume para chegar na concentração = {e.toFixed(2)} mL
                  </p>
                </div>
                <div className="bg-white p-3 rounded shadow">
                  <p className="text-sm text-gray-600">
                    {" "}
                    Dose por administração / concentração usual
                  </p>
                  <p className="text-xl font-bold text-indigo-600">
                    Volume para chegar na concentração = {f.toFixed(2)} mL
                  </p>
                </div>
              </div>
            ) : (
              /*ABA DE EXPLICAÇÃO */
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">
                  Como os cálculos são realizados:
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li>
                    Lembre-se, esse cálculo não funciona muito bem para DVAs.
                    Falaremos do cálculo de DVAs e medicações que correm por
                    minuto na área específica.
                  </li>
                  <li>
                    <span className="font-medium">
                      Dose para o paciente = peso * dose:
                    </span>{" "}
                    Calcula a dose total diária ou por dose, dependendo da
                    unidade selecionada. Esse é sempre o primeiro cálculo e
                    determina para nós a dose que será administrada para o
                    paciente ao todo
                  </li>
                  <li>
                    <span className="font-medium">
                      (b) = diluição / dose da apresentação:
                    </span>{" "}
                    Determina quantos mL correspondem a cada unidade (mg ou mcg)
                    do medicamento diluído. Essa etapa está sendo realizada
                    apenas para facilitar a visualização.
                  </li>
                  <li>
                    Veja que a DILUIÇÃO é escolhida de maneira arbitrária, então
                    nós que escolhemos. Há algumas medicações que já vêm
                    diluídas, como é o caso do metronidazol, mas para as
                    medicações que não são, nós podemos escolher em quanto vamos
                    diluir.{" "}
                  </li>
                  <li>
                    A fórmula da Pri consiste no seguinte cálculo até então:{" "}
                    <strong>
                      (Peso * dose * diluição) / dose da apresentação{" "}
                    </strong>
                  </li>
                  <li>
                    <span className="font-medium">
                      {" "}
                      Volume total a ser administrado = Dose para o paciente *
                      b:
                    </span>{" "}
                    Calcula o volume total de droga a ser aspirado e
                    administrado para a dose calculada na primeira etapa (usando
                    a proporção encontrada em (b)).
                  </li>
                  <li>
                    Sempre fique atento neste valor, porque se estivermos
                    calculando uma dose em mg/kg/DIA, então esse volume que
                    obtemos, não será o valor a ser aspirado por dose, e sim o
                    valor total do dia.
                  </li>
                  <li>
                    <span className="font-medium">
                      Volume por dose = Volume total / nº de vezes a
                      administrar:
                    </span>{" "}
                    Divide o volume total pelo número de administrações para
                    obter o volume por dose. Aqui chegamos ao valor correto caso
                    a medicação seja calculada em dose por dia. Essa etapa não
                    precisa existir caso a medicação seja administrada de 24/24h
                    ou a dose utilizada para cálculo esteja no modelo mg/kg/DOSE
                    ou mcg/kg/DOSE.
                  </li>
                  <li>
                    A partir daqui estamos falando de cálculo de concentração,
                    então a única parte do cálculo que vamos levar adiante são
                    os seguintes:
                  </li>
                  <li>peso * dose</li>
                  <li>(peso * dose) / nº de vezes = DOSE POR ADMINISTRAÇÃO</li>
                  <li>
                    {" "}
                    O resultado obtido será o volume para o qual devemos diluir
                    o volume aspirado da droga para alcançarmos a concentração
                    desejada (calma que vai ficar mais fácil).
                  </li>
                  <li>
                    Concentração máxima é o maior valor que toleramos da
                    administração da droga no acesso utilizado para minimizar
                    efeitos adversos ou lesões no vaso. Concentração usual é um
                    valor de concentração que costumamos utilizar. O valor da
                    concentração não pode ser maior que a máxima, mas pode
                    variar em qualquer valor abaixo da máxima.
                  </li>
                  <li>
                    {" "}
                    Nós determinamos qual concentração vamos utilizar conforme o
                    paciente pode precisar de restrição hídrica ou não, ou
                    conforme queremos diminuir o volume fornecido. Também é algo
                    que escolhemos de maneira arbitrária.
                  </li>
                  <li>
                    <span className="font-medium">
                      Volume para chegar na concentração = DOSE POR
                      ADMINISTRAÇÃO / concentração mínima:
                    </span>{" "}
                    Calcula o volume mínimo necessário para a dose, usando a
                    concentração mais forte (mg/mL ou mcg/mL). O resultado
                    obtido é em volume de soro para REDILUIÇÃO.
                  </li>
                  <li>
                    <span className="font-medium">
                      Volume para chegar na concentração = DOSE POR
                      ADMINISTRAÇÃO / concentração usual:
                    </span>{" "}
                    Calcula o volume usual necessário para a dose, usando a
                    concentração padrão (mg/mL ou mcg/mL). O resultado obtido é
                    em volume de soro para REDILUIÇÃO.
                  </li>
                  <li className="mt-4 italic">
                    Observação para lembrar: Todas as unidades são convertidas
                    para mg antes dos cálculos para garantir consistência. 1 mg
                    = 1000 mcg.
                  </li>
                  <li>
                    Temos que garantir que a unidade esteja consistente em todos
                    os valores utilizados.
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
