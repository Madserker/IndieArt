<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnimationCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('animation_comments', function (Blueprint $table) {
            Schema::dropIfExists('animation_comments');
            $table->increments('id');
            $table->text('text');

            $table->string('username');
            $table->foreign('username')->references('username')->on('users')->onDelete('cascade');

            $table->integer('animation_id')->unsigned()->index();
            $table->foreign('animation_id')->references('id')->on('animations')->onDelete('cascade');
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
        Schema::dropIfExists('animation_comments');
    }
}
