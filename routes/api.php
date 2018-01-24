<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('board/{boardId}/board-item', 'Api\BoardItemController');

Route::resource('media', 'Api\MediaController', ['only' => [
      'store'
]]);

# Route::resource('boards', 'Api\BoardController');
// Route::resource('board/{boardId}', 'Api\BoardItemController');
