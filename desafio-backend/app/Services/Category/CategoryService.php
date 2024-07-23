<?php

namespace App\Services\Category;

use App\Repositories\Category\CategoryRepository;


class CategoryService
{
    protected $categoryRepository;


    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository; 
    }

    public function create(object $data){
      
        $arr = ([
            'title' => $data->title         
        ]);
      
        $article = $this->categoryRepository->create($arr);
        return $article;
    }
    public function show(string $slug){
        $article = $this->categoryRepository->show($slug);
        return $article;
    }
    public function edit(int $id){
        $article = $this->categoryRepository->edit($id);
        return $article;
    }
    public function update(object $data, int $id){
        $arr = ([
            'title' => $data->title           
        ]); 
        $article = $this->categoryRepository->update($arr,$id);
        return $article;
    }

    public function list(){
        $article = $this->categoryRepository->list();
        return $article;
    }
    public function delete(int $id){
        $article = $this->categoryRepository->delete($id);
        return $article;
    }
}
