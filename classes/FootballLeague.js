import League from "./League.js";

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

  setup(config){
    const defaultConfig={
      rounds:1,
      teamsPerGroup:4,
      pointsPerWin:3,
      pointsPerDraw:1,
      pointsPerLose:0
    }

    this.config=Object.assign(defaultConfig,config)
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

/**
 * Plays the match using the "play" method defined in Team
 * @param {Team} team1 
 * @param {Team} team2 
 * @returns 
 */
FootballLeague.prototype.playMatch=function (team1, team2){
  if (!team1 || !team2) throw new Error('Debes pasar equipos de clase Team para jugar')

  if (!team1.play || !team2.play) throw new Error('Los equipos no tiene definida la función play')
  
  let config={...this.config}
  
  let team1Goals=team1.play()
  let team2Goals=team2.play()

  let team1Points=0
  let team2Points=0

  
  if (team1Goals>team2Goals) {
    team1Points+=config.pointsPerWin
    team2Points+=config.pointsPerLose
  }
  else if (team2Goals>team1Goals) {
    team2Points+=config.pointsPerWin
    team1Points+=config.pointsPerLose
  }
  else {
    team1Points+=config.pointsPerDraw
    team2Points+=config.pointsPerDraw
  }
  team1.saveStatistics(team1Goals, team2Goals, team1Points)
  team2.saveStatistics(team2Goals, team1Goals, team2Points)

  return `${team1.teamName} ${team1Goals} : ${team2Goals} ${team2.teamName}`
}

/**
 * 
 * @param {Array} group Array of Team Objetcs
 * @returns Array of Team Objectes sort by points, difference of goals, team name
 */
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

/**
 * 
 * @returns Array of Team objects. First two=== winner and second of the first group / next two === winner and second of the 
 * second group... etc
 */
FootballLeague.prototype.play=function(){
  
  //DONE league play scheme
  //DONE For rounds
  for (let round = 1; round <= this.config.rounds; round++) {

    for (let day=0; day<this.matchDaySchedule.length; day++){
      //DONE For Array days from matchDaySchedule
      console.log(`JORNADA ${(day+1)*round}:\n`)

      for (let group=0;group<this.groups.length;group++){
      //DONE For Array groups from this.groups
        console.log(`Grupo ${this.groupName(group)}\n`)

        for (let match=0; match<this.matchDaySchedule[day].length;match++) {
        //DONE For Array Matches from matchDaySchedule
          
          let team1=this.groups[group][this.matchDaySchedule[day][match][0]]
          let team2=this.groups[group][this.matchDaySchedule[day][match][1]]
          let result
          if (round%2!==0) result=this.playMatch(team1, team2)
          else result=this.playMatch(team2, team1)
          //Done Show the result
          console.log(result)
        }
        //DONE Sort classificaton temporally to print on screen
        let tempClassificatedGroup=[...this.groups[group]]
        
        tempClassificatedGroup=this.sortGroupClassification(tempClassificatedGroup)

        //TODO Show the classification
        this.showGroups([tempClassificatedGroup])
      }
    }
  }
  //TODO Sort the classification definitly
  this.groups.forEach((group => this.sortGroupClassification(group)))
  

  //DONE After all the stage, return the group champions
  let winners=[]
  for (const group of this.groups) {
    winners.push(group[0])
    winners.push(group[1])
  }
  return winners

}

