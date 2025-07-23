//barra y boton de busqueda del hero
const searchinput = document.getElementById("searchbarinput"); //input del hero
const searchbutton = document.getElementById("searchbutton"); //botón de búsqueda del hero
const searchresults = document.getElementById("searchresults"); //contenedor de resultados de búsqueda
const closebutton = document.getElementById("closebutton");
const seccionBusqueda = document.getElementById("busqueda");
const searchMoviesOrSeries = async () => {
  const query = searchinput.value.toLowerCase().trim();
  if (query === "") {
    alert("Por favor, ingresa un término de búsqueda.");
    return;
  }
  seccionBusqueda.style.display = "flex"; //mostrar el contenedor de búsqueda
  seccionBusqueda.style.justifyContent = "center";
  if (query) {
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${query}`
      );
      const results = response.data;
      searchresults.innerHTML = ""; //limpiar resultados previos
      if (results.length > 0) {
        results.forEach((result) => {
          const series = result.show;
          const card = document.createElement("div");
          card.classList.add("seriecard");
          const cardTitle = document.createElement("h3");
          cardTitle.textContent = series.name;
          const cardImage = document.createElement("img");
          cardImage.src = series.image
            ? series.image.medium
            : "https://via.placeholder.com/210x295?text=No+Image"; //placeholder si no hay imagen
          const cardUrl = document.createElement("a");
          cardUrl.textContent = "Ver más";
          cardUrl.href = series.url;
          cardUrl.target = "_blank";

          card.appendChild(cardImage);
          card.appendChild(cardTitle);
          card.appendChild(cardUrl);

          searchresults.appendChild(card);
        });
      }
    } catch (error) {
      console.error(
        "No se encontró ninguna serie o película con ese nombre.",
        error
      );
    }
  }
};

document
  .getElementById("searchbutton")
  .addEventListener("click", searchMoviesOrSeries);
document
  .getElementById("searchbarinput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita el envío del formulario
      
      searchMoviesOrSeries();
    }
  });

//cargar series al abrir el sitio
const crearCard = (series) => {
  const seriesContainer = document.getElementById("seriescontainer");
  const card = document.createElement("div");
  card.classList.add("seriecard");
  const cardTitle = document.createElement("h3");
  cardTitle.textContent = series.name;
  const cardImage = document.createElement("img");
  cardImage.src = series.image.medium;
  const cardUrl = document.createElement("a");
  cardUrl.textContent = "Ver más";
  cardUrl.href = series.url;
  cardUrl.target = "blank";

  card.appendChild(cardImage);
  card.appendChild(cardTitle);
  card.appendChild(cardUrl);

  seriesContainer.appendChild(card);
};

const loadSeries = async () => {
  const response = await axios.get("https://api.tvmaze.com/shows");
  const series = response.data;
  console.log(series);
  series.forEach((serie) => {
    crearCard(serie); //crear una card por cada serie
  });
  //mandar a llamar crearCard con el array de series
};

document.addEventListener("DOMContentLoaded", loadSeries);

//evento para cerrar el contenedor de resultados

closebutton.addEventListener("click", () => {
  seccionBusqueda.style.display = "none"; //ocultar el contenedor de búsqueda
});
