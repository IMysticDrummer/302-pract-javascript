const TEAMS=['España', 'Francia', 'Italia', 'Inglaterra', 'Portugal', 'Alemania','Repúblic Checa', 'Bélgica']

const Team=require('./team.js')
const Championship=require('./championship.js')

//Generador de equipos
function teamGenerator(teamsNamesArray){
  let teamsObjectsArray=[]
  for (let team of teamsNamesArray) {
    teamsObjectsArray.push(new Team(team))
  }
  return teamsObjectsArray
}


let teamsBeforeDraw=teamGenerator(TEAMS)

const womenEuro=new Championship('Women Euro 2022', teamsBeforeDraw)


//DONE Cartel inicial
console.log('=================================================================')
console.log('======    COMIENZAN LAS FASES ELIMINATORIAS DEL TORNEO    =======')
console.log('=================================================================\n')

//DONE Mostrar los 8 equipos participantes
//console.table(teamsAfterDraw)
//DONE Mostrar de qué grupo vienen
console.log('Equipos participantes en el playoff\n')
//TODO A transforma en objetos y mostrar sólo participantes
//TODO Elegir el modo de presentación

/*Realizamos un sorteo para que los equipos cada vez estén en
un orden aleatorio*/
womenEuro.championshipDraw(womenEuro.teams)

womenEuro.showGroupsWinners()

womenEuro.play()

