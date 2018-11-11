import { Comment } from '../_models/Comment.interface';

export interface DrawComment extends Comment{
    draw_id:number;
}