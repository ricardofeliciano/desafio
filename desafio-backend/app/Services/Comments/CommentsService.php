<?php

namespace App\Services\Comments;

use App\Repositories\Comments\CommentsRepository;


class CommentsService
{
    protected $commentsRepository;


    public function __construct(CommentsRepository $commentsRepository)
    {
        $this->commentsRepository = $commentsRepository;
    }

    public function create(object $data)
    {

        $data = $data->all();
        $comments = $this->commentsRepository->create($data);
        return $comments;
    }   
    public function show(int $id)
    {
        $comments = $this->commentsRepository->show($id);
        return $comments;
    }
    public function update(object $data, int $id)
    {
        $data = $data->all();
        $comments = $this->commentsRepository->update($data, $id);
        return $comments;
    }

    public function list()
    {
        $comments = $this->commentsRepository->list();
        return $comments;
    }
    public function delete(int $id)
    {
        $comments = $this->commentsRepository->delete($id);
        return $comments;
    }
}
