//const Team=require('./team.js').default
//const Championship=require('./championship.js').default
import Team from './classes/team.js'
import Championship from './classes/championship.js'

//Array of the teams to participate in the campionship
const TEAMS=['España', 'Francia', 'Italia', 'Inglaterra', 'Portugal', 'Alemania','República Checa', 'Bélgica']

/**
 * This function takes an array of names of teams
 * and returns an array of team objects
 * 
 * @param {Array of String} teamsNamesArray 
 * @returns Array of Team Object
 */
function teamGenerator(teamsNamesArray){
  let teamsObjectsArray=[]
  for (let team of teamsNamesArray) {
    teamsObjectsArray.push(new Team(team))
  }
  return teamsObjectsArray
}

//Generator of Teams
let teamsBeforeDraw=teamGenerator(TEAMS)

//Create de championship
const womenEuro=new Championship('Women Euro 2022', teamsBeforeDraw)

/*Realizamos un sorteo para que los equipos cada vez estén en
un orden aleatorio*/
womenEuro.championshipDraw(womenEuro.teams)

//Initial Signboard
console.log('=================================================================')
console.log('======    COMIENZAN LAS FASES ELIMINATORIAS DEL TORNEO    =======')
console.log('=================================================================\n')

//DONE Mostrar los 8 equipos participantes
console.log('Equipos participantes en el playoff\n')

//DONE Mostrar de qué grupo vienen
womenEuro.showGroupsWinners()


womenEuro.play()

