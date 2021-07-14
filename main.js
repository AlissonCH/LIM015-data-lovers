import { sortData, rankingOnlyMedals, rankingTotalMedals, rankingTotalAthletes, arrRankingCardAthlete, arrayDataCountry, filterOnlyOneName, filterByValue, sortDataTwo, searchTable, average, athletesByGender, percentage, sortDataTwoByNumber, rankingOnlyMedalsTwo} from './data.js';
import data from './data/athletes/athletes.js';
//---------------ATLETAS-----------------------------------------------------------------------------
const dataAthletes = data.athletes;
function groupBy(key){
    return function group(data){
        return data.reduce((acc,item)=>{
            const property = item[key]; 
            acc[property] = acc[property] || [];
            acc[property].push(item);
            return acc;
        }, {});
    };
}
const groupByName = groupBy('name');
const dataGroupByName = groupByName(dataAthletes);

//Se agrega un objeto con cantidad de medallas dentro de cada array agrupado por nombre
for (let key in dataGroupByName){
    const medalArray = dataGroupByName[key].map(element=>element.medal);
    const goldQuantity = medalArray.filter(element=>element==='Gold').length;
    const silverQuantity = medalArray.filter(element=>element==='Silver').length;
    const bronzeQuantity = medalArray.filter(element=>element==='Bronze').length;
    dataGroupByName[key].push({Gold:goldQuantity, Silver:silverQuantity, Bronze:bronzeQuantity });
}
function showTableAthleteOriginal(){
    const iconUp = document.querySelector('#athleteTable .icon-up');
    const iconDown = document.querySelector('#athleteTable .icon-down');
    const nextIcon = document.querySelector('#athletes .next-icon');
    const previousIcon = document.querySelector('#athletes .previous-icon');
    const imgColumn1 = document.querySelectorAll('#athleteTable img');
    const nocTextColumn1 = document.querySelectorAll('#athleteTable .noc-text');
    const avatarColumn2 = document.querySelectorAll('#athleteTable .avatar');
    const nameColumn2 = document.querySelectorAll('#athleteTable .name-text');
    const sportColumn3 = document.querySelectorAll('#athleteTable .sport-text');
    const medalQuantityGold = document.querySelectorAll('#athleteTable .medal-quantity-gold');
    const medalQuantitySilver = document.querySelectorAll('#athleteTable .medal-quantity-silver');
    const medalQuantityBronze = document.querySelectorAll('#athleteTable .medal-quantity-bronze');

    imgColumn1.forEach(img => img.createAttribute = 'src');

    const showDataTable = (array) => {
        let startIndexProperty;
        function showData(startIndexProperty){
            let i = 0;
            for (let key in dataGroupByName){
                key = array[i+startIndexProperty];
                const arrayInProperty = dataGroupByName[key]; //[{},{},{}]
                    imgColumn1[i].src = `./img-paises/${arrayInProperty[0].team}.png`;
                    nocTextColumn1[i].innerText = arrayInProperty[0].noc;
                    nameColumn2[i].innerText = arrayInProperty[0].name;
                    avatarColumn2[i].innerText = arrayInProperty[0].gender;
                    sportColumn3[i].innerText = arrayInProperty[0].sport;
                    medalQuantityGold[i].innerText = arrayInProperty[arrayInProperty.length-1]['Gold'];
                    medalQuantitySilver[i].innerText = arrayInProperty[arrayInProperty.length-1]['Silver'];
                    medalQuantityBronze[i].innerText = arrayInProperty[arrayInProperty.length-1]['Bronze'];
                i<19? i++ : false;
            }
        }
        startIndexProperty = 0;
        showData(startIndexProperty);
        nextIcon.style.display='block';
        nextIcon.addEventListener('click', () => {
            startIndexProperty += 20; 
            showData(startIndexProperty);
        });
        previousIcon.style.display='block';
        previousIcon.addEventListener('click', () => {
            startIndexProperty === 0 ? startIndexProperty = 0 : startIndexProperty -= 20;
            showData(startIndexProperty);
        });
    }
    showAndCloseDataInPopUp('name');
    let arrayNames = rankingOnlyMedals(dataGroupByName, 'Gold', 'desc');
    showDataTable(arrayNames);

    //Orden alfabético Atletas
    const sortName = order => {
        return showDataTable(sortData(arrayNames,order));
    }
    iconDown.style.display='block';
    iconUp.style.display='block';
    iconDown.addEventListener('click', () => sortName('desc'));
    iconUp.addEventListener('click', () => sortName('asc'));

    //Ranking por medalla de Oro, Plata y Bronze
    const rankingMedal = (medalType, order) =>{
        arrayNames = rankingOnlyMedals(dataGroupByName, medalType, order);
        return showDataTable(arrayNames);
    }
    document.querySelectorAll('.icons').forEach( icon =>{
        icon.style.display='block';
        icon.addEventListener('click', (e) => {
            rankingMedal(e.target.dataset.medalType, e.target.dataset.order)
        })
    })
}
showTableAthleteOriginal();

