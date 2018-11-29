<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArtTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('arts', function (Blueprint $table) {
            Schema::dropIfExists('arts');
            $table->increments('id');//el id incrementara solo
            $table->text('name');
            $table->text('descripcion');

            $table->text('image_path');

            //many to one relation
            $table->string('author');
            $table->foreign('author')->references('username')->on('authors')->onDelete('cascade');;

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
        Schema::dropIfExists('art');
    }
}
