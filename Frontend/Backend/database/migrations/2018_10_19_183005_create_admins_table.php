<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

            //para ejecutar las migraciones se usa: php artisan migrate
            //para crear una migracion: migration create name --create=name
class CreateAdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            //Ponemos la informacion que queremos obtener de la base de datos de admins, ejecutamos la migracion y se sube a phpmyadmin
            Schema::dropIfExists('admins');            
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique(); //unique es el id, la clave primaria
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admins');
    }
}
