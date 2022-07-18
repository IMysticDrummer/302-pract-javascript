import League from "./League.js";

const groupName=function(groupIndex){
  let groupNames='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return groupNames[groupIndex]
}

export default class FootballLeague extends League{
  constructor(name, teams, config){
    super(name, teams, config)

    //DONE Repart Teams in groups
    this.groups=this.groupsRepart(this.teams,this.config.teamsPerGroup)

    //DONE Prepare and show matchDaySchedule
    this.matchDaySchedule=this.makeSchedule()
    console.log('\nGrupos y equipos')
    console.log('========================')
    this.showGroups(this.groups,true)
  }

  setup(){
    const defaultConfig={
      rounds:1,
      teamsPerGroup:4,
      pointsPerWin:3,
      pointsPerDraw:1,
      pointsPerLose:0
    }

    this.config=Object.assign(defaultConfig,this.config)
  }
}

/**
 * This function reparts the array of teams into groups,
 * creating so many groups as necessary.
 * This function doesn't works with "byes"
 * Return an array of arrays of Team objects. Each array
 * represents a group.
 * @param {Array of Team Objects} teamsArray Array of teams to repart
 * @param {Integer} teamsPerGroup Teams per group
 * @returns Array of Arrays of Team objects
 */
FootballLeague.prototype.groupsRepart= function (teamsArray, teamsPerGroup){
  let teams=[...teamsArray]
  let numberOfTeams=teams.length
  let groups=[]

  let indexTeams=0
  while (indexTeams<numberOfTeams) {
    let tempGroup=[]
    for (let indexTeams=0; indexTeams<teamsPerGroup; indexTeams++){
      tempGroup.push(teams.shift())
    }
    groups.push(tempGroup)
    indexTeams+=teamsPerGroup
  }
  return groups
}



/**
 * Show in cosole the group repart using console.table.
 * Also indicates the name of the group, before the table.
 * If the param is necessary when the function is called out of the
 * scope of the instance.
 * If it's necessary to print de schedule of the group, param showMatches
 * must be true.
 * @param {Array} groups Optional: Array of arrays of Team objects
 * @param {Boolean} showMatches Optional: True if you want to show the schedule of the group
 */
FootballLeague.prototype.showGroups=function (groups, showMatches) {
  let indexGroupNames=0
  let temporalGroups=[...this.groups]
  if (groups) temporalGroups=[...groups]
  for (const group of temporalGroups) {
    if (groups.length>1) console.log('Grupo: ', groupName(indexGroupNames))
    console.table(group)
    console.log('\n')
    indexGroupNames++

    if (showMatches){
      for (let day=0; day<this.matchDaySchedule.length; day++){
        console.log(`Jornada ${day+1}:`)
        console.group()
        for (const match of this.matchDaySchedule[day]) {
          console.log(`- ${group[match[0]].teamName} vs ${group[match[1]].teamName}`)
        }
        console.groupEnd()
        console.log('\n')
      }
    }
  }
}

//DONE Prepare matchDaySchedule
/**
 * Make the schedule of groups of the league
 * @param {Integer} numOfTeams Optional: Number of teams per group
 * @returns Array (days) of arrays (matches) of arrays (integuer) which indicate the team index in group, which are going to play 
 */
FootballLeague.prototype.makeSchedule=function(numOfTeams){
  let auxNumOfTeams
  if (!numOfTeams) auxNumOfTeams=this.config.teamsPerGroup
  else auxNumOfTeams=numOfTeams
  
  let matchDaySchedule=[]
  let teamIndex=0
  let teamsDownIndex=auxNumOfTeams-2

  //All against all algorithm
  for (let days=0; days<(auxNumOfTeams-1);days++){
    matchDaySchedule.push([])
    for(let match=0; match<(auxNumOfTeams/2);match++){
      if (match>0) {
        matchDaySchedule[days].push([[teamIndex],[teamsDownIndex]])
        if (teamsDownIndex>0) teamsDownIndex--
        else teamsDownIndex=auxNumOfTeams-2
      }
      else {
        if (days%2===0) matchDaySchedule[days].push([[teamIndex],[auxNumOfTeams-1]])
        else matchDaySchedule[days].push([[auxNumOfTeams-1],[teamIndex]])
      }
      if (teamIndex<auxNumOfTeams-2) teamIndex++
      else teamIndex=0
    }
  }

  return matchDaySchedule
}

FootballLeague.prototype.playMatch=function (team1, team2){
  let team1Goals=team1.play()
  let team2Goals=team2.play()

  team1.goalsFor+=team1Goals
  team1.goalsAgainst+=team2Goals
  team2.goalsFor+=team2Goals
  team2.goalsAgainst+=team1Goals
  team1.calculDiffGoals()
  team2.calculDiffGoals()

  if (team1Goals>team2Goals) {
    team1.points+=this.config.pointsPerWin
    team2.points+=this.config.pointsPerLose
  }
  else if (team2Goals>team1Goals) {
    team2.points+=this.config.pointsPerWin
    team1.points+=this.config.pointsPerLose
  }
  else {
    team1.points+=this.config.pointsPerDraw
    team2.points+=this.config.pointsPerDraw
  }

  return `${team1.teamName} ${team1Goals} : ${team2Goals} ${team2.teamName}`
}

FootballLeague.prototype.sortGroupClassification= function (group){
  group.sort((a, b) => {
    if (a.points>b.points) return -1
    else if (a.points<b.points) return 1
    else if (a.diffGoals>b.diffGoals) return -1
    else if (a.diffGoals<b.diffGoals) return 1
    else if (a.teamName>b.teamName) return 1
    else return -1
  })
  
  return group
}

FootballLeague.prototype.play=function(){
  console.log('Dentro de footballleague')
  
  //TODO league play scheme
  //DONE For rounds
  for (let round = 1; round <= this.config.rounds; round++) {
    for (let day=0; day<this.matchDaySchedule.length; day++){
      //DONE For Array days from matchDaySchedule
      console.log(`JORNADA ${day+1}:\n`)
      for (let group=0;group<this.groups.length;group++){
      //DONE For Array groups from this.groups
        console.log(`Grupo ${groupName(group)}\n`)
        for (let match=0; match<this.matchDaySchedule[day].length;match++) {
        //DONE For Array Matches from matchDaySchedule
          //TODO Juega (si hay dos rondas, tener en cuenta por pares)
          let team1=this.groups[group][this.matchDaySchedule[day][match][0]]
          let team2=this.groups[group][this.matchDaySchedule[day][match][1]]
          let result
          if (round%2!==0) result=this.playMatch(team1, team2)
          else result=this.playMatch(team2, team1)
          //Done Muestra el resultado
          console.log(result)
        }
        //DONE Ordena la clasificación TEMPORAL
        let tempClassificatedGroup=[...this.groups[group]]
        
        tempClassificatedGroup=this.sortGroupClassification(tempClassificatedGroup)

        //TODO Muestra la clasificación
        this.showGroups([tempClassificatedGroup])
      }
    }
  }
  //TODO Ordena las clasificaciones de forma definitiva
  this.groups.forEach((group => this.sortGroupClassification(group)))
  

  //DONE After all the stage, return the group champions
  let winners=[]
  for (const group of this.groups) {
    winners.push(group[0])
    winners.push(group[1])
  }
  return winners

}

