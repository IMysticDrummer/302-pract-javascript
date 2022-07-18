import Team from './classes/Team.js'
import Championship from './classes/Championship.js'

//Array of the teams to participate in the campionship
const TEAMS=['España', 'Francia', 'Italia', 'Inglaterra', 'Portugal', 'Alemania','República Checa', 'Bélgica',
'Suiza', 'Dinamarca', 'Holanda', 'Gales', 'Irlanda', 'Grecia', 'Noruega', 'Finlandia']

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

womenEuro.play()