//Mostrar información Tarjetas
const topRankingAthlete = arrRankingCardAthlete.slice(0,4);
let i = 0;
document.querySelectorAll('.cards > .card-athlete').forEach((cardAthlete)=>{
    const accesInformation = topRankingAthlete[i][1];
    cardAthlete.innerHTML += `
          <span class="medalsTitle">Medallas</span>
          <div class="medals">
            <div class="medal">
              <div class="medal-circle-gold">
                <span class="medal-quantity">${accesInformation[accesInformation.length -1].Gold}</span>
              </div>
              <span class="medal-letter"></span>
            </div>
            <div class="medal">
              <div class="medal-circle-silver">
                <span class="medal-quantity">${accesInformation[accesInformation.length -1].Silver}</span>
              </div>
              <span class="medal-letter"></span>
            </div>
            <div class="medal">
              <div class="medal-circle-bronze">
                <span class="medal-quantity">${accesInformation[accesInformation.length -1].Bronze}</span>
              </div>
              <span class="medal-letter"></span>
            </div>
          </div>
          <div class="img-box"><img class="img-card"src="./img-atletas/${accesInformation[0].name !=='Kathleen Genevieve "Katie" Ledecky'? accesInformation[0].name :'KathleenGenevieve'}.jpg"></div>
         
          <p class="name-athlete-card">${accesInformation[0].name}</p>
          <p class="sport-athlete-card">${accesInformation[0].sport}</p>
          <div class="team-athlete-card">
            <img src= "./img-paises/${accesInformation[0].team}.png" alt="flag">
            <span class="team-name">${accesInformation[0].noc}</span>
          </div>`
    i<4? i++: false;
})

//--------------------PAISES------------------------------------------------------------------------------
//Se agrega un objeto con cantidad de medallas dentro de cada array agrupado por noc
const groupByNoc = groupBy('noc');
const dataGroupByNoc = groupByNoc(dataAthletes);
const iconUp = document.querySelectorAll('#countryTable .icon-up');
const iconDown = document.querySelectorAll('#countryTable .icon-down');

