<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnimationMarksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('animation_marks', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->string('username');
            $table->foreign('username')->references('username')->on('users');

            $table->integer('animation_id')->unsigned()->index();
            $table->foreign('animation_id')->references('id')->on('animations');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('animation_marks');
    }
}
