<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    // use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'slug',
        'lock_code',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'deleted_at', 'updated_at'
    ];

    public function boardItems()
    {
        return $this->hasMany('App\BoardItem');
    }
}
