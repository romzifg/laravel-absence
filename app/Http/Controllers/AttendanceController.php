<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function submit(Request $request)
    {
        $request->validate([
            'status'    => 'required',
            'description'   => 'required_if:status,sick,leave,permit,business_trip,remote|max:500',
            'latitude'    => 'required',
            'longitude'    => 'required',
        ]);

        $attendance = Attendance::create([
            'user_id'       => auth()->id(),
            'status'        => $request->status,
            'description'   => $request->description,
            'address'       => 'test',
            'clock_in'      => date("Y-m-d h:m:s"),
            'latitude'      => $request->latitude,
            'longitude'     => $request->longitude,
        ]);

        return response()->json($attendance, 201);
    }
}
