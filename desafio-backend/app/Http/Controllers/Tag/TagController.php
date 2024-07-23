<?php

namespace App\Http\Controllers\Tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Tag\TagService;
class TagController extends Controller
{
    protected $tagService;

    public function __construct(TagService $tagService)
    {
        $this->tagService = $tagService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->tagService->list();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255'            
        ]);
        
        return $this->tagService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        return $this->tagService->show($slug);
    }
      /**
     * Display the specified resource.
     */
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        return $this->tagService->edit($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
         $request->validate([
            'title' => 'required|string|max:255'
        ]);
        return $this->tagService->update($request,$id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        return $this->tagService->delete($id);
    }
}
