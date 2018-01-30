<?php

namespace App\Http\Repositories;

use App\Board;
use Crypt;

class BoardRepository {

    public function add($data)
    {
        $board = new Board();
        $board->fill($data);
        $board->save();

        return $board;
    }

    public function update($board, $data)
    {
        if (isset($data['board_items'])) {
            $board->boardItems()->sync($data['board_items']);
        }

        if (!empty($data['lock_code'])) {
            $data['lock_code'] = Crypt::encrypt($data['lock_code']);
        }

        $board->fill($data);
        $board->save();

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
