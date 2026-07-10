<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Experience;
use App\Models\Skill;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    /**
     * Display a listing of projects.
     * Supports filtering by category and is_featured status.
     */
    public function projects(Request $request)
    {
        $query = Project::query();

        if ($request->has('category') && $request->query('category') !== '') {
            $query->where('category', $request->query('category'));
        }

        if ($request->has('featured')) {
            $featured = filter_var($request->query('featured'), FILTER_VALIDATE_BOOLEAN);
            $query->where('is_featured', $featured);
        }

        $projects = $query->orderBy('is_featured', 'desc')
                          ->orderBy('created_at', 'desc')
                          ->get();

        return response()->json($projects);
    }

    /**
     * Display the specified project detail.
     */
    public function projectDetail($slug)
    {
        $project = Project::where('slug', $slug)->first();

        if (!$project) {
            return response()->json([
                'message' => 'Project not found'
            ], 404);
        }

        return response()->json($project);
    }

    /**
     * Display a listing of experiences ordered by newest first.
     */
    public function experiences()
    {
        $experiences = Experience::orderBy('start_date', 'desc')
                                 ->orderBy('end_date', 'desc')
                                 ->get();

        return response()->json($experiences);
    }

    /**
     * Display a listing of skills.
     */
    public function skills()
    {
        $skills = Skill::orderBy('category')
                       ->orderBy('name')
                       ->get();

        return response()->json($skills);
    }
}
