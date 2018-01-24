<?php

namespace App\Http\Transformers;

use League\Fractal;

class MediaTransformer extends Fractal\TransformerAbstract{

    public function transform($media)
    {

        return [
            'id' => $media->id,
            'mime' => $media->mime,
            'original_filename' => $media->original_filename,
            'filename' => $media->filename,
            'created_at' =>  $media->created_at,
            'title' => $media->title,
            'size' => $media->size,
            'extension' => $media->extension,
        ];
    }
}