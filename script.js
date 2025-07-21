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
    