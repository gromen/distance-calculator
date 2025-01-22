<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DistanceController;

Route::post('/calculate-distance', [DistanceController::class, 'calculate']);