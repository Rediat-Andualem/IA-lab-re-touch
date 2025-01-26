const express = require('express');
const {  allProfessorsFinder,createProfessorProfile,deleteProfessor} = require('../Controllers/ProfessorsController');
const ProfessorsRoute = express.Router();

ProfessorsRoute.get('/getAllProfessors', allProfessorsFinder);
ProfessorsRoute.post('/createProfessorProfile', createProfessorProfile);
ProfessorsRoute.delete('/deleteProfessorProfile/:professorId', deleteProfessor);


module.exports = {ProfessorsRoute};


