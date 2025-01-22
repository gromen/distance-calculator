<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\DistanceCalculatorService;

class DistanceController extends Controller
{
    public function __construct(
        private DistanceCalculatorService $calculator
    ) {}

    public function calculate(Request $request): JsonResponse
    {
        $request->validate([
            'start_lat' => 'required|numeric',
            'start_lng' => 'required|numeric',
            'end_lat' => 'required|numeric',
            'end_lng' => 'required|numeric',
        ]);

        $distance = $this->calculator->calculate(
            $request->start_lat,
            $request->start_lng,
            $request->end_lat,
            $request->end_lng
        );

        return response()->json($distance);
    }
}