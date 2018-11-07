<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChaptersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chapters', function (Blueprint $table) {
            Schema::dropIfExists('chapters');
            $table->increments('id');
            $table->string('name');
            $table->integer('number');
            $table->string('ImagePath');
            $table->timestamps();

            $table->integer('comic_id')->unsigned()->index();
            $table->foreign('comic_id')->references('id')->on('comics');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chapters');
    }
}
