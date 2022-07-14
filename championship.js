class Championship {
  constructor(name){
    this.name=name
  } 
}

/*Primera versión del sorteo del campeonato.
Devuelve un array con el orden de enfrentamientos.
En esta primera versión, para cuartos de final */
Championship.prototype.championshipDraw = function (teamsObjectsArray) {
  let vs=[]
  while (teamsObjectsArray.length>1) {
    let index=Math.floor(Math.random()*teamsObjectsArray.length)
    vs=vs.concat(teamsObjectsArray.splice(index,1))
  }
  vs.push(teamsObjectsArray.pop())
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

Championship.prototype.roundOrder=function(teams) {
  let orderedTeams=[]
  if (teams.length>4) {
    //TODO División entre 2 del teams - ordenación de cada parte y combinación
    //return teams
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
Championship.prototype.knockoutRounds = function (teams, thirdPlace){
  let numberOfTeams=teams.length
  let round
  if (!thirdPlace) round=Championship.prototype.nameOfRound(Math.log2(numberOfTeams))
  else round='Tercer y Cuarto Puesto'

  //Print the round
  console.log(round)

//  console.log('teams antes de la ordenación:')
//  console.table(teams)
  if (numberOfTeams>=4) teams=Championship.prototype.roundOrder(teams)
//  console.log('teams después de la ordenación:')
//  console.table(teams)

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
      if (round==='Semi Finals') loosers.push(team2)
    }
    else {
      winners.push(team2)
      if (round==='Semi Finals') loosers.push(team1)
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
  if (round==='Semi Finals') {
    Championship.prototype.knockoutRounds(loosers,true)
  }

  if (round!=='FINAL') {
    if (round==='Tercer y Cuarto Puesto') {
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

module.exports=Championship