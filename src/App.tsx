import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const App = (props) => {
  const [agend, setAgend] = useState(props);
  const [diferenca, setDiferenca] = useState(props);
  const [agendSecret, setAgendSecret] = useState(props);
  const [agendSaida, setAgendSaida] = useState(props);
  const [agendSaidaSecret, setAgendSaidaSecret] = useState(props);
  localStorage.setItem("agend", JSON.stringify(agend));

  useEffect(() => {
    setAgend(props);
    setDiferenca(props);
    setAgendSaida(props);
    setAgendSecret(props);
    setAgendSaidaSecret(props);
  }, [props]);

  var currentdate = new Date();

  var horario = {
    hora: currentdate.getHours(),
    minuto: currentdate.getMinutes(),
    segundos: currentdate.getSeconds(),
    dia: currentdate.getDate(),
    mes: currentdate.getMonth() + 1,
    ano: currentdate.getFullYear(),
  };
  var agendJSON = JSON.parse(localStorage.getItem("agend"));
  let calculo: number;
  if (diferenca <= 1) {
    calculo = 5;
  } else {
    calculo = Math.round(diferenca) * 2 + 5;
  }

  return (
    <>
      <h1 className="text-violet-500 m-auto text-center">
        <strong>Calculadora de valores do Estacionamento</strong>
      </h1>
      <div className="bg-zinc-300 shadow-md rounded px-8 pt-6 pb-8 m-auto w-full max-w-xs">
        <button
          className="bg-transparent hover:bg-violet-500 text-violet-700 font-semibold hover:text-white py-2 px-4 border border-violet-500 hover:border-transparent rounded"
          onClick={(e) =>
            setAgend(`${horario.hora}:${horario.minuto}`) &
            Swal.fire(
              "Horário de Entrada",
              `Entrada registrada às ${horario.hora}:${horario.minuto}`
            ) &
            setAgendSecret(new Date())
          }
        >
          Dar entrada
        </button>
        <button
          className="bg-transparent hover:bg-violet-500 text-violet-700 font-semibold hover:text-white py-2 px-4 border border-violet-500 hover:border-transparent rounded"
          onClick={() =>
            setAgendSaida(`${horario.hora}:${horario.minuto}`) &
            Swal.fire(
              "Horário de Saída",
              `Saída registrada às ${horario.hora}:${horario.minuto}`
            ) &
            setAgendSaidaSecret(new Date())
          }
        >
          Dar saída
        </button>
        <button
          className="bg-transparent hover:bg-violet-500 text-violet-700 font-semibold hover:text-white py-2 px-4 border border-violet-500 hover:border-transparent rounded"
          onClick={() =>
            Swal.fire(
              "Calculando valores com base no horário de entrada e saída",
              `Entrada às ${agend} e Saída às ${agendSaida}`
            ) &
            setDiferenca(
              (agendSaidaSecret.getTime() - agendSecret.getTime()) / 1000 / 60
            )
          }
        >
          Calcular Diferença
        </button>
        <button
          className="bg-transparent hover:bg-violet-500 text-violet-700 font-semibold hover:text-white py-2 px-4 border border-violet-500 hover:border-transparent rounded"
          onClick={() => Swal.fire("Horário de Agendamento", agendJSON)}
        >
          Mostrar horário de entrada
        </button>
        <button
          className="bg-transparent hover:bg-violet-500 text-violet-700 font-semibold hover:text-white py-2 px-4 border border-violet-500 hover:border-transparent rounded"
          onClick={() => Swal.fire("Horário de Agendamento", agendJSON)}
        >
          Mostrar horário de saída
        </button>

        <button
          className="bg-transparent hover:bg-violet-500 text-violet-700 font-semibold hover:text-white py-2 px-4 border border-violet-500 hover:border-transparent rounded"
          onClick={() =>
            Swal.fire("Valor a ser cobrado", "R$ " + calculo + ",00")
          }
        >
          Calcular valor
        </button>

      </div>
      <div className=" text-center p-5 bg-zinc-300 shadow-md rounded px-8 pt-6 pb-8 m-auto w-full max-w-xs mt-5">
        <p>Valores:</p>
        <p>R$ 5,00 a primeira hora</p>
        <p>R$ 2,00 cada hora extra</p>
        {horario.dia}/{horario.mes}/{horario.ano} {horario.hora}:
        {horario.minuto}:{horario.segundos}
      </div>
    </>
  );
};

export default App;
