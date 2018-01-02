<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;

use Validator;

use App\Http\Repositories\BoardsRepository;

// use App\Http\Transformers\Api\V1\CommunitiesPublicTransformer;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(
        BoardsRepository $boardsRepo
    )
    {
        $this->boardsRepo = $boardsRepo;
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

        $board = $this->boardsRepo->where([
            'slug' => $slug,
        ])->first();

        if (!$board) {
            $board = $this->boardsRepo->add([
                'slug' => $slug,
            ]);
        }

        return view('welcome_board', [
            'slug' => $slug,
        ]);
    }

    public function adminba()
    {
        return view('welcome_admin');
    }
}
