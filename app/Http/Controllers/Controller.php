<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Symfony\Component\HttpFoundation\JsonResponse;
use Validator;

use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function validate($request, $validation) {

        $validator = Validator::make($request->all(), $validation);

        if ($validator->fails()) {
            return response()->json($validator->errors()->getMessages(), 422);
        }
    }

    public function item($item, $transformer)
    {
        $manager = new Manager();
        $resource = new Item($item, $transformer);

        return $manager->createData($resource)->toArray();
    }

    public function collection($collection , $transformer)
    {
        $manager = new Manager();

        $resource = new Collection($collection, $transformer);

        return $manager->createData($resource)->toArray();
    }

    public function paginator($paginator, $transformer)
    {
        $manager = new Manager();

        $collection = $paginator->getCollection();

        $resource = new Collection($collection, $transformer);

        $resource->setPaginator(new IlluminatePaginatorAdapter($paginator));

        return $manager->createData($resource)->toArray();
    }
}
