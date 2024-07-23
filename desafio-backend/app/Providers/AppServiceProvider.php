<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Auth\AuthService;
use App\Repositories\User\UserRepository;
use Laravel\Passport\TokenRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(UserRepository::class, function ($app) {
            return new UserRepository();
        });

        $this->app->singleton(AuthService::class, function ($app) {
            return new AuthService(
                $app->make(UserRepository::class),
                $app->make(TokenRepository::class)
            );
        });
    
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
