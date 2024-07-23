<?php

namespace App\Repositories\Category;

use App\Models\Category;
use Illuminate\Database\QueryException;

class CategoryRepository
{
    public function create(array $data)
    {
        try {
            $Category = Category::create($data);
            return response()->json(["msg" => 'Criado com sucesso', 'status' => true, 'data' => $Category], 201);
        } catch (QueryException $e) {
            return response()->json(["msg" => 'Houve um erro', 'status' => false, 'erro_type' => $e], 400);
        }
    }

    public function show(string $slug)
    {
        return Category::where('title', $slug)->first();
    }
    public function edit(int $id)
    {
        return Category::where('id', $id)->first();
    }
    public function update(array $data, int $id)
    {
        try {
            $Category = Category::where('id', $id)->update($data);
            return response()->json(["msg" => 'Criado com sucesso', 'status' => true, 'data' => $Category], 201);
        } catch (QueryException $e) {
            return response()->json(["msg" => 'Houve um erro', 'status' => false, 'erro_type' => $e], 400);
        }
    }
    public function list()
    {
        return Category::orderBy('id','desc')->get();
    }
    public function delete(int $id)
    {
        try {
            $Category = Category::where('id', $id)->get();
           
            if (count($Category) == 1) {
                Category::where('id', $id)->delete();
                return response()->json(["msg" => 'deletado com sucesso', 'status' => true, 'data' => $Category], 201);
            }
            return response()->json(["msg" => 'Houve um erro', 'status' => true, 'data' => $Category], 400);
        } catch (QueryException $e) {
            return response()->json(["msg" => 'Houve um erro', 'status' => false, 'erro_type' => $e], 400);
        }
    }
}
