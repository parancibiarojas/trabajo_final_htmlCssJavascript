console.clear(); // limpiamos la consola

const inViewPort = ([e]) => {
    console.log(e);
    const { isIntersecting, target } = e;

    if (isIntersecting) {
        console.log("la ultima imagen esta en pantalla");
        console.log("urlApi antes de nucleo"+urlApi);
        Nucleo();
        observer.unobserve(target);
    }
};

const observer = new IntersectionObserver(inViewPort);

const getObserver = (node) => {
    observer.observe(node);
};

// Paso 0: Inicialización de Constantes
const root = document.getElementById('root');

const busquedas = document.getElementById('muestraBusquedas');

const localArray = [];

const url_trending = 'https://api.giphy.com/v1/gifs/trending';

const url_search = 'https://api.giphy.com/v1/gifs/search';

const key = '?api_key=80bfcbf357864cd18518c324f47a7098';

const string_buscado = '&q=';

const limite = '&limit=10';

const ver_imagenes = '&offset=';

let cant_imagenes = 0;

let urlApi = "";

urlApi = url_trending + key + limite + ver_imagenes + cant_imagenes;

// console.log('Contenido de urlApi1: '+urlApi);

document.getElementById("btn").addEventListener("click", function(){

    document.getElementById("root").innerHTML = "";
    q = document.getElementById("string_search").value;
    urlApi = url_search + key + limite + string_buscado + q + ver_imagenes + cant_imagenes;

    console.log(q);
    console.log(key);
    console.log('Contenido de urlApi2: '+urlApi);

    Nucleo();

    guardar_localstorage();

});

function guardar_localstorage(){

    if(localArray.length < 3){
        
        if (localArray.indexOf(q) < 0){;

            localArray.push(q);
            localStorage.setItem("ultimasBusquedas", JSON.stringify(localArray));

        }
        
    }else{
        
        if (localArray.indexOf(q) < 0){;

            localArray.shift();
            localArray.push(q);
            localStorage.setItem("ultimasBusquedas", JSON.stringify(localArray));

        }

    }

   // Recupera la variable "ultimasBusquedas" del localStorage en formato leible x el Html
   let arrayRecojido = JSON.parse(localStorage.getItem("ultimasBusquedas"));

   // limpia el DIV "muestraBusquedas"
   document.getElementById("muestraBusquedas").innerHTML = "";

   // Rellena el DIV  "muestraBusquedas"
   arrayRecojido.forEach(element => {
       let elements = document.getElementById("muestraBusquedas");
       elements.style.color = "red";

       let div = document.createElement("div");
       div.innerHTML = element;
       elements.appendChild(div);
       
   });   

}

function mostrar_localstorage(){

    busquedas.innerText = localStorage.getItem('ultimasBusquedas');

}


const creacionImagen = (element) => {
    const img = document.createElement("img");
    img.src = element.images.original.url;
    img.alt = element.title;
    return img;
}


const getData = async () => {

    const respuesta = await fetch(`${urlApi}`);
    const { data } = await respuesta.json();

    cant_imagenes += 10;
    console.log('Variable cant_imagenes_NUCLEO2:'+cant_imagenes);
  
    return data;
};

const Nucleo = async () => {
 
    const data = await getData();
    const lastimg = data.pop();
    const lastImgtemplate = creacionImagen(lastimg);
    console.log('Valores :'+ lastimg, data.lenght);
    getObserver(lastImgtemplate);
    const templates = data.map((img) => creacionImagen(img));

    root.append(...templates);
    root.append(lastImgtemplate);

};

window.addEventListener("load", Nucleo);

// Nucleo();


