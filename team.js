const MAX_GOALS=11

function Team(teamName) {
  this.teamName=teamName
  this.goalsFor=0
  this.goalsAgainst=0
  this.diffGoals=0
}

Team.prototype.play = () => Math.floor(Math.random()*MAX_GOALS)


Team.prototype.calculDiffGoals = function () {
  this.diffGoals=this.goalsFor-this.goalsAgainst
}

module.exports = Team

