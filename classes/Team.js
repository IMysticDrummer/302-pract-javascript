const MAX_GOALS=11

/**
 * Constructor function for Class Teams
 * @param {String} teamName 
 */
function Team(teamName) {
  this.teamName=teamName
  this.points=0
  this.goalsFor=0
  this.goalsAgainst=0
  this.diffGoals=0
}

/**
 * Makes the team play
 * @returns Integer with de number of goals
 */
Team.prototype.play = () => Math.floor(Math.random()*MAX_GOALS)


/**
 * Save statistics to the team
 * @param {Integer} goalsFor Goals to add in goals for
 * @param {Integer} goalsAgainst Goals to add in goals against
 * @param {Integer} points Point to add
 */
Team.prototype.saveStatistics=function (goalsFor=0, goalsAgainst=0, points=0) {
  this.goalsFor+=goalsFor
  this.goalsAgainst+=goalsAgainst
  this.points+=points
  this.diffGoals=this.goalsFor-this.goalsAgainst
}

export default Team

