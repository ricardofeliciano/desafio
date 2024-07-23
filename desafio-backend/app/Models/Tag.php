<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Article;

class Tag extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'title',        
    ];
    protected $table = 'tb_tags';
    protected $primaryKey = 'id';
   
    public function articles()
    {
        return $this->belongsToMany(Article::class, 'tb_article_tag', 'tag_id', 'article_id');
    }
}
