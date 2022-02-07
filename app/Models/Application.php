<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    const STATUS = [
        "pending" => "pending",
        "approved" => "approved",
        "rejected" => "rejected"
    ];

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


    static function calculate_days($startDate, $endDate)
    {
        $startDate = date_create($startDate);
        $endDate = date_create($endDate);

        $isWeekday = function (\DateTime $date) {
            return $date->format('N') < 6;
        };

        $days = $isWeekday($endDate) ? 1 : 0;

        while ($startDate->diff($endDate)->days > 0) {
            $days += $isWeekday($startDate) ? 1 : 0;
            $startDate = $startDate->add(new \DateInterval("P1D"));
        }

        return $days;
    }


}
