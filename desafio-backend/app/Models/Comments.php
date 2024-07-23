<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    use HasFactory;
    use HasFactory;
    protected $fillable = [
        'id',
        'article_id',
        'content',       
    ];
    protected $table = 'tb_comments';
    protected $primaryKey = 'id';
}
