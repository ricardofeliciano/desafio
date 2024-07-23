<?php

namespace App\Services\Article;

use App\Repositories\Article\ArticleRepository;
use App\Models\Article;


class ArticleService
{
    protected $articleRepository;


    public function __construct(ArticleRepository $articleRepository)
    {
        $this->articleRepository = $articleRepository;
    }

    public function create(object $data)
    {

        $arr = [
            'title' => $data->title,
            'description' => $data->description,
            'user_id' => 1,
            'category_id' => $data->category_id,
            'image' => upload($data, 'articles', 'image'),
        ];

        $article = $this->articleRepository->create($arr);      
        if (!empty($data->tags)) {            
            $tags = explode(',', $data->tags);
            $tags = array_filter($tags, 'is_numeric');
            foreach ($tags as $item) {
                $arr2 = [
                    'article_id' => $article->id,
                    'tag_id' => $item,
                ];

                $this->articleRepository->createArticleTag($arr2);
            }
        }

        return response()->json(["msg" => 'Criado com sucesso', 'status' => true, 'data' => $article], 201);;
    }
    public function show(string $slug)
    {
        $article = $this->articleRepository->show($slug);
        return $article;
    }
    public function edit(int $id)
    {
        $article = $this->articleRepository->edit($id);
        return $article;
    }
    public function update(object $data, int $id)
    {
        $arr = [
            'title' => $data->title,
            'description' => $data->description,
            'user_id' => 1,
            'category_id' => $data->category_id,
            'image' => upload($data, 'articles', 'image'),
        ];





        if (!empty($data->tags)) {
            $this->articleRepository->deleteArticleTag($id);
            $tags = explode(',', $data->tags);
            $tags = array_filter($tags, 'is_numeric');


            foreach ($tags as $item) {
                $arr2 = [
                    'article_id' => $id,
                    'tag_id' => $item,
                ];

                $this->articleRepository->createArticleTag($arr2);
            }


        }


        return $this->articleRepository->update($arr, $id);
    }

    public function list()
    {
        $article = $this->articleRepository->list();
        return $article;
    }
    public function delete(int $id)
    {
        $article = $this->articleRepository->delete($id);
        return $article;
    }
}
