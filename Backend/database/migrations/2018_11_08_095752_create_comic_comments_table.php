<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateComicCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comic_comments', function (Blueprint $table) {
            $table->increments('id');
            $table->text('text');

            $table->string('username')->unsigned()->index();
            $table->foreign('username')->references('username')->on('users');

            $table->integer('comic_id')->unsigned()->index();
            $table->foreign('comic_id')->references('id')->on('comics');
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
        Schema::dropIfExists('comic_comments');
    }
}
