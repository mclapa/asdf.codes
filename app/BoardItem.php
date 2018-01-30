<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BoardItem extends Model
{
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'board_id',
        'name',
        'public_key',
        'media_id',
        'receiving_address',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'deleted_at', 'updated_at'
    ];

    public function media()
    {
        return $this->hasOne('App\Media', 'id', 'media_id');
    }

    public function board()
    {
        return $this->belongsTo('App\Board', 'board_id', 'id');
    }

}
