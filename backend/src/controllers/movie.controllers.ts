import {Request, Response } from "express";
import {db} from "../config/database";
import { Movie} from "../model";
import dotenv from 'dotenv';


dotenv.config();

export async function getMovies(req: Request, res: Response): Promise<Response> {
    const connect = await db()
   
    const [records] = await connect.query("SELECT title, url, id, poster FROM movies");
    console.log('pumasok dito 2')
    return res.json(records);
}

export async function uploadMovie(req: Request, res: Response): Promise<Response> {
    
    try {
        const movie : Movie  = req.body;
        const connect = await db()
        await connect.query(`INSERT INTO movies SET ?`, [movie])
        return res.status(201).json("Uploaded Miracle Happens");
    } catch (error : any) {
        console.log(error.message)
        return res.status(500).json("Can't Upload I don't know why");
    }
}



    

// try {
//     const sql = 'INSERT INTO `users`(`name`, `age`) VALUES (?, ?), (?,?)';
//     const values = ['Josh', 19, 'Page', 45];
  
//     const [result, fields] = await connection.execute({
//       sql,
//       values,
//       // ... other options
//     });
  
//     console.log(result);
//     console.log(fields);
//   } catch (err) {
//     console.log(err);
//   }