const jose=require("jose")
const jwkToPem=require("jwk-to-pem")
const jwt= require('jsonwebtoken');

const ensureSecure = (req, res, next) => {
    if (req.secure) {
        return next();
    } else {
        res.status(403).json({ message: 'HTTPS Required' });
    }
};


const getJWK=(async ()=>{
    try{
      const data=await fetch(`https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.CONGITO_REGION_KEY}/.well-known/jwks.json`)
      return(await data.json())
    }catch(e){
      return(e)
    }
  })

const verifyJWT=(async(req, res,next)=>{
    if(req.headers['authorization']===undefined){
        res.status(401).send("unauthorized")
      }else if(!req.headers['authorization'].includes("Bearer")){
        res.status(401).send("unauthorized")
      }else{
        const token=req.headers['authorization'].split(' ')[1];
        try{
          const header=jose.decodeProtectedHeader(token)
          const jwk=await getJWK()
          if(jwk.keys[0].kid===header.kid){
            const pem=jwkToPem(jwk.keys[0]);
            jwt.verify(token,pem,{algorithms:['RS256']})
            next();
          }else{
            res.status(401).send("unauthorized")
          }
        }catch(e){
          if(e.message==="jwt expired"){
            res.status(440).send("session expired")
          }else{
            res.status(401).send(e)
          }
        }
        
      }
})


module.exports = {ensureSecure, verifyJWT};