<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_users', function (Blueprint $table) {
            Schema::dropIfExists('users_users');
            $table->increments('id');
            $table->timestamps();

            $table->string('author_id');
            $table->foreign('author_id')->references('id')->on('authors');

            $table->string('follower_id');
            $table->foreign('follower_id')->references('id')->on('authors');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::dropIfExists('users_users');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
