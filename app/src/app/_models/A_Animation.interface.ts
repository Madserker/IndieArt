import { Art } from "./Art.interface";

export interface A_Animation extends Art{
    mark: number;
    name: string;
    id: number;
    imagePath: string;
    author:string;
    synopsis:string;

    updated_at: string;
    created_at: string;
}