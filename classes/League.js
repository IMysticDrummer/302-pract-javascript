export default class League {
  constructor(name, teams, config={}) {
    this.name=name
    this.teams=teams
    this.setup(config)

    this.matches = [] // partidos
    this.matchDaySchedule = [] // planificación de jornadas
    this.scores = [] // clasificacion --> por ahora nousada
  }

  setup(config = {}) {
    const defaultConfig = { rounds: 1 }
    this.config = Object.assign(defaultConfig, config)
  }

}

/**
 * 
 * @param {Integer} groupIndex Array index of the group we want to know the name
 * @returns Character name of the group
 */
League.prototype.groupName=function(groupIndex){
  let groupNames='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return groupNames[groupIndex]
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
 League.prototype.groupsRepart= function (teamsArray, teamsPerGroup){
  let teams=[...teamsArray]
  let numberOfTeams=teams.length
  let groups=[]

  if (numberOfTeams%teamsPerGroup!==0) {
    throw new Error(`Los equipos inscritos no son repartibles en los grupos indicados: \n\
    Equipos: ${numberOfTeams} - Equipos por grupo: ${teamsPerGroup}\n`)

  }

  let indexTeams=0
  while (indexTeams<numberOfTeams) {
    let tempGroup=[]
    for (let indexAddingTeams=0; indexAddingTeams<teamsPerGroup; indexAddingTeams++){
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
 League.prototype.showGroups=function (groups, showMatches) {
  let indexGroupNames=0
  let temporalGroups=[...this.groups]
  let config=this.config

  if (groups) temporalGroups=[...groups]
  for (const group of temporalGroups) {
    if (groups.length>1) console.log('Grupo: ', this.groupName(indexGroupNames))
    console.table(group)
    console.log('\n')
    indexGroupNames++

    if (showMatches){
      for (let round=1;round<=config.rounds; round++) {

        for (let day=0; day<this.matchDaySchedule.length; day++){

          console.log(`Jornada ${(day+1)*round}:`)
          console.group()
          for (const match of this.matchDaySchedule[day]) {
            let team1=group[match[0]].teamName
            let team2=group[match[1]].teamName
            if (round%2===1) console.log(`- ${team1} vs ${team2}`)
            else console.log(`- ${team2} vs ${team1}`)
          }
          console.groupEnd()
          console.log('\n')
        }
      }
    }
  }
}
