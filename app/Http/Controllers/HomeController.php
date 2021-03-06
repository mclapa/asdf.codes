<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;

use Validator;

use App\Http\Repositories\BoardRepository;

// use App\Http\Transformers\Api\V1\CommunitiesPublicTransformer;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(
        BoardRepository $boardRepo
    )
    {
        $this->boardRepo = $boardRepo;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function publicba()
    {
        return view('welcome', [

        ]);
    }

    public function publicName($slug)
    {
        $commData = [];

        $board = $this->boardRepo->where([
            'slug' => $slug,
        ])->first();

        if (!$board) {
            $board = $this->boardRepo->add([
                'slug' => $slug,
            ]);
        }

        return view('welcome_board', [
            'slug' => $slug,
            'id' => $board->id,
        ]);
    }
}
