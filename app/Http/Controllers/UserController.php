<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index() {
        $users = User::paginate(10);

        return Inertia::render('User/Index', [
            'users' => $users
        ]);
    }

    public function create() {
        return Inertia::render('User/Create');
    }

    public function store(Request $request) {
        $request->validate([
            'name'  => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'confirm_password' => 'required|same:password',
            'role' => 'required'
        ]);

        User::create($request->all());
        return redirect()->route('users');
    }

    public function edit($userId) {
        $user = User::find($userId);

        return Inertia::render('User/Edit', [
            'user'  => $user
        ]);
    }

    public function update(Request $request, $userId)
    {
        $user = User::find($userId);
        
        $request->validate([
            'name'  => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'confirm_password' => 'required|same:password',
            'role' => 'required'
        ]);

        $user->update($request->all());
        return redirect()->route('users');
    }
}
