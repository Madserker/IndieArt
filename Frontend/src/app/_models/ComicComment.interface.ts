import { Comment } from '../_models/Comment.interface';

export interface ComicComment extends Comment{
    comic_id:number;
}