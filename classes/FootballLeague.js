import League from "./league.js";

export default class FootballLeague extends League{
  constructor(name, teams, config){
    super(name, teams, config)
    //DONE Repart Teams in groups
    this.groups=this.groupsRepart(this.teams,this.config.teamsPerGroup)
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
 * If the param is necessary if the function is called out of the
 * scope of the instance.
 * @param {Array} groups Optional: Array of arrays of Team objects
 */
FootballLeague.prototype.showGroups=function (groups) {
  let groupNames='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let indexGroupNames=0
  let temporalGroups=[...this.groups]
  if (groups) temporalGroups=[...groups]
  for (const group of temporalGroups) {
    console.log('Grupo: ',groupNames[indexGroupNames])
    console.table(group)
    indexGroupNames++
  }
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

