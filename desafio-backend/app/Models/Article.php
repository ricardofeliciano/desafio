<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Article extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'title',
        'description',
        'image',
        'user_id',
        'category_id',
        'tags'
    ];
    protected $table = 'tb_articles';
    protected $primaryKey = 'id';
    protected $with = [
        'tags',
        'category',
    ];
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'tb_article_tags', 'article_id', 'tag_id');
    }
    public function category()
    {
        return $this->belongsTo(Category::class,);
    }
}
