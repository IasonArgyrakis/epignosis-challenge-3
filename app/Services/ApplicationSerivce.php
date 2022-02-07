<?php

namespace App\Services;

use App\Mail\NotifyAdmin;
use App\Mail\NotifyUser;
use App\Models\Application;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class ApplicationSerivce
{

    function saveNewApplication(User $user,$application){


        $days_requested=Application::calculate_days($application["start"],$application["end"]);
        $outcome=$user->hasEnoughDaysLeft($days_requested);


        /** @var User $user */
        if( $outcome){

            $application=$user->applications()->create($application);


            $admin=User::where("type","admin")->first();

            $applicant= User::findOrFail($application->user_id);
            $application->applicant = $applicant->lastName." ".$applicant->firstName;

            Mail::to($admin)->send(new NotifyAdmin($application,$admin->id));
            return $application;

        }
        else {
            return response(['errors' => "Not enough days left","days_requested"=>$days_requested,"days_left"=>$user->daysLeft()], 200);
        }
    }

    function changeApplicationStatus($applicationid,$outcome,$approverid): string
    {
        $application=Application::where(["id"=>$applicationid,"status"=>"pending"])->first();
        if($application===NULL){
            return "<h3>Invalid Link</h3>";
        }

        $application->status=Application::STATUS[$outcome];
        $application->approver_id=$approverid;

        $application->save();

        if($application->status==Application::STATUS["approved"]){
            $days_requested=Application::calculate_days($application["start"],$application["end"]);
            $application->user->increaseDaysTaken($days_requested);
            $application->user->save();
        }

        Mail::to($application->user->email)->send(new NotifyUser($application));
        return "<h3>Application  was  $application->status </h3>";

    }

}