for (let key in dataGroupByNoc){
    const medalArray = dataGroupByNoc[key].map(element=>element.medal);
    const goldQuantity = medalArray.filter(element=>element==='Gold').length;
    const silverQuantity = medalArray.filter(element=>element==='Silver').length;
    const bronzeQuantity = medalArray.filter(element=>element==='Bronze').length;
    dataGroupByNoc[key].push({Gold:goldQuantity, Silver:silverQuantity, Bronze:bronzeQuantity });
}
function totalAthletes(array) {
    const onlyNames = array.map(element=>element.name).filter((element,index,arr)=>arr.indexOf(element)===index);
    return  onlyNames.length-1;
}
function showTableCountryOriginal (){
    const nextIcon = document.querySelector('#country .next-icon');
    const previousIcon = document.querySelector('#country .previous-icon');
    const imgCountryTable = document.querySelectorAll('#countryTable img');
    const nocTextCountry = document.querySelectorAll('#countryTable .noc-text');
    const numberAthletes = document.querySelectorAll('#countryTable .number-athletes')
    const medalQuantityGoldCountry = document.querySelectorAll('#countryTable .medal-quantity-gold');
    const medalQuantitySilverCountry = document.querySelectorAll('#countryTable .medal-quantity-silver');
    const medalQuantityBronzeCountry = document.querySelectorAll('#countryTable .medal-quantity-bronze');
    const totalMedals = document.querySelectorAll('.total-medals');

    imgCountryTable.forEach(img => img.createAttribute = 'src');
    function showDataTableCountry (array) {
        let startIndexProperty;
        function showData(startIndexProperty){
            let i = 0;
            for (let key in dataGroupByNoc){
                key = array[i+startIndexProperty];
                const arrayInProperty =  dataGroupByNoc[key]; //[{},{},{}]
                    imgCountryTable[i].src = `./img-paises/${arrayInProperty[0].team}.png`;
                    nocTextCountry[i].textContent = arrayInProperty[0].team;
                    numberAthletes[i].textContent = totalAthletes(arrayInProperty);
                    medalQuantityGoldCountry[i].textContent = arrayInProperty[arrayInProperty.length-1]['Gold'];
                    medalQuantitySilverCountry[i].textContent = arrayInProperty[arrayInProperty.length-1]['Silver'];
                    medalQuantityBronzeCountry[i].textContent = arrayInProperty[arrayInProperty.length-1]['Bronze'];
                    totalMedals[i].textContent = arrayInProperty.length-1;
                i<19? i++ : false;
            }
        }
        startIndexProperty = 0;
        showData(startIndexProperty);
        nextIcon.style.display='block';
        nextIcon.addEventListener('click', () => {
            startIndexProperty += 20; 
            showData(startIndexProperty);
        });
        previousIcon.style.display='block';
        previousIcon.addEventListener('click', () => {
            startIndexProperty === 0 ? startIndexProperty = 0 : startIndexProperty -= 20;
            showData(startIndexProperty);
        });
    }
    let arrayNocs = rankingTotalMedals( dataGroupByNoc, 'desc');
    showDataTableCountry(arrayNocs);

    //Orden Alfabético Equipo
    const sortNoc = order => {
        return showDataTableCountry(sortData(arrayNocs, order));
    }
    iconDown.forEach(icon=>icon.style.display = 'block');
    iconUp.forEach(icon=>icon.style.display = 'block');
    iconDown[0].addEventListener('click', () => sortNoc('desc'));
    iconUp[0].addEventListener('click', () => sortNoc('asc'));

    //Ranking Nº de atletas
    const showRankingTotalAthletes = (order) =>{
        arrayNocs = rankingTotalAthletes( dataGroupByNoc, order);
        return showDataTableCountry(arrayNocs);
    }
    iconDown[1].addEventListener('click', () => showRankingTotalAthletes('desc'));
    iconUp[1].addEventListener('click', () => showRankingTotalAthletes('asc'));
    //Ranking Medalla de Oro, Plata y Bronze
    const rankingMedalCountry = (typeMedal, order) =>{
        arrayNocs = rankingOnlyMedals( dataGroupByNoc, typeMedal, order);
        return showDataTableCountry(arrayNocs);
    }
    document.querySelectorAll('#countryTable .icons').forEach( icon =>{
        icon.style.display = 'block';
        icon.addEventListener('click', (e) => rankingMedalCountry(e.target.dataset.medalType, e.target.dataset.order))
    })

    //Ranking Total de medallas
    const showRankingTotalMedals = (order) => {
        arrayNocs = rankingTotalMedals( dataGroupByNoc, order);
        return showDataTableCountry(arrayNocs);
    }
    iconDown[2].addEventListener('click', () => showRankingTotalMedals('desc'));
    iconUp[2].addEventListener('click', () => showRankingTotalMedals('asc'));
}
showTableCountryOriginal();

