<?php

namespace App\Http\Controllers\Api;

use App\Http\Transformers\BoardItemTransformer;

use App\Http\Repositories\BoardItemRepository;

use App\Exceptions\WrongFieldsException;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Validation\ValidationException;

use App\Http\Controllers\Controller;
use App\Http\Requests;

use App\Board;
use App\BoardItem;

use Auth;
use Validator;

class BoardItemController extends Controller
{
    protected $storeCheck = [
        'board_id' => 'required|integer|exists:boards,id',
        'name' => 'required',
        'public_key' => 'required',
    ];

    protected $updateCheck = [
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
        BoardItemRepository $boardItemRepo
    )
    {
        $this->boardItemRepo = $boardItemRepo;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $boardId)
    {
        $perPage = Input::get('per_page', 10);
        $direction = strtolower(Input::get('direction', 'asc'));

        if (empty($column)) {
            $column = 'board_items.order';
        }

        if (empty($direction)) {
            $direction = 'desc';
        }

        $boardItems = $this->boardItemRepo->all();

        $boardItems = $boardItems->
            where(['board_id' => $boardId])->
            // orderBy('communities.order', $direction)->
            orderBy('board_items.id', $direction)->
            paginate($perPage);

        $boardItems->appends('per_page', $perPage);
        $boardItems->appends('direction', $direction);

        return response()->json($this->paginator($boardItems, new BoardItemTransformer));
    }

    public function store(Request $request, $boardId)
    {

        $data = $request->all();
        $data['board_id'] = $boardId;

        $validator = Validator::make($data, $this->storeCheck);

        if ($validator->fails()) {
            throw new WrongFieldsException('Could not add board item', $validator->errors());
        }

        $community = $this->boardItemRepo->add($data);

        return response()->json($this->item($community, new BoardItemTransformer));
    }

    public function update(Request $request, $boardId, $boardItemId)
    {
        $data = $request->all();
        $data['board_item_id'] = $boardItemId;

        $validator = Validator::make($data, $this->updateCheck);

        if ($validator->fails()) {
            throw new WrongFieldsException('Could not update board', $validator->errors());
        }

        $boardItem = BoardItem::find($boardItemId);

        $boardItem = $this->boardItemRepo->update($boardItem, $data);

        return response()->json($this->item($boardItem, new BoardItemTransformer));
    }

    public function destroy(Request $request, $boardId, $boardItemId)
    {
        $delete = $this->boardItemRepo->destroy($boardItemId);

        return response()->json(['data' => ['success' => $delete ? true: false]]);
    }
}
