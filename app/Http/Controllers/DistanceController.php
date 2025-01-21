<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DistanceController extends Controller
{
    public function calculate(Request $request): JsonResponse
    {
        $request->validate([
            'start_lat' => 'required|numeric',
            'start_lng' => 'required|numeric',
            'end_lat' => 'required|numeric',
            'end_lng' => 'required|numeric',
        ]);

        $distance = $this->calculateHaversineDistance(
            $request->start_lat,
            $request->start_lng,
            $request->end_lat,
            $request->end_lng
        );

        return response()->json([
            'distance' => $distance,
            'unit' => 'kilometers'
        ]);
    }

    private function calculateHaversineDistance(
        float $startLat,
        float $startLng,
        float $endLat,
        float $endLng
    ): float {
        $earthRadius = 6371;

        $latDelta = deg2rad($endLat - $startLat);
        $lngDelta = deg2rad($endLng - $startLng);

        $startLat = deg2rad($startLat);
        $endLat = deg2rad($endLat);

        $a = sin($latDelta / 2) * sin($latDelta / 2) +
            cos($startLat) * cos($endLat) *
            sin($lngDelta / 2) * sin($lngDelta / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        $distance = $earthRadius * $c;

        return round($distance, 2);
    }
}