//Mostrar información Tarjetas
const topRankingCountry = arrayDataCountry.slice(0,10);
let i2 = 0;
document.querySelectorAll('.cards > .card-country').forEach(cardCountry => {
    const accesInformation = topRankingCountry[i2][1];
    cardCountry.innerHTML += `
                        <span class="medalsTitle">Medallas</span>
                        <div class="medals">
                            <div class="medal">
                                <div class="medal-circle-gold">
                                    <span class="medal-quantity">${accesInformation[topRankingCountry[i2][1].length -1].Gold}</span>
                                </div>
                                <span class="medal-letter"></span>
                             </div>
                             <div class="medal">
                             <div class="medal-circle-silver">
                                 <span class="medal-quantity">${accesInformation[topRankingCountry[i2][1].length -1].Silver}</span>
                             </div>
                             <span class="medal-letter"></span>
                          </div>
                          <div class="medal">
                                <div class="medal-circle-bronze">
                                    <span class="medal-quantity">${accesInformation[topRankingCountry[i2][1].length -1].Bronze}</span>
                                </div>
                                <span class="medal-letter"></span>
                             </div>
                        </div>
                        <div class="img-box"><img class="img-card" src="./img-paises/${accesInformation[0].team}.png" alt="flag"></div>
                        <p class="name-country-card">${accesInformation[0].team}</p>
                        <tr class="line-card"></tr>
                        <p class="number-medals">Total medallas: ${accesInformation.length-1}</p>
                        <p class="number-athletes">Total atletas: ${totalAthletes(accesInformation)}</p>`
    i2<3? i2++ : false;
})

// Filtrado
const dataOnlyOneName = filterOnlyOneName(dataAthletes, 'name');
const onlyFemales = athletesByGender(dataOnlyOneName, 'F');
const onlyMales = athletesByGender(dataOnlyOneName,'M');
const select1 = document.querySelector('#genderFilter .select');
const options1 = document.getElementById('optionsFiterGender');
const contentSelect1 = document.querySelector('#genderFilter .content-select');
const hiddenInput1 = document.querySelector('#genderFilter .user-selection');
const tableAthlete = document.querySelector('#tableContentAthlete');

function showDataFilter (data) {
    tableAthlete.innerHTML = '' ;
    let plantilla = ``; 
    rankingOnlyMedalsTwo(data, 'Gold', 'desc');

    for(let i in data){
        const item = data[i][1];
            plantilla += `
                <tr>
                    <td class="column-1"><img src="./img-paises/${item[0].team}.png" alt="flag"><span class="noc-text">${item[0].noc}</span></td>
                    <td class="column-2"><div class="avatar-circle"><span class="avatar">${item[0].gender}</span></div><span class="name-text">${item[0].name}</span></td>
                    <td class="column-3"><span class="sport-text">${item[0].sport}</span></td>
                    <td class="column-4"><div class="medal-circle-gold"><span class="medal-quantity-gold">${item[item.length-1].Gold}</span></div></td>
                    <td class="column-5"><div class="medal-circle-silver"><span class="medal-quantity-silver">${item[item.length-1].Silver}</span></div></td>
                    <td class="column-6"><div class="medal-circle-bronze"><span class="medal-quantity-bronze">${item[item.length-1].Bronze}</span></div></td>
                </tr> `;
        }
    tableAthlete.innerHTML = plantilla;
    document.querySelector('#athletes .next-icon').style.display='none';
    document.querySelector('#athletes .previous-icon').style.display='none';
    document.querySelector('#athletes .icon-down').style.display='none';
    document.querySelector('#athletes .icon-up').style.display='none';
    document.querySelectorAll('#athleteTable .icons').forEach(icon => icon.style.display='none');
    showAndCloseDataInPopUp('name');
}
function showDataFilterCountry (data) {
    const countryTableBody =  document.getElementById('countryTableBody');
    countryTableBody.innerHTML = '' ;
    let plantilla = ``; 
    rankingOnlyMedalsTwo(data, 'Gold', 'desc');
    for(let i in data){
        const item = data[i][1];
            plantilla += `
                <tr>
                    <td><img src="./img-paises/${item[0].team}.png" alt="flag"><span class="noc-text">${item[0].team}</span></td>
                    <td><span class="number-athletes">${totalAthletes(item)}</span></td>
                    <td><div class="medal-circle-gold"><span class="medal-quantity-gold">${item[item.length-1]['Gold']}</span></div></td>
                    <td><div class="medal-circle-silver"><span class="medal-quantity-silver">${item[item.length-1]['Silver']}</span></div></td>
                    <td><div class="medal-circle-bronze"><span class="medal-quantity-bronze">${item[item.length-1]['Bronze']}</span></div></td>
                    <td><span class="total-medals">${item.length-1}</span></td>
                </tr> `;
    }
    countryTableBody.innerHTML = plantilla;
    document.querySelector('#country .next-icon').style.display='none';
    document.querySelector('#country .previous-icon').style.display='none';
    iconDown.forEach(icon => icon.style.display = 'none');
    iconUp.forEach(icon => icon.style.display = 'none');
    document.querySelectorAll('#country .icons').forEach(icon => icon.style.display='none');
}

