<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index(Request $request)
    {

        return User::all();

    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all()
            ,
            [
                'start' => 'required|date|date_format:Y-m-d',
                'end' => 'required|date|date_format:Y-m-d',
                'reason' => 'required|string'
            ]
        );
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }


    }

    public function update(Request $request, int $applicationid)
    {


    }

    public function show(Request $request)
    {


    }
}
