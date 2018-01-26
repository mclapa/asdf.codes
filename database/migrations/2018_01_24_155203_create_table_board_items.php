<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableBoardItems extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('board_items', function (Blueprint $table) {
            $table->increments('id');

            $table->string('name');
            $table->longText('public_key')->nullable()->default(null);
            $table->longText('receiving_address')->nullable()->default(null);

            $table->integer('board_id')->unsigned();
            $table->foreign('board_id')->references('id')->on('boards');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::dropIfExists('board_items');
    }
}
