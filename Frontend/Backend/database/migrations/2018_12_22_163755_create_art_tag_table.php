<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArtTagTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('art_tag', function (Blueprint $table) {
            Schema::dropIfExists('tag_art');
            $table->increments('id');
            
            $table->integer('tag_id')->unsigned()->index();;
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');

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
        Schema::dropIfExists('art_tag');
    }
}
