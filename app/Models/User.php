<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    const USER_TYPE = ["admin", "employee"];
    const USER_TYPES = ["admin" => "admin", "employee" => "employee"];
    const total_days = 20;
    const total_days_taken = 0;
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'password',
        'type',

    ];
    protected $attributes=[
        'total_days'=>self::total_days,
        'total_days_taken'=>self::total_days_taken
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    function isAdmin()
    {
        if ($this->type == self::USER_TYPES["admin"]) {
            return true;
        } else {
            return false;
        }

    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }


    public function hasEnoughDaysLeft($daysRequested): bool
    {

        if (($this->total_days - $this->total_days_taken) - $daysRequested >= 0) {
            return true;
        } else {
            return false;
        }
    }

    public function daysLeft(){
        return ($this->total_days - $this->total_days_taken);
    }

    public function increaseDaysTaken($daysRequested)
    {
            $this->total_days_taken = $this->total_days_taken + $daysRequested;
    }


    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }


}
