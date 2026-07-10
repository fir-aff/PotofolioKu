<?php

use App\Http\Controllers\API\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/projects', [PortfolioController::class, 'projects']);
Route::get('/projects/{slug}', [PortfolioController::class, 'projectDetail']);
Route::get('/experiences', [PortfolioController::class, 'experiences']);
Route::get('/skills', [PortfolioController::class, 'skills']);
