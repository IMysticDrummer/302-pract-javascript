export default class League {
  constructor(name, teams, config={}) {
    this.name=name
    this.teams=teams
    this.setup(config)

    this.matches = [] // partidos
    this.matchDaySchedule = [] // planificación de jornadas
    this.scores = [] // clasificacion
  }

  setup(config = {}) {
    const defaultConfig = { rounds: 1 }
    this.config = Object.assign(defaultConfig, config)
  }

}