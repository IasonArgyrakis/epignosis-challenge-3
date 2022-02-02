<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ApplicationController extends Controller
{

    public function store(Request $request){
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
        $application=[
            'status'=>Application::STATUS[0],
            'start' => $request['start'],
            'end' => $request['end'],
            'reason' => $request['reason']
            ];


        $user=$request->user();

        $application=$user->applications()->create($application);
        return $application;




    }

    public function update(Request $request,int $applicationid){
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
        $application=[
            'status'=>Application::STATUS[0],
            'start' => $request['start'],
            'end' => $request['end'],
            'reason' => $request['reason']
        ];


        $user=$request->user();

        $application=$user->applications()->create($application);
        return $application;




    }

}
