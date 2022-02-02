<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;
    const STATUS = ["pending","approved","rejected"];
    protected $fillable = [
        "start",
        "end",
        "status",
        "reason",
    ];

    public function applicant()
    {
        return $this->belongsTo(User::class);
    }



}
