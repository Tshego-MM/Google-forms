const pool = require('../database/dbinnit');

class Responses{

    static async getFormResponses(formId){

        return formId;
    }

    static async captureResponses(formId, responses){
        //the responses will be marked as 'not verified' until the user to clicks on the verification link
        return formId;
    }

    static async sendVerificationLink(userEmail){
        //the link will include a verificationId which will be associated to responseId
        return userEmail;
    }

}

module.exports = Responses;