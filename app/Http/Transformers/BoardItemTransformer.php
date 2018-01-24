<?php

namespace App\Http\Transformers;

use League\Fractal;

class BoardItemTransformer extends Fractal\TransformerAbstract{

    public function transform($boardItem)
    {
        $return = [
            'id' => (int) $boardItem->id,
            'name' => $boardItem->name,
            'public_key' => $boardItem->public_key,
        ];

        return $return;
    }
}