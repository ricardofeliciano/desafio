<?php
function upload(object $image, string $path,string $type)
{

    if ($image->hasFile($type)) {
        $image = $image->file($type);
        $imageName = time() . '_' . $image->getClientOriginalName();
        $image->move(public_path('uploads/' . $path), $imageName);
        $imageUrl = asset('uploads/' . $path . $imageName);
        $url = '/uploads/' . $path . '/' . $imageName;
        return $url;
    }
}