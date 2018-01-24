<?php

namespace App\Http\Controllers\Api;

use App\Media;

use App\Http\Transformers\MediaTransformer;

use App\Http\Repositories\MediaRepository;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Facades\Input;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

use App\Exceptions\WrongFieldsException;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;
use Email;
use Validator;

class MediaController extends Controller
{
    protected $storeCheck = [
        'file' => 'required',
    ];

    public function __construct(
        MediaRepository $mediaRepo
    )
    {
        $this->mediaRepo = $mediaRepo;
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, $this->storeCheck);

        if ($validator->fails()) {
            throw new WrongFieldsException('Could not add media', $validator->errors());
        }

        $file = $data['file'];

        $media = $this->mediaRepo->addByFile($file);

        return response()->json($this->item($media, new MediaTransformer));
    }

}
