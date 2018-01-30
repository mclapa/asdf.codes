<?php

namespace App\Http\Controllers\Api;

use App\Http\Transformers\BoardTransformer;

use App\Http\Repositories\BoardRepository;

use App\Exceptions\WrongFieldsException;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Validation\ValidationException;

use App\Http\Controllers\Controller;
use App\Http\Requests;

use App\Board;

use Auth;
use Crypt;
use Validator;

class BoardController extends Controller
{
    protected $storeCheck = [
        'name' => 'reqired|max_length:255',
        'public_key' => 'sometimes',
        'board_items' => 'sometimes|array'
    ];

    protected $updateCheck = [
        'board_id' => 'required|integer|exists:boards,id',
        'name' => 'sometimes',
        'public_key' => 'sometimes',
        'board_items' => 'sometimes|array'
    ];

    protected $showCheck = [
        'board_id' => 'required|integer|exists:boards,id',
    ];

    protected $orderCheck = [
        'community_id' => 'required|integer|exists:communities,id',
    ];

    protected $lockCheck = [
        'board_id' => 'required|integer|exists:boards,id',
        'lock_code' => 'required',
    ];

    protected $unlockCheck = [
        'board_id' => 'required|integer|exists:boards,id',
        'lock_code' => 'required',
    ];

    public function __construct(
        BoardRepository $boardRepo
    )
    {
        $this->boardRepo = $boardRepo;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        die('unused');
        return response()->json($this->paginator($communities, new CommunitiesTransformer));
    }

    public function show(Request $request, $boardId) {
        $data = $request->all();
        $data['board_id'] = $boardId;

        $validator = Validator::make($data, $this->showCheck);

        if ($validator->fails()) {
            throw new WrongFieldsException('Could not update board', $validator->errors());
        }

        $boardInfo = Board::find($data['board_id']);

        return response()->json($this->item($boardInfo, new BoardTransformer));
    }

    public function store(Request $request, $boardId)
    {
        $data = $request->all();

        $validator = Validator::make($data, $this->storeCheck);

        if ($validator->fails()) {
            throw new WrongFieldsException('Could not update board', $validator->errors());
        }

        $board = $this->boardsRepo->where([
            'id' => $boardId,
        ])->first();

        if (!$board) {
            $board = $this->boardsRepo->add([
                'id' => $boardId,
            ]);
        }

        $community = $this->boardItemRepo->add($data);

        return response()->json($this->item($community, new BoardTransformer));
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $data['board_id'] = $id;

        $validator = Validator::make($data, $this->updateCheck);

        if ($validator->fails()) {
            throw new WrongFieldsException('Could not update board', $validator->errors());
        }

        $board = Board::find($id);

        $community = $this->boardRepo->update($board, $data);

        return response()->json($this->item($board, new BoardTransformer));
    }

    public function destroy($id)
    {
        $delete = $this->communitiesRepo->destroy($id);

        return response()->json(['data' => ['success' => $delete ? true: false]]);
    }

    public function boardLock(Request $request, $boardId)
    {
        $data = $request->all();
        $data['board_id'] = $boardId;

        $validator = Validator::make($data, $this->lockCheck);

        if ($validator->fails()) {
            throw new WrongFieldsException('Could not update board', $validator->errors());
        }

        $board = Board::find($data['board_id']);

        if ($board->lock_code) {
            return response()->json(['data' => [
                'success' => false,
            ]]);
        }

        $board = $this->boardRepo->update($board, [
            'lock_code' => $data['lock_code']
        ]);

        return response()->json(['data' => [
            'success' => true,
            'lock_code' => $board->lock_code,
        ]]);
    }

    public function boardUnlock(Request $request, $boardId)
    {
        $data = $request->all();
        $data['board_id'] = $boardId;
        $success = false;

        $validator = Validator::make($data, $this->unlockCheck);

        if ($validator->fails()) {
            throw new WrongFieldsException('Could not update board', $validator->errors());
        }

        $board = Board::find($data['board_id']);

        if ($board->lock_code) {
            if (Crypt::decrypt($board->lock_code) === $data['lock_code']) {
                $success = true;
            }
        }

        return response()->json(['data' => [
            'success' => $success,
            'lock_code' => $board->lock_code,
        ]]);
    }
}
