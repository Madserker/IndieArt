export interface Notification{
    time : Time
    name
    username
    user_image
    image
    id//id of episode,draw or chapter
    parent_id//id of animation or comic
    parent_name//name of animation or comic
    type
}

export interface Time{
    date
    timezone_type
    timezone
}