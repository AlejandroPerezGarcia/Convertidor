const apiURL = "https://mindicador.cl/api/";
const tipoMoneda = document.querySelector("select");
const valorMoneda = document.querySelector("#valor-moneda");
const valorIngresdo = document.querySelector("input");
const button = document.querySelector("#btn");

// lee la Api
const getMoneda = async () => {
  const response = await fetch(`${apiURL}`);
  return await response.json();
};

// get para grafico 
const getGrafico = async () => {
  const url = apiURL + tipoMoneda.value 
  const data = await fetch(`${url}`);
  const prueba = await data.json()
  console.log('desde grafico =>', prueba)
}


// pintar listado de monedas

const renderMoneda = async (moneda) => {

  //imprime los datos
  const datoMoneda = () => {
    let template = "";
    const resul = valorIngresdo.value / moneda[tipoMoneda.value].valor;
    template += `<h5>$ ${resul} </h5>`;
    valorMoneda.innerHTML = template;    
  };



  //boton buscar
  button.addEventListener("click", () => {
    if (tipoMoneda.value === "dolar") {
      datoMoneda();
      getGrafico();
    } else if (tipoMoneda.value === "uf") {
      datoMoneda();
      getGrafico();
    } else if (tipoMoneda.value === "utm") {
      datoMoneda();
      getGrafico();
    } else if (tipoMoneda.value === "bitcoin") {
      datoMoneda();
      getGrafico();
    } else if (tipoMoneda.value === "euro") {
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

