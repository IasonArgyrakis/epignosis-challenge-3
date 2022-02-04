<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    public function index(Request $request)
    {

        return User::all();

    }


    public function update(Request $request, int $user_id)
    {
        $validator = Validator::make($request->all()
            ,
            [
                'type' => 'in:admin,employee',
                'firstName' => 'required|string|max:255',
                'lastName' => 'required|string|max:255',
                'email' => 'required|email|max:255',
            ]
        );
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $user = User::findorFail($user_id);
        $user->firstname = $request['firstName'];
        $user->lastname = $request['lastName'];
        $user->email = $request['email'];
        $user->type = User::USER_TYPES[$request['type']];
        $user->save();
        return $user;


    }

    public function show(Request $request, int $user_id)
    {
        $user = User::findorFail($user_id);
        return $user;


    }


}
