import { sortData } from './data.js';
import data from './data/athletes/athletes.js';

/* Mostrar la data en las tablas*/
const tableContent = document.querySelector('.table-content');
const dataAthletes = data.athletes;// array de objetos de atletas

/* función que mueestra un fragmento con la creación de filas y columnas con la data*/
const fragment = new DocumentFragment();

function createRowsInTable(team,noc,gender,name, sport){
        const newRow = document.createElement('tr')    
        /*columna 1*/
        const newColumn1 = document.createElement("td");
        const imgColumn1 = document.createElement("img");
        const imgAttribute = document.createAttribute("src")
            imgAttribute.value = `./img-paises/${team}.png` //bandera de país
        imgColumn1.setAttributeNode(imgAttribute);
        const spanColumn1 = document.createElement('span');
            spanColumn1.textContent = noc; // equipo del atleta
        newColumn1.appendChild(imgColumn1);
        newColumn1.appendChild(spanColumn1);
        newRow.appendChild(newColumn1);
        /*columna 2*/
        const newColumn2 = document.createElement('td');
        newColumn2.classList.add('column-2');
        const divColumn2 = document.createElement('div');
        const spanDivColumn2 = document.createElement('span');
            spanDivColumn2.textContent = gender; // género del atleta
            spanDivColumn2.classList.add('avatar');
        divColumn2.appendChild(spanDivColumn2);
        const spanColumn2 = document.createElement('span');
            spanColumn2.textContent = name; // nombre del atleta
            spanColumn2.classList.add('name-text');
        newColumn2.appendChild(divColumn2);
        newColumn2.appendChild(spanColumn2);
        newRow.appendChild(newColumn2);
        /*columna 3*/
        const newColumn3 = document.createElement('td');
        const spanColumn3 = document.createElement('span');
            spanColumn3.textContent = sport; // deporte del atleta
            spanColumn3.classList.add('sport-text');
        newColumn3.appendChild(spanColumn3);
        newRow.appendChild(newColumn3);
        /*columna 4*/
        const newColumn4 = document.createElement('td');
        const divColumn4 = document.createElement('div');
        divColumn4.classList.add('medal-circle');
        divColumn4.classList.add('gold');
        const spanDivColumn4 = document.createElement('span');
            spanDivColumn4.textContent = 0; // agregar función contadora de medallas de oro por atletas
        divColumn4.appendChild(spanDivColumn4);
        newColumn4.appendChild(divColumn4);
        newRow.appendChild(newColumn4);
        /*columna 5*/
        const newColumn5 = document.createElement('td');
        const divColumn5 = document.createElement('div');
        divColumn5.classList.add('medal-circle');
        divColumn5.classList.add('silver');
        const spanDivColumn5 = document.createElement('span');
            spanDivColumn5.textContent = 0; // agregar función contadora de medallas de oro por atletas
        divColumn5.appendChild(spanDivColumn5);
        newColumn5.appendChild(divColumn5);
        newRow.appendChild(newColumn5);
        /*columna 6*/
        const newColumn6 = document.createElement('td');
        const divColumn6 = document.createElement('div');
        divColumn6.classList.add('medal-circle')
        divColumn6.classList.add('bronze');
        const spanDivColumn6 = document.createElement('span');
            spanDivColumn6.textContent = 0; // agregar función contadora de medallas de oro por atletas
        divColumn6.appendChild(spanDivColumn6);
        newColumn6.appendChild(divColumn6);
        newRow.appendChild(newColumn6);  
        fragment.appendChild(newRow);
        tableContent.appendChild(fragment);   
}
let i=0;
let n=20;
dataAthletes.slice(i,n).forEach(item=>{
    createRowsInTable(item.team,item.noc,item.gender,item.name,item.sport);
});
/*Botton '+' para mostrar la data en tabla para abajo*/
const plusButton = document.querySelector('.plus-icon');
i=i+n;
n=n+n;
function dataPart() {
    dataAthletes.slice(i,n).forEach(item=>{
    createRowsInTable(item.team,item.noc,item.gender,item.name,item.sport);
    });
    i=i+20; 
    n=n+20; 
}
plusButton.addEventListener('click',dataPart);

function showSort(){
    const imgColumn1=document.querySelectorAll('.table-content img');
    const nameColumn2 =document.querySelectorAll('.name-text');
    const avatarColumn2 = document.querySelectorAll('.avatar');
    const sportColumn3 = document.querySelectorAll('.sport-text');
    const sortDataArray = sortData(dataAthletes);
    console.log(sortDataArray);
    sortDataArray.forEach((item,index)=>{
        imgColumn1[index].src = `./img-paises/${item.team}.png`
        nameColumn2[index].textContent = item.name;
        avatarColumn2[index].textContent = item.gender;
        sportColumn3[index].textContent = item.sport;
    }) 
}
const sortIcons = document.querySelectorAll('.sort-icons');
sortIcons[1].addEventListener('click',showSort);

/*tenDataAthletes.forEach(item=>{
    tableContent.innerHTML+=`
        <tr>
            <td class="column-1"><img src="" alt="flag"><span class="noc-text">${item.noc}</span></td>
            <td class="column-2"><div class="avatar-circle"><span class="avatar"></span></div><span class="name-text">${item.name}</span></td>
            <td class="column-3"><span class="sport-text"></span></td>
            <td class="column-4"> <div class="medal-circle"><span class="medal-quantity"></span></div></td>
            <td class="column-5"> <div class="medal-circle"><span class="medal-quantity"></span></div></td>
            <td class="column-6"> <div class="medal-circle"><span class="medal-quantity"></span></div></td>
        </tr>`
});*/

//Filtro
/*const select= document.querySelectorAll('.select');
const options =document.querySelectorAll('.options');
const contentSelect = document.querySelectorAll('.select .content-select');
const hiddenInput = document.querySelectorAll('.user-selection');
//función que captura la opción seleccionada y la muestra en el select, guardar el valor en una variable;
const captureInputFilter = i => {
    document.querySelectorAll('.options > .option').forEach((option)=>{
        option.addEventListener('click', (e)=>{
            e.preventDefault();
            contentSelect[i].innerHTML=e.currentTarget.querySelector('.data').innerText;
            //console.log(e.currentTarget.innerHTML);
            select[i].classList.toggle('active');
            options[i].classList.toggle('active');
            hiddenInput.value = e.currentTarget.querySelector('.data').innerText;
        });
        
    });
    select[i].addEventListener('click', ()=>{
        select[i].classList.toggle('active');
        options[i].classList.toggle('active');
    });
};
captureInputFilter(0)*/


//console.log(example, data);
