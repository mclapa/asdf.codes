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

Route::group(['middleware' => ['web']], function () {
  Route::resource('board-item/{boardId}/items', 'Api\BoardItemController');

  Route::resource('board', 'Api\BoardController');

  Route::post('board-lock/{boardId}', 'Api\BoardController@boardLock');
  Route::post('board-unlock/{boardId}', 'Api\BoardController@boardUnlock');
});

Route::resource('media', 'Api\MediaController', ['only' => [
      'store'
]]);

# Route::resource('boards', 'Api\BoardController');
// Route::resource('board/{boardId}', 'Api\BoardItemController');
