<?php

namespace App\Http\Repositories;

use App\Media;

use File;
use Image;

use Illuminate\Support\Facades\Storage;

use PdfToImage;

class MediaRepository {

    // $file must be array before passing in, use:
    // $array = json_decode(json_encode($object), true);
    public function add(Array $data)
    {
        $media = new Media();
        $media->fill($data);
        $media->save();

        return $media;
    }

    public function addByFile($file)
    {
        $storagePath  = Storage::disk('public')->getDriver()->getAdapter()->getPathPrefix();
        $extension = $file->getClientOriginalExtension();
        $pathInfo = pathinfo($file->getClientOriginalName());
        $unique = uniqid();
        $mime = $file->getClientMimeType();

        $name = normalizeString($pathInfo['filename'])."-{$unique}.{$pathInfo['extension']}";

        Storage::disk('public')->put("uploads/$name",  File::get($file));

        $data = [];
        $data['mime'] = $mime;
        $data['extension'] = $extension;
        $data['original_filename'] = $file->getClientOriginalName();
        $data['filename'] = $name;
        $data['size'] = $file->getClientSize();

        return $this->add($data);
    }
}