(function showDataFilteredByGender() { 
    const arrayOptions = ['F','M'];
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
                            <p class="data">${arrayOptions[i]==='F'? 'Femenino' : 'Masculino'}</p>
                        </div>`
    fragment.appendChild(aTag);
    }
    options1.appendChild(fragment);
    select1.addEventListener('click', () => {
        contentSelect2.innerText = `Equipo`;
        contentSelect3.innerText = `Deporte`;
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
                hiddenInput1.value === 'Femenino'? hiddenInput1.value = 'F' : (hiddenInput1.value === 'Masculino'? hiddenInput1.value = 'M': false)
                const dataFilteredByValue = filterByValue(dataGroupByName, 'gender', hiddenInput1.value.toUpperCase());
                showDataFilter (dataFilteredByValue);
            });
    });     
}());

// filtrado por NOC
const select2 = document.querySelector('#nocFilter .select');
const options2 = document.getElementById('optionsNocFilter');
const contentSelect2 = document.querySelector('#nocFilter .content-select');
const hiddenInput2 = document.querySelector('#nocFilter .user-selection');
(function showDataFilteredByNoc() { 
    const arrayOptions = Object.keys( dataGroupByNoc);
    sortData(arrayOptions,'asc');
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
    options2.appendChild(fragment);
    select2.addEventListener('click', () => {
        contentSelect1.innerText = `Género`;
        contentSelect3.innerText = `Deporte`;
        select2.classList.toggle('active');
        options2.classList.toggle('active');
    });
    options2.querySelectorAll('.option').forEach( option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                contentSelect2.innerHTML = e.currentTarget.querySelector('.data').innerText;
                select2.classList.toggle('active');
                options2.classList.toggle('active');
                hiddenInput2.value = e.currentTarget.querySelector('.data').innerText;
                const dataFilteredByValue = filterByValue(dataGroupByName, 'noc', hiddenInput2.value.toUpperCase());
                showDataFilter (dataFilteredByValue);
            });
    });     
}());

// filtrado por Deporte
const select3 = document.querySelector('#sportFilter .select');
const options3 = document.getElementById('optionsSportFilter');
const contentSelect3 = document.querySelector('#sportFilter .content-select');
const hiddenInput3 = document.querySelector('#sportFilter .user-selection');
const groupBySport = groupBy('sport');
const dataSport = groupBySport(dataAthletes);

(function showDataFilteredBySport() { 
    const arrayOptions = Object.keys(dataSport);
    sortData(arrayOptions,'asc');
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
    options3.appendChild(fragment);
    select3.addEventListener('click', () => {
        contentSelect1.innerText = `Género`;
        contentSelect2.innerText = `Equipo`;
        select3.classList.toggle('active');
        options3.classList.toggle('active');
    });
    options3.querySelectorAll('.option').forEach( option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                contentSelect3.innerHTML = e.currentTarget.querySelector('.data').innerText;
                select3.classList.toggle('active');
                options3.classList.toggle('active');
                hiddenInput3.value = e.currentTarget.querySelector('.data').innerText;
                const dataFilteredByValue = filterByValue(dataGroupByName, 'sport', hiddenInput3.value.toUpperCase());
                showDataFilter (dataFilteredByValue);
                showAndCloseDataInPopUp('name');
            });
    });     
}());

//Input de filtrado
    const searchInputAthletes = document.getElementById('searchInput');
    searchInputAthletes.addEventListener('keyup',(e) => {
        const value = e.currentTarget.value;
        const filterData = searchTable(value, dataGroupByName);
        return showDataFilter(filterData);
    });
    const searchInputCountry = document.getElementById('searchInputCountry');
    searchInputCountry.addEventListener('keyup',(e) => {
        const value = e.currentTarget.value;
        const filterData = searchTable(value,  dataGroupByNoc);
        return showDataFilterCountry(filterData);
    });

//ESTADISTICAS - CANVAS
// const sortHeight = sortDataTwoByNumber(filterOnlyOneName(dataAthletes, 'name'),'height');
const sortWeight = sortDataTwoByNumber(filterOnlyOneName(dataAthletes, 'name'),'weight');
// const sortAge = sortDataTwoByNumber(filterOnlyOneName(dataAthletes, 'name'),'age');
const arrayMedals = topRankingCountry.map(item=>item[1][item[1].length-1]);

//Gráficas de Barras Top Country
const countryLabels = topRankingCountry.map(item=>item[1][0].team);
const arrayTotalMedalsByTopCountrys = arrayMedals.map(item=>item.Gold +item.Silver +item.Bronze);
const arrayGoldMedalQuantity = topRankingCountry.map(item=>item[1][item[1].length-1].Gold);
const arraySilverMedalQuantity = topRankingCountry.map(item=>item[1][item[1].length-1].Silver);
const arrayBronzeMedalQuantity = topRankingCountry.map(item=>item[1][item[1].length-1].Bronze);
let ctx = document.getElementById('topCountry').getContext('2d');
let myChartBar = new Chart (ctx, {
    type: 'bar',
    data: {
        labels: countryLabels,
        datasets: [
        {
            label: 'Total medallas',
            data: arrayTotalMedalsByTopCountrys,
            backgroundColor: [
                'rgba(153, 102, 255, 1)',    
            ],
            borderColor: [
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 2,
            type: 'line',
            order: 0
        },
        {
            label: 'Oro',
            data: arrayGoldMedalQuantity,
            backgroundColor: [
                'rgba(255, 206, 86, 0.5)'
            ],
            borderColor: [
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1,
            order: 1
        },
        {
            label: 'Plata',
            data: arraySilverMedalQuantity,
            backgroundColor: [
                'rgba(54, 162, 235, 0.5)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1,
            order: 1
        },
        {
            label: 'Bronce',
            data: arrayBronzeMedalQuantity,
            backgroundColor: [
                'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            order: 1
        }
    ]
    },
    options: {
        indexAxis: 'y',
        elements: {
            bar: {
              borderWidth: 2,
            }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },    
          title: {
            display: true,
            text: 'Top 10 Países con más medallas en todo los Juegos de Río de Janeiro'
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
});

//Gráfica Dona % por género
const percentageFemales = percentage(onlyFemales.length, dataOnlyOneName.length);
const percentageMales = percentage(onlyMales.length, dataOnlyOneName.length);
let ctxDoughnut = document.getElementById('doughnut').getContext('2d');
let myChartDoughnut = new Chart (ctxDoughnut, {
    type: 'doughnut',
    data: {
        labels: ['% Atletas Mujeres', ' % Atletas Varones'],
        datasets: [{
            label: 'Atletas',
            data: [percentageFemales, percentageMales],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }
        ]
    },
    options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Número de atletas participantes por género'
          }
        }
    }
});
// Radar de Promedios Altura, Peso y Edad
const averageAge = average(dataOnlyOneName, 'age', 0);
const averageAgeFemales = average(onlyFemales,'age', 0);
const averageAgeMales = average(onlyMales,'age', 0);
const averageHeight = average(dataOnlyOneName, 'height', 2);
const averageHeightFemales = average(onlyFemales,'height', 0);
const averageHeightMales = average(onlyMales,'height', 0);
const averageWeight = average(dataOnlyOneName, 'weight', 2);
const averageWeightFemales = average(onlyFemales,'weight', 2);
const averageWeightMales = average(onlyMales,'weight', 2);
let ctxRadar = document.getElementById('radar').getContext('2d');
let myChartRadar = new Chart (ctxRadar, {
    type: 'radar',
    data: {
        labels: ['Cm altura promedio', 'Kg peso promedio', 'Edad promedio'],
        datasets: [
        {
            label: 'Total atletas',
            data: [ averageHeight, averageWeight, averageAge],
            backgroundColor: [
                'rgba(153, 102, 255, 0.2)',    
            ],
            borderColor: [
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
        },
        {
            label: 'Mujeres',
            data: [averageHeightFemales, averageWeightFemales, averageAgeFemales],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)', 
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
        },
        {
            label: 'Varones',
            data: [averageHeightMales, averageWeightMales, averageAgeMales],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1,
        }
    ]
    },
    options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Promedios: altura, peso y edad'
          }
        }
    },
});

//Mostrar información detallada cada atleta en un Pop Up
function showAndCloseDataInPopUp(key){
    const popUp = document.getElementById('popUpAtletas');
    const column2 = document.querySelectorAll('#tableContentAthlete .column-2');
    const fragment = new DocumentFragment;
        let div = document.createElement('div');
        div.classList.add('popUpContent');
    column2.forEach(name=>{
        name.addEventListener('click', () => {
            popUp.classList.add('active');
            const textSpan = name.childNodes[1].innerText;
            const getDataByName = dataOnlyOneName.find(item => item[key]===textSpan);
            div.innerHTML = ``;
            div.innerHTML += `
                            <div class="popUp-header">
                                <h2>${getDataByName.name}</h2>
                                <label class="popUp-close">
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                </label>
                            </div>
                            <div class="popUp-main">
                                <div class="popUp-img"><img src="./img-paises/${getDataByName.team}.png"></div>
                                <div class="popUp-info">
                                    <div><span class="popUp-key">Equipo:    </span></span><span class="popUp-value">${getDataByName.team}</span></div>
                                    <div><span class="popUp-key">Edad:  </span></span><span class="popUp-value">${getDataByName.age} años</span></div> 
                                    <div><span class="popUp-key">Altura:    </span><span class="popUp-value">${getDataByName.height} cm</span></div>
                                    <div><span class="popUp-key">Peso:  </span></span><span class="popUp-value">${getDataByName.weight} kg</span></div>
                                    <div><span class="popUp-key">Género:    </span></span><span class="popUp-value">${getDataByName.gender}</span></div>
                                    <div><span class="popUp-key">Deporte:   </span></span><span class="popUp-value">${getDataByName.sport}</span></div>
                                </div>
                            </div>
                            `
            fragment.appendChild(div);
            popUp.appendChild(fragment);
            const closeButton = document.querySelector('.popUp-close');
            closeButton.addEventListener('click', () => {
                popUp.classList.remove('active');
                popUp.innerHTML = ``;
            });
        })
    })
}

//Cambiar de opciones en el navegador
const navMenu = document.getElementById("nav-toggle");
const btnop1 = document.getElementById("op-1");
const btnop2 = document.getElementById("op-2");
const btnop3 = document.getElementById("op-3");
const btnop4 = document.getElementById("op-4");
const op1Text = document.getElementById("athletes");
const op2Text = document.getElementById("country");
const op3Text = document.getElementById("sports");
const op4Text = document.getElementById("statistics");

btnop1.onclick = function(){
    navMenu.checked = false;
    op1Text.style.display="block";
    op2Text.style.display="none";
    op3Text.style.display="none";
    op4Text.style.display="none";
    btnop1.classList.add('active');
    btnop2.style.borderBottom="none";
    btnop2.classList.remove('active');
    btnop3.style.borderBottom="none";
    btnop3.classList.remove('active');
    btnop4.style.borderBottom="none";
    btnop4.classList.remove('active');
}
btnop2.onclick = function(){
    navMenu.checked=false;
    op1Text.style.display="none";
    op2Text.style.display="block";
    op3Text.style.display="none";
    op4Text.style.display="none";
    btnop1.style.borderBottom="none";
    btnop2.classList.add('active');
    btnop1.classList.remove('active');
    btnop3.style.borderBottom="none";
    btnop3.classList.remove('active');
    btnop4.style.borderBottom="none";
    btnop4.classList.remove('active');
}
btnop3.onclick = function(){
    navMenu.checked=false;
    op1Text.style.display="none";
    op2Text.style.display="none";
    op3Text.style.display="block";
    op4Text.style.display="none";
    btnop1.style.borderBottom="none"
    btnop1.classList.remove('active');
    btnop2.style.borderBottom="none";
    btnop2.classList.remove('active');
    btnop3.classList.add('active');
    btnop4.style.borderBottom="none";
    btnop4.classList.remove('active');
}
btnop4.onclick =function(){
    navMenu.checked=false;
    op1Text.style.display="none";
    op2Text.style.display="none";
    op3Text.style.display="none";
    op4Text.style.display="block";
    btnop1.style.borderBottom="none";
    btnop1.classList.remove('active');
    btnop2.style.borderBottom="none";
    btnop2.classList.remove('active');
    btnop3.style.borderBottom="none";
    btnop3.classList.remove('active');
    btnop4.classList.add('active');
}
//Botones para limpiar la data filtrada
document.getElementById('btn-clean1').addEventListener('click', () => {
    let plantilla = '';
    for (let i = 0; i<20; i++){
        plantilla += `<tr>
        <td class="column-1"><img alt="flag"><span class="noc-text"></span></td>
        <td class="column-2"><div class="avatar-circle"><span class="avatar"></span></div><span class="name-text"></span></td>
        <td class="column-3"><span class="sport-text"></span></td>
        <td class="column-4"><div class="medal-circle-gold"><span class="medal-quantity-gold"></span></div></td>
        <td class="column-5"><div class="medal-circle-silver"><span class="medal-quantity-silver"></span></div></td>
        <td class="column-6"><div class="medal-circle-bronze"><span class="medal-quantity-bronze"></span></div></td>
      </tr>`;
    }
    tableAthlete.innerHTML = plantilla;
    showTableAthleteOriginal();
    contentSelect1.innerText = `Género`;
    contentSelect2.innerText = `Equipo`;
    contentSelect3.innerText = `Deportes`;
    searchInputAthletes.value = '';
});
document.getElementById('btn-clean2').addEventListener('click', () => {
    let plantilla = '';
    for (let i = 0; i<20; i++){
        plantilla += `<tr>
        <td><img alt="flag"><span class="noc-text"></span></td>
        <td><span class="number-athletes"></span></td>
        <td><div class="medal-circle-gold"><span class="medal-quantity-gold"></span></div></td>
        <td><div class="medal-circle-silver"><span class="medal-quantity-silver"></span></div></td>
        <td><div class="medal-circle-bronze"><span class="medal-quantity-bronze"></span></div></td>
        <td><span class="total-medals"></span></td>
      </tr>`;
    }
    countryTableBody.innerHTML = plantilla;
    showTableCountryOriginal();
    searchInputCountry.value = '';
});
// new window like a modal
const a = document.querySelectorAll('#sports article a');
a.forEach( a => {
    a.addEventListener('click',(e)=>{
    e.preventDefault();
    const url = a.getAttribute('href');
    let width = 652;
    let height = 500;
    let left = (screen.width - width)/2;
    let top = (screen.height - height)/2;
    if(screen.width <= 375){
        width = 350;
        height = 300;
        left = (screen.width - width)/2;
        top = (screen.height - height)/2;
    }
    else if(screen.width <= 560){
        width = 400;
        height = 300;
        left = (screen.width - width)/2;
        top = (screen.height - height)/2;
    }
    else if(screen.width <= 960){
        width = 500;
        height = 400;
        left = (screen.width - width)/2;
        top = (screen.height - height)/2;
    }
    const specs = `width=${width},height=${height},top=${top},left=${left}`
    return window.open(url, "_blank", specs);
    })
});