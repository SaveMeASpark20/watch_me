import { OAuth2Client } from "google-auth-library";
import { db } from "../config/database";
import { NextFunction, Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import { JwtPayloadCustomType, userData } from "../model";
import { RowDataPacket } from "mysql2";

const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'postmessage',
  );




export async function userAuthenticate(req: Request, res: Response): Promise<Response> {
    try {
        const {tokens} =  await oAuth2Client.getToken(req.body.code); 
        const connect = await db()// exchange code for tokens
        if(tokens.id_token){
            const {sub, family_name, given_name } = jwtDecode<JwtPayloadCustomType>(tokens.id_token);
            console.log(sub, family_name, given_name);
            const [user] = await connect.query("CALL insert_select(?,?,?,?)",[sub, null, family_name, given_name]);
            console.log(user);
            res.cookie('Authorization', tokens.id_token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        }); // Secure cookie settings
            console.log('Set-Cookie header:', res.getHeaders()['set-cookie']);
            return res.status(201).json({family_name, given_name});
        }
        return res.status(500).json('Failed to authenticate with Google')
    } catch (error) {
        console.error('Error during authentication:', error);
        return res.status(500).json({ error: 'Failed to authenticate with Google' });
    }
}

// i think i need to have cookie parser in this part.Thankyou . done not fixed
// i think i need to set the cors and play around on the express.encoder 
//ok in postman need to make it in browser
export async function userAuthorization(req: Request, res: Response, next: NextFunction){
    try {
        const token = req.cookies.Authorization;
        console.log(token);
        const {sub} = jwtDecode<JwtPayloadCustomType>(token);
        if(!sub) return res.sendStatus(401).json("User is not Authorize");
        const id : string= sub.toString();
        const connect = await db()
        const [row] = await connect.query("SELECT id FROM users WHERE id = ?", [id])
        if(!row) return res.sendStatus(401).json("User is not Authorize");
        next();
    } catch (error : any) {
        console.log(error.message)
        return res.sendStatus(500).json("Server Error")
    }
    
}

export async function Authorize(req: Request, res: Response) {
    try {
        const token = req.cookies.Authorization;
        console.log(token);

        if (!token) {
            return res.status(401).json({ message: "User is not authorized" });
        }

        const { sub } = jwtDecode<JwtPayloadCustomType>(token);

        if (!sub) {
            return res.status(401).json({ message: "User is not authorized" });
        }

        const id: string = sub.toString();
        const connect = await db();
        const [data] : [userData[], any]= await connect.query("SELECT given_name, family_name FROM users WHERE id = ?", [id]);

        if (!data) {
            return res.status(401).json({ message: "User is not authorized" });
        }
        
        return res.status(200).json(data[0]);
    } catch (error: any) {
        console.log(error.message);
        return res.status(500).json({ message: "Server error" });
    }
}