<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    /**
     * Returns all users
     * @to Should Paginate for more users
     * @return User[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {

        return User::all();

    }


    /**
     * Update Specific User
     * @param Request $request
     * @param int $user_id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function update(Request $request, int $user_id)
    {
        $validator = Validator::make($request->all()
            ,
            [
                'type' => 'in:admin,employee',
                'firstName' => 'required|string|max:255',
                'lastName' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'total_days' => 'required|integer',
                'total_days_taken' => 'required|integer',
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
        $user->total_days = $request['total_days'];
        $user->total_days_taken = $request['total_days_taken'];;
        $user->save();
        return $user;


    }

    /**
     * Get Specific User info
     * @param int $user_id
     * @return mixed
     */
    public function show(int $user_id)
    {
        $user = User::findorFail($user_id);
        return $user;
    }


}
