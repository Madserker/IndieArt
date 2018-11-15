<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDrawsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('draws', function (Blueprint $table) {
            Schema::dropIfExists('draws');
            $table->increments('id');//el id incrementara solo
            $table->text('name');
            $table->text('descripcion');
            $table->integer('mark');

            $table->text('imagePath');
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
        Schema::dropIfExists('draws');
    }
}
