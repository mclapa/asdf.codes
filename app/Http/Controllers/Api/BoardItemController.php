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
use Validator;

class BoardController extends Controller
{
    protected $storeCheck = [
        'board_id' => 'required|integer|exists:boards,id',
        'slug' => 'required',
    ];

    protected $updateCheck = [
        'board_id' => 'required|integer|exists:boards,id',
        'board_item_id' => 'required|integer|exists:board_items,id',
        'name' => 'required',
        'public_key' => 'required',
    ];

    protected $orderCheck = [
        'community_id' => 'required|integer|exists:communities,id',
    ];

    protected $showCheck = [
        'id' => 'required|numeric',
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
    public function index()
    {
        $perPage = Input::get('per_page', 10);
        $direction = strtolower(Input::get('direction', 'asc'));

        if (empty($column)) {
            $column = 'communities.order';
        }

        if (empty($direction)) {
            $direction = 'asc';
        }

        $communities = $this->communitiesRepo;

        $communities = $communities->
            // where(['upcoming' => 0])->
            orderBy('communities.order', $direction)->
            orderBy('communities.id', $direction)->
            paginate($perPage);

        $communities->appends('per_page', $perPage);
        $communities->appends('direction', $direction);

        return response()->json($this->paginator($communities, new CommunitiesTransformer));
    }

    public function store(Request $request, $boardId)
    {
        $data = $request->all();
        $data['board_id'] = $boardId;

        $validator = Validator::make($data, $this->storeCheck);

        if ($validator->fails()) {
            throw new WrongFieldsException('Could not add board item', $validator->errors());
        }

        $community = $this->boardRepo->add($data);

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
}
