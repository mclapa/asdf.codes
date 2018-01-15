<?php

namespace App\Http\Transformers;

use League\Fractal;

class BoardTransformer extends Fractal\TransformerAbstract{

    public function transform($board)
    {
        $return = [
            'id' => (int) $board->id,
            'slug' => $board->slug
        ];

        $return['board_items'] = $board->boardItems();

        return $return;
    }
}