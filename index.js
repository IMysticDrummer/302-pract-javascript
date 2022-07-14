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

/*Realizamos un sorteo para que los equipos cada vez estén en
un orden aleatorio*/
let teamsAfterDraw=womenEuro.championshipDraw(teamsBeforeDraw)


//DONE Cartel inicial
console.log('=================================================================')
console.log('======    COMIENZAN LAS FASES ELIMINATORIAS DEL TORNEO    =======')
console.log('=================================================================\n')

//DONE Mostrar los 8 equipos participantes
console.table(teamsAfterDraw)
//DONE Mostrar de qué grupo vienen
console.log('Equipos participantes en el playoff\n')
//TODO A transforma en objetos y mostrar sólo participantes
//TODO Elegir el modo de presentación

console.group()
let groups=['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
let indexGroups=0
let teamIndex=0
while (teamIndex<teamsAfterDraw.length) {
  console.log(`Grupo ${groups[indexGroups]}: ${teamsAfterDraw[teamIndex].teamName}, ${teamsAfterDraw[teamIndex+1].teamName}`)
  indexGroups++
  teamIndex+=2
}

console.groupEnd()
console.log('\n')

//TODO Organizar las eliminatorias para evitar cruces de grupo hasta la final

womenEuro.knockoutRounds(teamsAfterDraw)

