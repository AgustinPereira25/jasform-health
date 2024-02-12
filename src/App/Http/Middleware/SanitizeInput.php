<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SanitizeInput
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next): Response
    {
        \Log::info('SanitizeInput middleware applied');
        \Log::info('SanitizeInput middleware applied - request: ' . json_encode($request->all()));
        \Log::info('SanitizeInput middleware applied - next: ' . json_encode($next));

        $input = $request->all();

        array_walk_recursive($input, function (&$input) {
            $input = strip_tags($input); // Remove HTML tags
            $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8'); // Convert special characters to HTML entities
        });

        $request->merge($input);

        return $next($request);
    }
}
