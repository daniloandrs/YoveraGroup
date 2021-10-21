<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    
    protected $namespace = 'App\Http\Controllers';

    public function boot()
    {
        parent::boot();
    }

    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();

        $this->mapAuthRoutes();

        $this->mapSystemRoutes();

        $this->mapPagesRoutes();
        
    }

    protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));
    }

    protected function mapApiRoutes()
    {
        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->namespace)
             ->group(base_path('routes/api.php'));
    }

    protected function mapAuthRoutes()
    {
        $namespace_auth = 'App\Http\Controllers\Auth';
        Route::prefix('api')
            ->middleware('api')
            ->namespace($namespace_auth)
            ->group(base_path('routes/auth.php'));
    }

    protected function mapSystemRoutes()
    {
        $namespace_system = 'App\Http\Controllers\System';
        Route::prefix('api')
            ->middleware('api')
            ->namespace($namespace_system)
            ->group(base_path('routes/system.php'));
    }


    protected function mapPagesRoutes()
    {
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(base_path('routes/page.php'));
    }
}
