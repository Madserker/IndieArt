import { Author } from "./Author.interface";

export interface User extends Author{
    profile_picture: string;
    username: string;
    password: string;
    description: string;
    birthday: Date;
    real_name: string;


}