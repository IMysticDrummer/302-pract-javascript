class Championship {

  constructor(name, teams){
    this.name=name
    this.teams=teams
  } 
}

/*Primera versión del sorteo del campeonato.
Devuelve un array con el orden de enfrentamientos.
En esta primera versión, para cuartos de final.*/
Championship.prototype.championshipDraw = function () {
  let teams=[...this.teams] //Funciona con this porque es llamado
                            //desde el scope de la instancia
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

Championship.prototype.roundOrder=function(roundTeams, firstRound) {
  let teams=[...roundTeams]
  let orderedTeams=[]

  //DONE In the first roun we must put group champions with the other group
  //subchampions
  if (firstRound) {
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
    //DONE Division by 2 of teams - Sort of each part and joint
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
 * the championship knockout phase, printing the results
 * 
 * @param {Array of Object.Teams} teams 
 * @param {Boolean} firstRound //Indicate if it's the first round
 * @param {Boolean} thirdPlace //Indicate if it's a special round
 * to get the third and fourth places. 
 */
Championship.prototype.knockoutRounds = function (phaseTeams, firstRound, thirdPlace){
  //Copy of original teams given by param
  let teams=[...phaseTeams]
  let numberOfTeams=teams.length
  let nameOfRound
  if (!thirdPlace) nameOfRound=Championship.prototype.nameOfRound(Math.log2(numberOfTeams))
  else nameOfRound='Tercer y Cuarto Puesto'

  //Print the round
  console.log(nameOfRound)

  //Calling giving teams to be ordered
  //We must indicate if it's the first round. It's taken from the params
  if (numberOfTeams>=4) teams=Championship.prototype.roundOrder(teams,firstRound)

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
    //Calling saying teams, not first round, thirs position
    Championship.prototype.knockoutRounds(loosers,false,true)
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

/*Función llamada desde el exterior
Me tocará modificarla cuando la llame después de la
fase de grupos*/
Championship.prototype.showGroupsWinners=function (){
  //Funciona con this, porque es llamado directamente
  //desde la instancia
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

  //Funciona con this porque está dentro de scope de play, que a su vez
  //está en el scope de la instancia.
  Championship.prototype.knockoutRounds(this.teams, true)
}

module.exports=Championship