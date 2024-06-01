const pool = require('../database/dbinnit');
const jose=require("jose")
const jwkToPem=require("jwk-to-pem")
const jwt= require('jsonwebtoken');
class User{

    static async createUser(userId){
        //Logic to create user
        return userId;
    }

    static async getUserById(userId){
        return userId;
    }

    static getJWK=(async ()=>{
        try{
          const data=await fetch(`https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.CONGITO_REGION_KEY}/.well-known/jwks.json`)
          return(await data.json())
        }catch(e){
          return(e)
        }
      })

    static async verifyJWT(req, res,next){
        if(req.headers['authorization']===undefined){
            res.status(401).send("unauthorized")
          }else if(!req.headers['authorization'].includes("Bearer")){
            res.status(401).send("unauthorized")
          }else{
            const token=req.headers['authorization'].split(' ')[1];
            try{
              const header=jose.decodeProtectedHeader(token)
              const jwk=await User.getJWK()
              if(jwk.keys[0].kid===header.kid){
                const pem=jwkToPem(jwk.keys[0]);
                jwt.verify(token,pem,{algorithms:['RS256']})
                next();
              }else{
                res.status(401).send("unauthorized")
              }
            }catch(e){
              console.log(e)
              res.status(401).send("unauthorized")
            }
            
          }
    }
}

module.exports = User;