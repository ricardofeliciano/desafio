<?php

namespace App\Repositories\Article;

use App\Models\Article;
use App\Models\Article_Tag;
use Illuminate\Database\QueryException;

class ArticleRepository
{
    public function create(array $data)
    {
        try {
            return $article = Article::create($data);
            
             
        } catch (QueryException $e) {
            return response()->json(["msg" => 'Houve um erro', 'status' => false, 'erro_type' => $e], 400);
        }
    }

    public function deleteArticleTag(int $id_article)
    {
        try {
            Article_Tag::where('article_id',$id_article)->delete();
            return true;
        } catch (QueryException $e) {
            return false;
        }
    }
    public function createArticleTag(array $data)
    {
        try {
            Article_Tag::create($data);
            return true;
        } catch (QueryException $e) {
            return false;
        }
    }
    public function show(string $slug)
    {
        return Article::where('title', $slug)->first();
    }
    public function edit(int $id)
    {
       
        return Article::where('id', $id)->first();
    }
    public function update(array $data, int $id)
    {
        try {
          

            $article = Article::where('id', $id)->update($data);
            return response()->json(["msg" => 'Criado com sucesso', 'status' => true, 'data' => $article], 201);
        } catch (QueryException $e) {
            return response()->json(["msg" => 'Houve um erro', 'status' => false, 'erro_type' => $e], 400);
        }
    }
    public function list()
    {
        return Article::orderBy('id','desc')->get();
    }
    public function delete(int $id)
    {
        try {
            $article = Article::where('id', $id)->get();
           
            if (count($article) == 1) {
                Article::where('id', $id)->delete();
                return response()->json(["msg" => 'deletado com sucesso', 'status' => true, 'data' => $article], 201);
            }
            return response()->json(["msg" => 'Houve um erro', 'status' => true, 'data' => $article], 400);
        } catch (QueryException $e) {
            return response()->json(["msg" => 'Houve um erro', 'status' => false, 'erro_type' => $e], 400);
        }
    }
}
