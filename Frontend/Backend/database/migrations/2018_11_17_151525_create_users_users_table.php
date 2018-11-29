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

            $table->string('author');
            $table->foreign('author')->references('username')->on('authors')->onDelete('cascade');

            $table->string('follower');
            $table->foreign('follower')->references('username')->on('authors')->onDelete('cascade');
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
