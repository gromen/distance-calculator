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
            'startLat' => 'required|numeric',
            'startLng' => 'required|numeric',
            'endLat' => 'required|numeric',
            'endLng' => 'required|numeric',
        ]);

        $distance = $this->calculator->calculate(
            $request->startLat,
            $request->startLng,
            $request->endLat,
            $request->endLng
        );

        return response()->json($distance);
    }
}   