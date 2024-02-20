import { Role } from "./Role";
import { Session } from "./Session";

export class User {


    id: number;
    firstname: string;
    lastname: string;
    password: string;
    role: Role;  
    sessions?: Session[];
    username:string;  


}