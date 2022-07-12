const MAX_GOALS=11

function Team(teamName) {
  this.teamName=teamName
  this.goalsFor=0
  this.goalsAgainst=0
}

Team.prototype.play = () => Math.floor(Math.random()*MAX_GOALS)
/*
let espana=new Team('España')
console.log(espana)
let play=espana.play()
console.log(`España: ${play}`)
espana.goalsFor+=play
console.log(espana)
console.log(espana.goalsFor)
*/
module.exports = Team

