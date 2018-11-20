<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDrawCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('draw_comments', function (Blueprint $table) {
            Schema::dropIfExists('draw_comments');
            $table->increments('id');
            $table->text('text');

            $table->string('username');
            $table->foreign('username')->references('username')->on('users')->onDelete('cascade');

            $table->integer('draw_id')->unsigned()->index();
            $table->foreign('draw_id')->references('id')->on('draws')->onDelete('cascade');
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
        Schema::dropIfExists('draw_comments');
    }
}
