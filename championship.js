class Championship {

  constructor(name, teams){
    this.name=name
    this.teams=teams
    this.round=0 //What step of the championship we are
  } 
}

/*Primera versión del sorteo del campeonato.
Devuelve un array con el orden de enfrentamientos.
En esta primera versión, para cuartos de final */
Championship.prototype.championshipDraw = function () {
  //let teams=[...Championship.prototype.teams]
  let teams=[...this.teams]
  let vs=[]
  while (teams.length>1) {
    let index=Math.floor(Math.random()*teams.length)
    vs=vs.concat(teams.splice(index,1))
  }
  vs.push(teams.pop())
  return vs
}

/**
 * Function to obtain a string represent the name of a round
 * @param {integer} round --> number of rounds. 4===1/16 round, 3==='Quarter Finals'...
 * @returns string with de name of the round
*/ 
 Championship.prototype.nameOfRound =function (round) {
  if (round>3) return `1/${2**round} Round`
  else if (round===3) return 'Quarter Finals'
  else if (round===2) return 'Semi Finals'
  else return 'FINAL'
}

Championship.prototype.roundOrder=function(roundTeams, roundNumber) {
  //let teams=[...Championship.prototype.teams]
  let teams=[...roundTeams]
  let orderedTeams=[]

  //TODO Si es la primera entrada, hay que colocar a los campeones contra los
  //subcampeones. Sino pierden la ventaja
  if (roundNumber===1) {
    let indexOfTeams=0
    while (indexOfTeams<teams.length) {
      orderedTeams.push(teams[indexOfTeams])
      orderedTeams.push(teams[indexOfTeams+3])
      orderedTeams.push(teams[indexOfTeams+2])
      orderedTeams.push(teams[indexOfTeams+1])
      indexOfTeams+=4
    }
  }
  else if (teams.length>4) {
    //DONE División entre 2 del teams - ordenación de cada parte y combinación
    let firstPartTeams=teams.slice(0,(teams.length/2))
    let secondPartTeams=teams.slice((teams.length/2), (teams.length))
    firstPartTeams=Championship.prototype.roundOrder(firstPartTeams)
    secondPartTeams=Championship.prototype.roundOrder(secondPartTeams)
    orderedTeams=firstPartTeams.concat(secondPartTeams)
  }
  else if(teams.length===4) {
    orderedTeams.push(teams[2])
    orderedTeams.push(teams[0])
    orderedTeams.push(teams[3])
    orderedTeams.push(teams[1])
  }
  return orderedTeams
}


/**
 * Function to play a knockout rounds of a
 * football championship.
 * It's a recursive function that plays all
 * the championship, printing the results
 * 
 * @param {Array of Object.Teams} teams 
 * @param {Boolean} thirdPlace //Indicate if it's a special round
 * to get the third and fourth places. 
 */
Championship.prototype.knockoutRounds = function (phaseTeams, thirdPlace){
  //Copy of original teams
  let teams=[...phaseTeams]
  let numberOfTeams=teams.length
  let nameOfRound
  if (!thirdPlace) nameOfRound=Championship.prototype.nameOfRound(Math.log2(numberOfTeams))
  else nameOfRound='Tercer y Cuarto Puesto'
  Championship.prototype.round++

  //Print the round
  console.log(nameOfRound)

  //Pasamos los equipos para que sean ordenados
  //Venimos de la fase de grupos así que le pasamos un true a mayores
  if (numberOfTeams>=4) teams=Championship.prototype.roundOrder(teams,Championship.prototype.round)

  let winners=[]
  let loosers=[] //To use in the fight for tird place
  
  console.group()
  while (teams.length>0) {
    let team1=teams.shift()
    let team2=teams.shift()
    let team1Goals=team1.play()
    let team2Goals=team2.play()
    //If it's a draw, they continue playing
    while (team1Goals===team2Goals){
      team1Goals+=team1.play()
      team2Goals+=team2.play()
    }
    team1.calculDiffGoals()
    team2.calculDiffGoals()
  
    if (team1Goals>team2Goals) {
      winners.push(team1)
      if (nameOfRound==='Semi Finals') loosers.push(team2)
    }
    else {
      winners.push(team2)
      if (nameOfRound==='Semi Finals') loosers.push(team1)
    }
    team1.goalsFor+=team1Goals
    team1.goalsAgainst+=team2Goals
    team2.goalsFor+=team2Goals
    team2.goalsAgainst+=team1Goals
    console.log(`${team1.teamName} ${team1Goals} : ${team2Goals} ${team2.teamName}`)
  }
  console.groupEnd();
  console.log('\n')
  //Fighting for the tird place
  if (nameOfRound==='Semi Finals') {
    Championship.prototype.knockoutRounds(loosers,true)
  }

  if (nameOfRound!=='FINAL') {
    if (nameOfRound==='Tercer y Cuarto Puesto') {
      console.table('TERCERO')
      console.table(winners[0].teamName)
    }
    else {
      console.table(winners)
      Championship.prototype.knockoutRounds(winners)
    }
  }
  else {
    console.log('WINNER!!')
    console.log(winners[0].teamName)
  }
  
}

Championship.prototype.showGroupsWinners=function (){
//  let teams=[...Championship.prototype.teams]
  let teams=[...this.teams]
  console.group()
  let groups=['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  let indexGroups=0
  let teamIndex=0
  while (teamIndex<teams.length) {
    console.log(`Grupo ${groups[indexGroups]}: ${teams[teamIndex].teamName}, ${teams[teamIndex+1].teamName}`)
    indexGroups++
    teamIndex+=2
  }

  console.groupEnd()
  console.log('\n')
}

Championship.prototype.play=function () {

  /*Realizamos un sorteo para que los equipos cada vez estén en
  un orden aleatorio*/
  //Championship.prototype.teams=Championship.prototype.championshipDraw(Championship.prototype.teams)

  Championship.prototype.knockoutRounds(this.teams)
}

module.exports=Championship