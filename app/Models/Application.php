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



}
