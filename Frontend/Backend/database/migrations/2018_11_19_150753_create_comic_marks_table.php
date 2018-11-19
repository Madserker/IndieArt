<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateComicMarksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comic_marks', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->string('username');
            $table->foreign('username')->references('username')->on('users');

            $table->integer('comic_id')->unsigned()->index();
            $table->foreign('comic_id')->references('id')->on('comic');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comic_marks');
    }
}
