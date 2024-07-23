<?php

namespace App\Repositories\Tag;

use App\Models\Tag;
use Illuminate\Database\QueryException;

class TagRepository
{
    public function create(array $data)
    {
        try {
            $Tag = Tag::create($data);
            return response()->json(["msg" => 'Criado com sucesso', 'status' => true, 'data' => $Tag], 201);
        } catch (QueryException $e) {
            return response()->json(["msg" => 'Houve um erro', 'status' => false, 'erro_type' => $e], 400);
        }
    }

    public function show(string $slug)
    {
        return Tag::where('title', $slug)->first();
    }
    public function edit(int $id)
    {
        return Tag::where('id', $id)->first();
    }
    public function update(array $data, int $id)
    {
        try {
            $Tag = Tag::where('id', $id)->update($data);
            return response()->json(["msg" => 'Criado com sucesso', 'status' => true, 'data' => $Tag], 201);
        } catch (QueryException $e) {
            return response()->json(["msg" => 'Houve um erro', 'status' => false, 'erro_type' => $e], 400);
        }
    }
    public function list()
    {
        return Tag::orderBy('id','desc')->get();
    }
    public function delete(int $id)
    {
        try {
            $Tag = Tag::where('id', $id)->get();
           
            if (count($Tag) == 1) {
                Tag::where('id', $id)->delete();
                return response()->json(["msg" => 'deletado com sucesso', 'status' => true, 'data' => $Tag], 201);
            }
            return response()->json(["msg" => 'Houve um erro', 'status' => true, 'data' => $Tag], 400);
        } catch (QueryException $e) {
            return response()->json(["msg" => 'Houve um erro', 'status' => false, 'erro_type' => $e], 400);
        }
    }
}
