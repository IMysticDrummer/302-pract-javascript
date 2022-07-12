const TEAMS=['España', 'Francia', 'Italia', 'Inglaterra', 'Portugal', 'Alemania','Repúblic Checa', 'Bélgica']

const Team=require('./team.js')

//Generador de equipos
function teamGenerator(teamsNamesArray){
  let teamsObjectsArray=[]
  for (let team of teamsNamesArray) {
    teamsObjectsArray.push(new Team(team))
  }
  return teamsObjectsArray
}

/*Primera versión del sorteo del campeonato.
Devuelve un array con el orden de enfrentamientos.
En esta primera versión, para cuartos de final */
function championshipDraw (teamsObjectsArray){
  let vs=[]
  while (teamsObjectsArray.length>1) {
    let index=Math.floor(Math.random()*teamsObjectsArray.length)
    vs=vs.concat(teamsObjectsArray.splice(index,1))
  }
  vs.push(teamsObjectsArray.pop())
  return vs
}

let teamsBeforeDraw=teamGenerator(TEAMS)
console.log('Antes sorteo:')
console.log(teamsBeforeDraw)
let teamsAfterDraw=championshipDraw(teamsBeforeDraw)
console.log('Después sorteo:')
console.log(teamsAfterDraw)