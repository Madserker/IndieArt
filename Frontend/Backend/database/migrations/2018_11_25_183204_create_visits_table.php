<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVisitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('visits', function (Blueprint $table) {
            Schema::dropIfExists('visits');
            $table->increments('id');
            
            $table->string('user');
            $table->foreign('user')->references('username')->on('users')->onDelete('cascade');

            $table->integer('art_id')->unsigned()->index();
            $table->foreign('art_id')->references('id')->on('arts')->onDelete('cascade');
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
        Schema::dropIfExists('visits');
    }
}
