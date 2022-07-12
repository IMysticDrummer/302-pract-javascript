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

let winners=[]

while (teamsAfterDraw.length>0) {
  let team1=teamsAfterDraw.pop()
  let team2=teamsAfterDraw.pop()
  let team1Goals=team1.play()
  let team2Goals=team2.play()
  //En caso de empate siguen jugando
  while (team1Goals===team2Goals){
    team1Goals+=team1.play()
    team2Goals+=team2.play()
  }

  if (team1Goals>team2Goals) winners.push(team1)
  else winners.push(team2)
  team1.goalsFor+=team1Goals
  team1.goalsAgainst+=team2Goals
  team2.goalsFor+=team2Goals
  team2.goalsAgainst+=team1Goals
  console.log(`${team1.teamName} ${team1Goals} : ${team2Goals} ${team2.teamName}`)
}

console.log('Ganadores de los cuartos')
console.log(winners)