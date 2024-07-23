<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article_Tag extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'article_id',        
        'tag_id',        
    ];
    protected $table = 'tb_article_tags';
    protected $primaryKey = 'id';
}
