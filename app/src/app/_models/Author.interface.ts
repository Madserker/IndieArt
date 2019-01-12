import { Art } from "./Art.interface";

export interface Author extends Art{
    profile_picture: string;
    username: string;
    description: string;
}