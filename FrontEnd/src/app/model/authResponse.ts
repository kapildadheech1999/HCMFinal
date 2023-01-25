import { User } from "./User";

//response schema for rest api
export class AuthResponse{
    constructor(
        public user:User,
        public token:string
        ){}
}