const apiURL = "https://mindicador.cl/api/";
const tipoMoneda = document.querySelector("select");
const valorMoneda = document.querySelector("#valor-moneda");
const valorIngresdo = document.querySelector("input");
const button = document.querySelector("#btn");
const ctx = document.getElementById("myChart");
let myChart;

// get api principal
const getMoneda = async () => {
  const response = await fetch(`${apiURL}`);
  return await response.json();
};

// get para grafico
const getGrafico = async () => {
  const url = apiURL + tipoMoneda.value;
  const res = await fetch(`${url}`);
  const valorGrafico = await res.json();
  const data = valorGrafico.serie.map((item) => item.valor);
  const labels = valorGrafico.serie.map((item) => formatearFecha(item.fecha));

  console.log(labels);

  const datasets = [
    {
      label:
        "historial de los últimos 10 días  " + tipoMoneda.value.toUpperCase(),
      borderColor: "rgb(255, 99, 132)",
      data,
    },
  ];
  return { labels, datasets };
};
//Formatea fecha
const formatearFecha = (fecha) => {
  console.log(fecha);
  const date = new Date(fecha);
  return `${date.getDate()}/${date.getMonth()+1}`;
};

const renderChart = async () => {
  const data = await getGrafico();
  ctx.style.backgroundColor = "white";
  const config = {
    type: "line",
    data: data,
  };
  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, config);
};

// pintar listado de monedas

const renderMoneda = async (moneda) => {
  const datoMoneda = () => {
    renderChart();
    let template = "";
    const resul = valorIngresdo.value / moneda[tipoMoneda.value].valor;
    template += `<h5>$ ${resul} </h5>`;
    valorMoneda.innerHTML = template;
  };

  //boton buscar tipo moneda
  button.addEventListener("click", () => {
    if (tipoMoneda.value === "dolar") {
      datoMoneda();
      getGrafico();
    } else if (tipoMoneda.value === "uf" || "euro" || "utm" || "bitcoin") {
      datoMoneda();
      getGrafico();
    }
  });
};

// Funcion que se encarga de mostra en main lo que se iso agregando funciones
const main = async () => {
  try {
    const moneda = await getMoneda();
    console.log(moneda);
    renderMoneda(moneda);
  } catch (error) {
    alert("Ha occurido un error, comuniquese con soporte .......");
    console.error("[ERROR ==> app.js ==> main]");
  }
};

main();