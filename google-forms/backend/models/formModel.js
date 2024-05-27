const pool = require('../database/dbinnit');
const Questions = require('./questionModel')

class Form{
    static async createForm(ownerId,questions){
        const resp = createQuestions(questions);
        return resp;
    }

    static async getFormById(formId){
        //return all form questions
        return formId;
    }

}

module.exports = Form;