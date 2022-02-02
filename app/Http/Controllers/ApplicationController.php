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
                'status' => 'required|in:approved,rejected',
            ]
        );
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }



       $application=Application::find($applicationid);
        if($application==null){
            $response = ["message" => 'no such application'];
            return response($response, 404);
        }

        $application->status= $request['status'];
        $application->approver_id= $request->user()->id;
        $application->save();
        return $application;




    }
    public function show(Request $request) {

        $applications =  Application::where("user_id",$request->user()->id)->orderByDesc('created_at')->get();
        if($applications==null){
            $response = ["message" => 'no  applications for user '];
            return response($response, 404);
        }
        return $applications;

    }

}
