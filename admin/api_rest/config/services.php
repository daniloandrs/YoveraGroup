<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
    ],

    'ses' => [
        'key' => env('SES_KEY'),
        'secret' => env('SES_SECRET'),
        'region' => 'us-east-1',
    ],

    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET'),
    ],

    'stripe' => [
        'model' => App\User::class,
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],

    'firebase' => [
        'api_key' => 'AIzaSyA38HKqkIOqgFO2gjWFjVJzvNWo-SNjJzI',
        'auth_domain' => 'api-notifications-7f6eb.firebaseapp.com',
        'database_url' => 'https://api-notifications-7f6eb.firebaseio.com',
        'secret' => 'P1m3tim6h4hE7AWcIVtTxqVJ6Dg7FqAFNG6cS0KY',
        'storage_bucket' => '',
    ],

];
