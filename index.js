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

const womenEuro=new Championship('Women Euro 2022')


let teamsBeforeDraw=teamGenerator(TEAMS)
//console.log('Antes sorteo:')
//console.log(teamsBeforeDraw)

/*Realizamos un sorteo para que los equipos cada vez estén en
un orden aleatorio*/
let teamsAfterDraw=womenEuro.championshipDraw(teamsBeforeDraw)
//console.log('Después sorteo:')
console.log(teamsAfterDraw)





console.log('=================================================================')
console.log('======    COMIENZAN LAS FASES ELIMINATORIAS DEL TORNEO    =======')
console.log('=================================================================')

console.log('\nEquipos participantes en el playoff')
console.table(teamsAfterDraw)
for (const team of teamsAfterDraw) {
  console.table(team.teamName)
}

womenEuro.knockoutRounds(teamsAfterDraw,womenEuro.nameOfRound,womenEuro.knockoutRounds)

/*
console.log('Ganadores de los cuartos')
console.log(winners)
*/
