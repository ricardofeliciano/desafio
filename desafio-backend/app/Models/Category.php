<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'title',        
    ];
    protected $table = 'tb_category';
    protected $primaryKey = 'id';
    public function articles()
    {
        return $this->hasMany(Article::class,'category_id');
    }
}
