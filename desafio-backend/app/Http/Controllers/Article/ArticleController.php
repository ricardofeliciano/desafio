<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Article\ArticleService;
use App\Services\Category\CategoryService;
use App\Services\Tag\TagService;
class ArticleController extends Controller
{
    protected $articeService;
    protected $tagService;
    protected $categoryService;

    public function __construct(ArticleService $articeService,
    CategoryService $categoryService,
    TagService $tagService)
    {
        $this->articeService = $articeService;
        $this->tagService = $tagService;
        $this->categoryService = $categoryService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->articeService->list();
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
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image',
        ]);
        
        return $this->articeService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        return $this->articeService->show($slug);
    }
      /**
     * Display the specified resource.
     */
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        
        
         return response()->json(['data' =>  $this->articeService->edit($id), 'tags' =>$this->tagService->list(), 'category' => $this->categoryService->list()]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
         $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image',
        ]);
        return $this->articeService->update($request,$id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        return $this->articeService->delete($id);
    }
}
