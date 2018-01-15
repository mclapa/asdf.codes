<?php

namespace App\Http\Controllers\Api;

use App\Http\Transformers\Api\V1\BoardsTransformer;

use App\Http\Repositories\BoardsRepository;

use App\Exceptions\WrongFieldsException;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Validation\ValidationException;

use App\Http\Controllers\Controller;
use App\Http\Requests;

use App\Community;

use Auth;
use Validator;

class BoardsController extends Controller
{
    protected $storeCheck = [
        'name' => 'required|max:255',
        'city' => 'required|max:255',
        'province' => 'required|in:ab,bc,mb,nb,nl,ns,nt,nu,on,pe,qc,sk,yt',
    ];

    protected $updateCheck = [
        'community_id' => 'required|integer|exists:communities,id',

        'name' => 'sometimes|max:255',
        'address' => 'sometimes|max:255',
        'city' => 'sometimes|max:255',
        'province' => 'sometimes|in:ab,bc,mb,nb,nl,ns,nt,nu,on,pe,qc,sk,yt',
        'postal_code' => 'sometimes|max:255',
        'longitude' => 'sometimes|max:255',
        'latitude' => 'sometimes|max:255',
        'hours' => 'sometimes|max:255',
        'includes_hst' => 'sometimes|boolean',
        'mailchimp_list_id' => 'sometimes|max:255',
        'sales' => 'sometimes|array',
        'directions_url' => 'sometimes',
        'custom_landmarks' => 'sometimes|boolean',
        'youtube_url' => 'sometimes',
        'slider_use_video' => 'sometimes|boolean',

        'logo_id' => 'sometimes|exists:media,id',
        'siteplan_pdf_id' => 'sometimes|nullable|exists:media,id',

        'background_image1' => 'sometimes|exists:media,id',
        'background_image2' => 'sometimes|exists:media,id',
        'background_image3' => 'sometimes|exists:media,id',
        'background_image4' => 'sometimes|exists:media,id',
        'background_image5' => 'sometimes|exists:media,id',
        'background_image6' => 'sometimes|exists:media,id',

        'description' => 'sometimes|max:193',
    ];

    protected $orderCheck = [
        'community_id' => 'required|integer|exists:communities,id',
    ];

    protected $showCheck = [
        'id' => 'required|numeric',
    ];

    public function __construct(
        BoardsRepository $boardsRepo
    )
    {
        $this->boardsRepo = $boardsRepo;
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

    public function store(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, $this->storeCheck);

        if ($validator->fails()) {
            throw new WrongFieldsException('Could not add board', $validator->errors());
        }

        $community = $this->boardsRepo->add($data);

        return response()->json($this->item($community, new BoardsTransformer));
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $data['community_id'] = $id;

        $validator = Validator::make($data, $this->updateCheck);

        if ($validator->fails()) {
            throw new WrongFieldsException('Could not register community', $validator->errors());
        }

        $community = Community::find($id);

        if (!$community) {
            throw new ValidationException('Could not find community', $validator->errors());
        }

        $community = $this->communitiesRepo->update($community, $data);

        return response()->json($this->item($community, new CommunitiesTransformer));
    }

    public function destroy($id)
    {
        $delete = $this->communitiesRepo->destroy($id);

        return response()->json(['data' => ['success' => $delete ? true: false]]);
    }

    public function orderUp(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, $this->orderCheck);

        if ($validator->fails()) {
            throw new WrongFieldsException('Could not order community', $validator->errors());
        }

        $this->communitiesRepo->orderUp($data['community_id']);

        return response()->json(['data' => ['success' => true]]);
    }

    public function orderDown(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, $this->orderCheck);

        if ($validator->fails()) {
            throw new WrongFieldsException('Could not order community', $validator->errors());
        }

        $this->communitiesRepo->orderDown($data['community_id']);

        return response()->json(['data' => ['success' => true]]);
    }

    public function indexPublic()
    {
        $perPage = Input::get('per_page', 10);
        $direction = strtolower(Input::get('direction', 'asc'));

        if (empty($direction)) {
            $direction = 'asc';
        }

        $communities = $this->communitiesRepo;

        $communities = $communities->
            where(['upcoming' => 0])->
            orderBy('communities.order', $direction)->
            orderBy('communities.id', $direction)->
            paginate($perPage);

        $communities->appends('per_page', $perPage);
        $communities->appends('direction', $direction);

        return response()->json($this->paginator($communities, new CommunitiesPublicTransformer));
    }

    public function showPublic(Request $request, $id)
    {
        $data = $request->all();
        $data['id'] = $id;

        $validator = Validator::make($data, $this->showCheck);

        if ($validator->fails()) {
            throw new WrongFieldsException('Could not show community', $validator->errors());
        }

        $community = Community::find($data['id']);

        if (!$community) {
            return $this->response->array(['data' => ['exists' => false]]);
        }

        return response()->json($this->item($community, new CommunitiesPublicTransformer));
    }
}
