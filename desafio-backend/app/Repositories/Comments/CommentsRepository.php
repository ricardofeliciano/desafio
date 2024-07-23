<?php

namespace App\Repositories\Comments;

use App\Models\Comments;
use Illuminate\Database\QueryException;

class CommentsRepository
{
    public function create(array $data)
    {
        try {
            $Comments = Comments::create($data);
            return response()->json(["msg" => 'Criado com sucesso', 'status' => true, 'data' => $Comments], 201);
        } catch (QueryException $e) {
            return response()->json(["msg" => 'Houve um erro', 'status' => false, 'erro_type' => $e], 400);
        }
    }

    public function show(int $id)
    {
        return Comments::where('article_id', $id)->get();
    }
    public function update(array $data, int $id)
    {
        try {
            $Comments = Comments::where('id', $id)->update($data);
            return response()->json(["msg" => 'Criado com sucesso', 'status' => true, 'data' => $Comments], 201);
        } catch (QueryException $e) {
            return response()->json(["msg" => 'Houve um erro', 'status' => false, 'erro_type' => $e], 400);
        }
    }
    public function list()
    {
        return Comments::get();
    }
    public function delete(int $id)
    {
        try {
            $Comments = Comments::where('id', $id)->get();
            if (count($Comments) == 1) {
                Comments::where('id', $id)->delete();
                return response()->json(["msg" => 'deletado com sucesso', 'status' => true, 'data' => $Comments], 201);
            }
            return response()->json(["msg" => 'Houve um erro', 'status' => true, 'data' => $Comments], 400);
        } catch (QueryException $e) {
            return response()->json(["msg" => 'Houve um erro', 'status' => false, 'erro_type' => $e], 400);
        }
    }
}
