import data from './data/athletes/athletes.js';
import { filterByValueTwo, filterOnlyOneName, sortByMedal, sortDataTwo } from './data.js';
//SPORT.HTML
let remplaza = /\+/gi; //expresion regular
let url = window.location.href; //Captura la URL de la ventana actual
url = decodeURI(url); //decodificia la url
url = url.replace(remplaza, " "); //remplaza epsacion en blanco por +
url = url.toUpperCase(); // pasa a mayusculas el texto
// url = "HTTP://127.0.0.1:5500/SRC/SPORTS.HTML?DATA=ARCHERY"
// url = "HTTP://127.0.0.1:5500/SRC/SPORTS.HTML?1"
// console.log(url);

const sportName = function obtener_valor(variable) { //Funcion que obtiene el valor de la variable en la url    
    // variable -="data" 
    let variable_may = variable.toUpperCase(); // variable_may = "Data" 
    let variable_pos = url.indexOf(variable_may); //  variable_pos = 38
    // console.log(variable_pos);
    if (variable_pos != -1) {
        var pos_separador = url.indexOf("?", variable_may);
        if (pos_separador != -1) {
            // console.log(url.substring(variable_pos + variable_may.length + 1,  pos_separador));
            return url.substring(variable_pos + variable_may.length + 1);
        } else {
            // console.log(url.substring(variable_pos + variable_may.length + 1, url.lenght))
            return url.substring(variable_pos + variable_may.length + 1);
        }
    } else {
        return "NO_ENCONTRADO";
    }
}('data');

let title = document.getElementById('title')
title.textContent = sportName;
//Mostrar los eventos y sus atletas
const dataAthletes = data.athletes;
const dataEvents = filterOnlyOneName(dataAthletes, 'event'); //306 eventos

// [{sport:"",..."},{},{},...]
const onlyEventsBySport = filterByValueTwo(dataEvents, 'sport', sportName);

let contentDiv = document.getElementById('container-events');


function showDataEvents(dataEventsBySport) {
    contentDiv.innerHTML = ``;
    sortByMedal(dataAthletes);
    let plantillaHTML = "";
        for (let key in dataEventsBySport) {
            const item = dataEventsBySport[key]; 
                plantillaHTML += `
                    <div class="acordeon">
                        <div class="bloque">
                            <h2 class="h2">${item.event} <i class="down-icon fas fa-sort-down"></i></h2>
                            <div class="contenido">
                                <section class="cards">
                `;
                    for (let key in dataAthletes) {
                        if( dataAthletes[key].event===item.event){
                            dataAthletes[key];
                            plantillaHTML += `
                                <div class="card-athlete">
                                    <div class="medals">
                                        <div class="medal">
                                            <div class="medal-circle-${dataAthletes[key].medal.toLowerCase()}">
                                            </div>
                                            <span class="medal-letter">${dataAthletes[key].medal}</span>
                                        </div>
                                    </div>
                                    <div class="img-box">
                                        <img class="img-card" src="./img-paises/${dataAthletes[key].team}.png">
                                    </div>
                                    <p class="name-athlete-card">${dataAthletes[key].name}</p>
                                    <tr class="line-card"></tr>
                                    <div class="team-athlete-card">
                                        <img src="./img-paises/${dataAthletes[key].team}.png" alt="flag">
                                        <span class="team-name">${dataAthletes[key].noc}</span>
                                    </div>
                                </div>
                            `;
                        }
                    }
                plantillaHTML += `
                                </section>
                            </div>
                        </div>
                    </div>
                `;
        }
    contentDiv.innerHTML = plantillaHTML; //agregar plantilla html con innerhtml
    // Se muestra y se quita la data debajo de cada evento cuando se hace click en en el titulo;
    const bloques = document.querySelectorAll('.bloque');
    bloques.forEach( bloque =>{
        const childs = bloque.childNodes;
        const h2 = childs[1];
        h2.addEventListener('click', () =>{
            bloque.classList.toggle('activo');
        })
    })
}
showDataEvents(onlyEventsBySport);

//filtrado-----------------------
const select1 = document.querySelector('#sportFilter .select');
const options1 = document.querySelector('#sportFilter .options');
const contentSelect1 = document.querySelector('#sportFilter .content-select');
const hiddenInput1 = document.querySelector('#sportFilter .user-selection');

(function createOptionsSportFilterAndShowDataEvents() { 
    sortDataTwo(dataAthletes,'sport');
    const arrayOptions = filterOnlyOneName(dataAthletes,'sport').map(item=>item.sport);
    const fragment = new DocumentFragment();
    for(let i = 0; i<arrayOptions.length ; i++) {
        const aTag = document.createElement('a');
        const hAtt = document.createAttribute('href');
        hAtt.value = '#';
        aTag.setAttributeNode(hAtt);
        const classAtt = document.createAttribute('class')
        classAtt.value = 'option';
        aTag.setAttributeNode(classAtt);
        aTag.innerHTML= `<div class="content-option">
                            <p class="data">${arrayOptions[i]}</p>
                        </div>`
    fragment.appendChild(aTag);
    }
    options1.appendChild(fragment);
    select1.addEventListener('click', () => {
        // contentSelect2.innerText = `Equipo`;
        // contentSelect3.innerText = `Deporte`;
        select1.classList.toggle('active');
        options1.classList.toggle('active');
    });
    options1.querySelectorAll('.option').forEach( option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                contentSelect1.innerHTML = e.currentTarget.querySelector('.data').innerText;
                select1.classList.toggle('active');
                options1.classList.toggle('active');
                hiddenInput1.value = e.currentTarget.querySelector('.data').innerText;
                const onlyEventsBySport = filterByValueTwo(dataEvents, 'sport', hiddenInput1.value.toUpperCase());

                showDataEvents(onlyEventsBySport);
                title.textContent = hiddenInput1.value.toUpperCase()
            });
    });     
}());


// const bloque = document.querySelectorAll('.bloque');
// const h2 = document.querySelectorAll('.h2');

// cuando haga click en h2
// quitar la clase activo de todos los bloques
// vamos a añadir la clase activo al bloque con la posición del h2

// Recorrer todos los h2
// h2.forEach((cadaH2, i) => {
//     //asignando un click a cada h2
//     h2[i].addEventListener('click', () => {
//         //Recorrer todos los bloques
//         bloque.forEach((cadaBloque, i) => {

//             //Quitamos la clase activo de todos los bloques
//             bloque[i].classList.remove('activo')
//         })
//         //Añadiendo la clase activo al bloque cuya posicion sea igual al del h2 (Linea 188)
//         bloque[i].classList.add('activo')
//     })
// })


