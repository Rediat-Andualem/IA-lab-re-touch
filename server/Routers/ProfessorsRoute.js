const express = require('express');
const {  allProfessorsFinder,createProfessorProfile,deleteProfessor,ProfessorPasswordUpdate,ProfessorResetRequest,ProfessorLogin} = require('../Controllers/ProfessorsController');
const ProfessorsRoute = express.Router();

ProfessorsRoute.get('/getAllProfessors', allProfessorsFinder);
ProfessorsRoute.post('/createProfessorProfile', createProfessorProfile);
ProfessorsRoute.delete('/deleteProfessorProfile/:professorId', deleteProfessor);
ProfessorsRoute.post('/professorLogIn', ProfessorLogin);
ProfessorsRoute.post('/professorPasswordRequest', ProfessorResetRequest);
ProfessorsRoute.post('/professorsPasswordReset/:professorId', ProfessorPasswordUpdate);



module.exports = {ProfessorsRoute};


