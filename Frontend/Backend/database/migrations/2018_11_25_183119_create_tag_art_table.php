<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTagArtTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tag_art', function (Blueprint $table) {
            $table->increments('id');
            
            $table->string('tag_id');
            $table->foreign('tag_id')->references('id')->on('tag')->onDelete('cascade');

            $table->integer('art_id')->unsigned()->index();
            $table->foreign('art_id')->references('id')->on('arts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tag_art');
    }
}
