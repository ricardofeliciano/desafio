<?php

namespace App\Services\Tag;

use App\Repositories\Tag\TagRepository;


class TagService
{
    protected $tagRepository;


    public function __construct(TagRepository $tagRepository)
    {
        $this->tagRepository = $tagRepository; 
    }

    public function create(object $data){
      
        $arr = ([
            'title' => $data->title         
        ]);
      
        $article = $this->tagRepository->create($arr);
        return $article;
    }
    public function show(string $slug){
        $article = $this->tagRepository->show($slug);
        return $article;
    }
    public function edit(int $id){
        $article = $this->tagRepository->edit($id);
        return $article;
    }
    public function update(object $data, int $id){
        $arr = ([
            'title' => $data->title           
        ]); 
        $article = $this->tagRepository->update($arr,$id);
        return $article;
    }

    public function list(){
        $article = $this->tagRepository->list();
        return $article;
    }
    public function delete(int $id){
        $article = $this->tagRepository->delete($id);
        return $article;
    }
}
