<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDrawMarksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('draw_marks', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->string('username');
            $table->foreign('username')->references('username')->on('users');

            $table->integer('draw')->unsigned()->index();
            $table->foreign('draw')->references('id')->on('draw');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('draw_marks');
    }
}
