const MAX_GOALS=11

/**
 * Constructor function for Class Teams
 * @param {String} teamName 
 */
function Team(teamName) {
  this.teamName=teamName
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
 * Put the goals difference in diffGoals property
 */
Team.prototype.calculDiffGoals = function () {
  this.diffGoals=this.goalsFor-this.goalsAgainst
}

export default Team

