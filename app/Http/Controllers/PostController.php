<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $posts = Post::all();
        return Inertia::render('Posts', [
            'posts' => $posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'body' => substr($post->body, 0, 20).'...',
                    'cover' => Storage::url($post->cover),
                    'creted_at' => $post->created_at->diffForHumans(),
                    'edit_url' => route('posts.edit', $post->id),
                ];
            }),
            'create_url' => route('posts.create')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'body' => 'required',
            'cover' => 'required|mimes:png,jpg',
        ]);

        $dir_path = date('Y').'/'.date('m').'/';
        if($request->hasFile('cover')) {
            $cover = $request->file('cover');
        }

        Post::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'body' => $request->body,
            'cover' => $cover->storeAs($dir_path . 'cover', rand() . '.' . $cover->extension(), 'public') ?? null,
        ]);

        return redirect()->route('posts.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  string $slug
     * @return \Inertia\Response
     */
    public function show($slug)
    {
        $post = Post::where('slug', $slug)->first();
        return Inertia::render('View', [
            'post' => [
                'title' => $post->title,
                'body' => $post->body,
                'cover' => Storage::url($post->cover),
                'creted_at' => $post->created_at->diffForHumans(),
                'edit_url' => route('posts.edit', $post->id),
                'delete_url' => route('posts.destroy', $post->id),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        $post = Post::findOrFail($id);
        return Inertia::render('Edit', [
            'id' => $post->id,
            'name' => $post->title,
            'body' => $post->body,
            'cover' => Storage::url($post->cover)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title' => 'required',
            'body' => 'required',
            'cover' => 'exclude_unless:cover, false|image|mimes:png,jpg'
        ]);

        $post = Post::findOrFail($id);
        
        if($request->hasFile('cover')) {
            $cover = $request->file('cover');
            $dir_path = date('Y').'/'.date('m').'/';
        }
        $post->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'body' => $request->body,
            'cover' => isset($cover) ? $cover->storeAs($dir_path . 'cover', rand() . '.' . $cover->extension(), 'public') : $post->cover,
        ]);

        return redirect()->route('posts.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        Storage::disk('public')->delete($post->cover);
        $post->delete();
        return redirect()->route('posts.index');
    }
}
