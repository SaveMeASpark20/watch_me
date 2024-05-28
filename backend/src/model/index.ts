import { RowDataPacket } from "mysql2";

export  interface Movie {
    id : number,
    title: string, 
    url: string
    poster? : string,
}

export interface Tokens {
    access_token : string,
    refresh_token : string,
    token_type : string,
    id_token : string,
    expiry_date : number,
}

export interface JwtPayloadCustomType {
    sub : number,
    family_name : string,
    given_name : string,

}

export interface userData extends RowDataPacket {
    family_name : string,
    given_name : string,
}