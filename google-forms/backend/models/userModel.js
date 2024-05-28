const pool = require('../database/dbinnit');

class User{

    static async createUser(userId){
        //Logic to create user
        return userId;
    }

    static async getUserById(userId){
        return userId;
    }
}

module.exports = User;