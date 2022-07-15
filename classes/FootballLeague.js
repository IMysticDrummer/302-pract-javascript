import League from "./league.js";

export default class FootballLeague extends League{
  constructor(name, teams, config){
    super(name, teams, config)
    this.groups=[]
  }

  setup(){
    const defaultConfig={
      rounds:1,
      teamsForGroup:4,
      pointsPerWin:3,
      pointsPerDraw:1,
      pointsPerLose:0
    }

    this.config=Object.assign(defaultConfig,this.config)
  }
}

FootballLeague.prototype.play=function(){
  console.log('Dentro de footballleague')
  console.log(this.teams)
}

