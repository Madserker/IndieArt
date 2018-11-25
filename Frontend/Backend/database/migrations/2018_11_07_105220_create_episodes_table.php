<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEpisodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('episodes', function (Blueprint $table) {
            Schema::dropIfExists('episodes');
            $table->increments('id');
            $table->text('name');
            $table->integer('number');
            $table->text('video_path');
            $table->timestamps();

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
        Schema::dropIfExists('episodes');
    }
}
