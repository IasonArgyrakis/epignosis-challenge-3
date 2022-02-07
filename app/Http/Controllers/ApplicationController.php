<?php

namespace App\Http\Controllers;

use App\Mail\NotifyAdmin;
use App\Mail\NotifyUser;
use App\Models\Application;
use App\Models\User;
use App\Services\ApplicationSerivce;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ApplicationController extends Controller
{
    protected $appService;

    public function __construct()
    {
        $this->appService = new ApplicationSerivce();
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Database\Eloquent\Model|\Illuminate\Http\Response
     */
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
        $application = [
            'status' => Application::STATUS["pending"],
            'start' => $request['start'],
            'end' => $request['end'],
            'reason' => $request['reason'],
        ];


        /** @var User $user */
        $user = $request->user();


        return $this->appService->saveNewApplication($user, $application);


    }

    /**
     * @param int $applicationid
     * @param int $outcome
     * @return string
     */
    public function email_link(int $applicationid, string $outcome,int $approverId)
    {

        return $this->appService->changeApplicationStatus($applicationid, $outcome,$approverId);


    }

    /**
     * Update Application Status
     * @param Request $request
     * @param int $applicationid
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function update(Request $request, int $applicationid )
    {


        $validator = Validator::make($request->all()
            ,
            [
                'status' => 'required|in:approved,rejected',
            ]
        );
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }


        $application = Application::find($applicationid);
        if ($application == null) {
            $response = ["message" => 'no such application'];
            return response($response, 404);
        }


        $applicationChange = $this->appService->changeApplicationStatus($applicationid, $request['status'],$request->user()->id);

        return response($applicationChange, 200);;







    }

    /**
     * Return Current user Applications
     * @param Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function show(Request $request)
    {

        $applications = Application::where("user_id", $request->user()->id)->orderByDesc('created_at')->get();
        if ($applications == null) {
            $response = ["message" => 'no  applications for user '];
            return response($response, 404);
        }
        return $applications;

    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function showall(Request $request)
    {

        //Look For all
        $applications = Application::where("status", Application::STATUS["pending"])->orderByDesc('created_at')->get();
        if ($applications == null) {
            $response = ["message" => 'no  applications '];
            return response($response, 404);
        }
        foreach ($applications as $application) {
            /** @var  $applicant User */
            $applicant = User::findOrFail($application->user_id);

            $application["applicant"] = $applicant->lastName . " " . $applicant->firstName;
        }
        return $applications;

    }

}
