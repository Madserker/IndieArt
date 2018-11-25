<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMarksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('marks', function (Blueprint $table) {
            Schema::dropIfExists('marks');
            $table->increments('id');
            $table->integer('score');
            $table->timestamps();

            $table->integer('user_id')->unsigned()->index();
            $table->foreign('user_id')->references('id')->on('users');//un administrador y un equipo no pueden votar, p
                                                                      //por eso cogemos solo la tabla de users y no la de authors

            $table->integer('art_id')->unsigned()->index();
            $table->foreign('art_id')->references('id')->on('arts');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('marks');
    }
}
