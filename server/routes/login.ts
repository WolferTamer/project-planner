import { RequestHandler } from "express"
import { OAuth2Client } from "google-auth-library"
import { jwtDecode } from 'jwt-decode'

module.exports =  {
    get:{
        route:"/login",
        execute: ((req,res) => {
            
        }) satisfies RequestHandler
    },
    put:{
        route:'/login',
        execute: (async (req, res) => {
            if(!req.body || !req.body.code) { res.status(400).json({'error':'No code found in the body'}) }
            try {
                
                const {tokens} = await (global.client as OAuth2Client).getToken(req.body.code);

                (global.client as OAuth2Client).setCredentials(tokens);
                const user_info = jwtDecode(tokens.id_token)
                //Check if user with matching email exists, if not create it
                res.json(tokens)

            } catch(e:any) {
                console.log(e)
                res.status(400).json({'error':'An Error Occurred'})
            }

        }) satisfies RequestHandler
    }
}