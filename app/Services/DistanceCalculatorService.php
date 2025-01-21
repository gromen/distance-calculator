<?php

namespace App\Services;

class DistanceCalculatorService
{
    // Promień Ziemi w metrach
    private const EARTH_RADIUS = 6371000;

    public function calculate(float $lat1, float $lon1, float $lat2, float $lon2): array
    {
        $lat1 = deg2rad($lat1);
        $lon1 = deg2rad($lon1);
        $lat2 = deg2rad($lat2);
        $lon2 = deg2rad($lon2);

        $deltaLat = $lat2 - $lat1;
        $deltaLon = $lon2 - $lon1;

        // Wzór Haversine
        $a = sin($deltaLat/2) * sin($deltaLat/2) +
             cos($lat1) * cos($lat2) * 
             sin($deltaLon/2) * sin($deltaLon/2);
        
        $c = 2 * atan2(sqrt($a), sqrt(1-$a));

        $distanceInMeters = self::EARTH_RADIUS * $c;

        return [
            'meters' => round($distanceInMeters),
            'kilometers' => round($distanceInMeters / 1000, 2)
        ];
    }
}