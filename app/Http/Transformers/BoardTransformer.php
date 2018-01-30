<?php

namespace App\Http\Transformers;

use League\Fractal;

use App\Http\Transformers\BoardItemTransformer;

class BoardTransformer extends Fractal\TransformerAbstract{

    public function transform($board)
    {
        $boardItemTransformer = new BoardItemTransformer();

        $return = [
            'id' => (int) $board->id,
            'slug' => $board->slug,
            'lock_code' => $board->lock_code ? true : false,
        ];

        $return['board_items'] = $board->boardItems;

        foreach ($return['board_items'] as $k => $v) {
            $return['board_items'][$k] = $boardItemTransformer->transform($v);
        }

        return $return;
    }
}