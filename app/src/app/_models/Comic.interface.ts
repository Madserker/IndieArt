import { Art } from "./Art.interface";

export interface Comic extends Art{
    mark: number;
    name: string;
    id: number;
    imagePath:string;
    author:string;
    descripcion:string;

    updated_at: string;
    created_at: string;
}