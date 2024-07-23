<?php

namespace App\Http\Controllers\Comments;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Comments\CommentsService;

class CommentsController extends Controller
{
   
    protected $commentsService;

    public function __construct(CommentsService $commentsService)
    {
        $this->commentsService = $commentsService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->commentsService->list();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function list()
    {
        return $this->commentsService->list();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
           return $this->commentsService->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        return $this->commentsService->show($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        
        return $this->commentsService->update($request,$id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        return $this->commentsService->delete($id);
    }
}
