import FootballLeague from "./FootballLeague.js"

/**
 * Function to obtain a string represent the name of a round
 * @param {integer} round --> number of rounds. 4===1/16 round, 3==='Quarter Finals'...
 * @returns string with de name of the round
*/ 
const nameOfRound = function (round) {
  if (round>3) return `1/${2**round} Round`
  else if (round===3) return 'Quarter Finals'
  else if (round===2) return 'Semi Finals'
  else return 'FINAL'
}

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

    //Random draw teams into de championship, to repart groups
    this.championshipDraw()
  } 
}


/**
 * Function to make the championship draw
 */
Championship.prototype.championshipDraw = function () {
  let teams=[...this.teams]
  let vs=[]

  while (teams.length>1) {
    let index=Math.floor(Math.random()*teams.length)
    vs=vs.concat(teams.splice(index,1))
  }
  vs.push(teams.pop())
  
  this.teams=[...vs]
  this.phaseTeams=[...vs]
}

/**
 * This funciton makes the teams order for a round.
 * If the first round comes from a group stage, you must put the
 * firstRound param to true. This will order teams to fight group 
 * champion against a subchampion of a different group.
 * The number of teams must be a power of two.
 * @param {Array of Team Objects} roundTeams Teams classified for this round. The array comes sort by group, champion and subchampion
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
    firstPartTeams=this.roundOrder(firstPartTeams)
    secondPartTeams=this.roundOrder(secondPartTeams)
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
 * Function that runs de match between two teams in knockout mode
 * @param {Team object} team1 
 * @param {Team object} team2 
 * @returns Array. First position==winner, Second position==loser
 */
Championship.prototype.match=function (team1, team2){

  let team1Goals=team1.play()
  let team2Goals=team2.play()
  let order
  //If it's a draw, they continue playing
  while (team1Goals===team2Goals){
    team1Goals+=team1.play()
    team2Goals+=team2.play()
  }

  team1.saveStatistics(team1Goals,team2Goals)
  team2.saveStatistics(team2Goals,team1Goals)

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
  let tempNameOfRound
  if (!thirdPlace) tempNameOfRound=nameOfRound(Math.log2(numberOfTeams))
  else tempNameOfRound='Third and fourth position'

  //Print the round
  console.log(`==== ${tempNameOfRound.toUpperCase()} ====\n`)

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
    
    if (tempNameOfRound==='Semi Finals') loosers.push(match[1])
  }
  console.groupEnd();
  console.log('\n')

  //Fighting for the tird place
  if (tempNameOfRound==='Semi Finals') {
    //Params saying teams, not first round, third position
    championship.phaseTeams=[...loosers]
    championship.knockoutRounds(championship,false,true)
  }

  if (tempNameOfRound!=='FINAL') {
    if (tempNameOfRound==='Third and fourth position') {
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

/**
 * Shows the groups winners, indicating the group they came from
 */
Championship.prototype.showGroupsWinners=function (){
  let teams=[...this.teams]
  let groups='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let indexGroups=0
  let teamIndex=0
  
  console.group()
  while (teamIndex<teams.length) {
    console.log(`Grupo ${groups[indexGroups]}: ${teams[teamIndex].teamName}, ${teams[teamIndex+1].teamName}`)
    indexGroups++
    teamIndex+=2
  }
  console.groupEnd()
  console.log('\n')
}

/**
 * Shows an announcement centered in a frame
 * @param {Integer} long Total size of the text
 * @param {String} text Text to be shown
 */
Championship.prototype.titlePrint=function(long, text){
  console.log(''.padEnd(long,'='))
  let titleString=text
  let titleSize=titleString.length
  titleString=titleString.padStart(Math.floor(titleSize+(long-titleSize)/2),'=')
  titleString=titleString.padEnd(long,'=')
  console.log(titleString)
  console.log(''.padEnd(long,'='))
}

/**Runs the campionship */
Championship.prototype.play=function () {
  //DONE First step group stage

  const groupStage=new FootballLeague(this.name+' GroupsStage', this.teams)

  //DONE Prepare announcement of the tournament start
  this.titlePrint(80,`      COMIENZA LA ${this.name.toUpperCase()}      `)

  //Plays the group stage and returns the grop winners
  let groupWinners=groupStage.play()

  //DONE Pass the group Winners to the next round
  this.teams=this.phaseTeams=[...groupWinners]

  //DONE Show teams classificated for next round
  //Knockout Stage Signboard
  this.titlePrint(80, '   COMIENZAN LAS FASES ELIMINATORIAS DEL TORNEO    ')

  //DONE Show the classificated teams
  console.log('Equipos participantes en el playoff\n')

  //DONE What group they came from?
  this.showGroupsWinners()

  //Runs the knockout rounds and gets the winner
  let winner=this.knockoutRounds(this,true)

  this.titlePrint(100, `     ¡${winner} campeona de la ${this.name.toUpperCase()}!     `)
}

export default Championship