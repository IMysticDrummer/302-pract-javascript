import FootballLeague from "./FootballLeague.js"

class Championship {
  /**
   * 
   * @param {String} name Name of the championship
   * @param {Array of Teams objects} teams Teams in the championship
   */
  constructor(name, teams){
    this.name=name
    this.teams=teams
    this.phaseTeams=[]
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
  //return vs
  this.teams=[...vs]
  this.phaseTeams=[...vs]
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

/**
 * This funciton makes the teams order for a round.
 * If the first round comes from a group stage, you must put the
 * firstRound param to true. This will order teams to fight group 
 * champion against a subchampion of a different group.
 * @param {Array of Team Objects} roundTeams Teams classified for this round
 * @param {Boolean} firstRound True if this is the first round. False if not
 * @returns Array of Team Objects with de right order for the round
 */
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

Championship.prototype.match=function (team1, team2){

  let team1Goals=team1.play()
  let team2Goals=team2.play()
  let order
  //If it's a draw, they continue playing
  while (team1Goals===team2Goals){
    team1Goals+=team1.play()
    team2Goals+=team2.play()
  }
  team1.goalsFor+=team1Goals
  team1.goalsAgainst+=team2Goals
  team2.goalsFor+=team1Goals
  team2.goalsAgainst+=team2Goals
  team1.calculDiffGoals()
  team2.calculDiffGoals()

  if (team1Goals>team2Goals) order=[team1,team2]
  else order=[team2,team1]

  console.log(`${team1.teamName} ${team1Goals} : ${team2Goals} ${team2.teamName} ====> ${order[0].teamName}`)

  return order
}

/**
 * Function to play a knockout rounds of a
 * football championship.
 * It's a recursive function that plays all
 * the championship knockout stage, printing the results
 * 
 * @param {Array of Object.Teams} teams 
 * @param {Boolean} firstRound Indicate if this round comes from a group stage classificaton
 * @param {Boolean} thirdPlace Indicate if it's a special round to get the third and fourth places. 
 * @returns String of the knockout final winner
 */
Championship.prototype.knockoutRounds = function (championship, firstRound, thirdPlace){
  //Copy of original teams given by param
  let teams=[...championship.phaseTeams]
  let numberOfTeams=teams.length
  let nameOfRound
  if (!thirdPlace) nameOfRound=championship.nameOfRound(Math.log2(numberOfTeams))
  else nameOfRound='Thrid and fourth position'

  //Print the round
  console.log(`==== ${nameOfRound.toUpperCase()} ====\n`)

  //Calling giving teams to be ordered
  //We must indicate if it's the first round. It's taken from the params
  if (numberOfTeams>=4) teams=championship.roundOrder(teams,firstRound)

  let winners=[]
  let loosers=[] //To use in the fight for tird place
  
  console.group()
  while (teams.length>0) {
    let team1=teams.shift()
    let team2=teams.shift()
    let match=championship.match(team1, team2)
    
    winners.push(match[0])
    
    if (nameOfRound==='Semi Finals') loosers.push(match[1])
  }
  console.groupEnd();
  console.log('\n')

  //Fighting for the tird place
  if (nameOfRound==='Semi Finals') {
    //Params saying teams, not first round, thirs position
    championship.phaseTeams=[...loosers]
    championship.knockoutRounds(championship,false,true)
  }

  if (nameOfRound!=='FINAL') {
    if (nameOfRound==='Thrid and fourth position') {
      console.table(`TERCERO =====> ${winners[0].teamName}\n`)
    }
    else {
      championship.phaseTeams=[...winners]
      return championship.knockoutRounds(championship)
    }
  }
  else {
    return winners[0].teamName.toUpperCase()
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

/**Runs the campionship */
Championship.prototype.play=function () {
  //TODO First step group stage
  const groupStage=new FootballLeague(this.name+' GroupsStage', this.teams)

  groupStage.showGroups(groupStage.groups);

  //TODO Prepare matchDaySchedule
  //TODO Show matchDaySchedule

  //TODO Prepare announcement of the tournament start

  let groupWinners=groupStage.play()

  //DONE Pass the group Winners to the next round
  this.teams=this.phaseTeams=[...groupWinners]

  //TODO Show teams classificated for next round

  //Funciona con this porque está dentro de scope de play, que a su vez
  //está en el scope de la instancia.
  let winner=Championship.prototype.knockoutRounds(this, true)
  console.log('=========================================')
  console.log(`¡${winner} campeona de la ${this.name}!`)
  console.log('=========================================')
}

export default Championship