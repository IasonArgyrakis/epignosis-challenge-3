<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;
    const STATUS = ["pending","approved","rejected"];
    const OUTCOMES = ["rejected","approved"];
    protected $fillable = [
        "start",
        "end",
        "status",
        "reason",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

//    static function calculate_dayss($date_1 , $date_2 , $differenceFormat = '%a' ): int
//    {
//        $datetime1 = date_create($date_1);
//        $datetime2 = date_create($date_2);
//
//
//
//        $interval = date_diff($datetime1, $datetime2);
//
//        return (int)$interval->format($differenceFormat);
//
//    }

    static  function calculate_days( $startDate,  $endDate)
    {
        $startDate = date_create($startDate);
        $endDate = date_create($endDate);

        $isWeekday = function (\DateTime $date) {
            return $date->format('N') < 6;
        };

        $days = $isWeekday($endDate) ? 1 : 0;

        while($startDate->diff($endDate)->days > 0) {
            $days += $isWeekday($startDate) ? 1 : 0;
            $startDate = $startDate->add(new \DateInterval("P1D"));
        }

        return $days;
    }


}
