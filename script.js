//barra y boton de busqueda del hero
const searchinput = document.getElementById("searchbarinput"); //input del hero
const searchbutton = document.getElementById("searchbutton"); //botón de búsqueda del hero

const searchMoviesOrSeries = async () => {
    const query = searchinput.value.toLowerCase().trim();
    if(query === ""){
        alert("Por favor, ingresa un término de búsqueda.");
        return;
    }
    if(query){
        try{
            const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
            console.log(response.data);
        }catch(error){
            console.error("No se encontró ninguna serie o película con ese nombre.", error);
        }
    }
        
}

document.getElementById("searchbutton").addEventListener("click", searchMoviesOrSeries);
document.getElementById("searchbarinput").addEventListener("keypress", function (e) {
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
    const cardUrl =document.createElement("a");
    cardUrl.textContent = "Ver más"; 
    cardUrl.href = series.url; 
    cardUrl.target = "blank"; 
     
    
    card.appendChild(cardImage);
    card.appendChild(cardTitle);
    card.appendChild(cardUrl);
   
    
    
    seriesContainer.appendChild(card);

}

const loadSeries = async () => {
    const response = await axios.get("https://api.tvmaze.com/shows");
    const series = response.data;
    console.log(series);
    series.forEach(serie => {
        crearCard(serie); //crear una card por cada serie
    });
    //mandar a llamar crearCard con el array de series
}

document.addEventListener("DOMContentLoaded", loadSeries);