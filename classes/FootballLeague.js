import League from "./league.js";

export default class FootballLeague extends League{
  constructor(name, teams, config){
    super(name, teams, config)

    //DONE Repart Teams in groups
    this.groups=this.groupsRepart(this.teams,this.config.teamsPerGroup)
    
    //DONE Prepare matchDaySchedule
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
  let groupNames='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let indexGroupNames=0
  let temporalGroups=[...this.groups]
  if (groups) temporalGroups=[...groups]
  for (const group of temporalGroups) {
    console.log('Grupo: ',groupNames[indexGroupNames])
    console.table(group)
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
      else matchDaySchedule[days].push([[teamIndex],[auxNumOfTeams-1]])
      if (teamIndex<auxNumOfTeams-2) teamIndex++
      else teamIndex=0
    }
  }

  return matchDaySchedule
}

FootballLeague.prototype.play=function(){
  console.log('Dentro de footballleague')
  
  //TODO Playing each day and show the results

  //TODO Sort the classification

  //TODO Show the classification
  

  //TODO After all the stage, return the group champions
  let winners=[]
  for (const group of this.groups) {
    winners.push(group[0])
    winners.push(group[1])
  }
  return winners


}

