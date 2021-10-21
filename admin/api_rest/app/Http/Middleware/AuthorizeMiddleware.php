<?php

namespace App\Http\Middleware;

use Closure;
use App\AuthModel\Session;

class AuthorizeMiddleware
{

    public function handle($request, Closure $next)
    {   
        $token = $request->get('token');
        if (empty($token)) $token = $request->bearerToken();
        $session = Session::where('token',$token)->first();
        return is_null($session) ? messageJson('session no válida',false) : $next($request);
    }
   
}
   