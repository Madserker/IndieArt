<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTeamUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('team_user', function (Blueprint $table) {
            Schema::dropIfExists('team_user');
            $table->increments('id');
            $table->string('role');//el rol que desempeña el user en el team
            $table->boolean('admin');//si puede añadir o eliminar gente

            $table->string('team');
            $table->foreign('team')->references('username')->on('teams');

            $table->string('user');
            $table->foreign('user')->references('username')->on('users');
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
        Schema::dropIfExists('team_user');
    }
}
