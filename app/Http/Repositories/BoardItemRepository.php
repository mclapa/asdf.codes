<?php

namespace App\Http\Repositories;

use App\BoardItem;

class BoardItemRepository {

    public function add($data)
    {
        $board = new BoardItem();
        $board->fill($data);
        $board->save();

        return $board;
    }

    public function update($board, $data)
    {
        if (isset($data['board_items'])) {
            $board->boardItems()->sync($data['board_items']);
        }

        return $board;
    }

    public function all($where = [])
    {
        return BoardItem::where($where);
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

    public function paginate($perPage = 15)
    {
        return BoardItem::paginate($perPage);
    }

    public function orderBy($column, $direction)
    {
        return BoardItem::orderBy($column, $direction);
    }
}
