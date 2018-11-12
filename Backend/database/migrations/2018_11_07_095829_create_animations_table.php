<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnimationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('animations', function (Blueprint $table) {
            Schema::dropIfExists('animations');
            $table->increments('id');
            $table->text('name');

            $table->text('synopsis');
            $table->integer('mark');
            $table->text('status');
            $table->text('imagePath');//portada de la serie de animacion
            $table->integer('visits');

            //many to one relation
            $table->string('author');
            $table->foreign('author')->references('username')->on('users');

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
        Schema::dropIfExists('animations');
    }
}
