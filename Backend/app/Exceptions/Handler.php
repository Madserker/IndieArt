<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Tymon\JWTAuth\Exception\TokenExpiredException;
use Tymon\JWTAuth\Exception\TokenInvalidException;
use Response;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        if($exception instanceof TokenExpiredException){//token expired
            return Response::json([
                'error' => 'Token expired'
            ], $exception->getStatusCode());
        }else if($exception instanceof TokenInvalidException){//invalid token
            return Response::json([
                'error' => 'Token invalid'
            ], $exception->getStatusCode());
        }else if($exception instanceof JWTException){//generic jwt exception
            return Response::json([
                'error' => 'Error fetching token'
            ], $exception->getStatusCode());
        }
        parent::report($exception);//default error
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        return parent::render($request, $exception);
    }
}
