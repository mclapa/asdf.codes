<?php

namespace App\Http\Repositories;

use App\Board;

class BoardsRepository {

    public function add($data)
    {
        $board = new Board();
        $board->fill($data);
        $board->save();

        return $board;
    }

    public function update($board, $data)
    {
        if (!empty($data['name'])) {
            $data['slug'] = str_slug($data['name']);
        }

        $board->fill($data);

        $board->save();

        if (isset($data['beauty_shots'])) {
            $board->beautyShots()->sync($data['beauty_shots']);
        }

        if (isset($data['sales'])) {
            $board->sales()->delete();
            $board->sales()->createMany($data['sales']);
        }

        if (isset($data['features'])) {
            $board->features()->delete();
            $board->features()->createMany($data['features']);
        }

        if (isset($data['landmarks'])) {
            $board->landmarks()->delete();
            $board->landmarks()->createMany($data['landmarks']);
        }

        if (isset($data['faq'])) {
            $board->faq()->delete();
            $board->faq()->createMany($data['faq']);
        }

        return $board;
    }

    public function all($where = [])
    {
        return Board::where($where);
    }

    public function where($where = [])
    {
        return Board::where($where);
    }

    public function destroy($id)
    {
        $boardModel = Board::find($id);

        return $boardModel->delete();
    }
}
