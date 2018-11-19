<?php
use Illuminate\Database\Eloquent\Model;
//esta clase no se mapea a ninguna base de datos
//sirve para agrupar informacion de diferentes tablas que necesitamos juntas
class Notification extends Model{
    public $time;
    public $name;
    public $username;
    public $user_image;
    public $image;
    public $id;//id of episode,draw or chapter
    public $parent_id;//id of animation or comic
    public $type;

    function __construct($time, $name, $username, $user_image, $image, $id, $parent_id, $type) {
        $this->time = $time;
        $this->name = $name;
        $this->username = $username;
        $this->user_image = $user_image;
        $this->image = $image;
        $this->id = $id;
        $this->parent_id = $parent_id;
        $this->type = $type;
    }
    
}