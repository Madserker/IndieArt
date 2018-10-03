import { User } from "./User";

export class Draw {
    img : ImageBitmap;
    name : string;
    author : User;
    visualizations: number;
    comments : string [];
    tags : string []; //in order to search for filters
    
    constructor(img,name){
        this.img=img;
        this.name=name;
    }
}

