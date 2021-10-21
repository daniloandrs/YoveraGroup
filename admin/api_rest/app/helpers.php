<?php


    //simple respuesta en formato json, al frontend
    function messageJson($mensaje,$success)
    {
        return response()->json(
            [
                'message'   => $mensaje,
                'success'   => $success
            ]
        );
    }

    //respuesta con data (peticion de datos)
    function infoJson($data,$success)
    {
        return response()->json(
            [
                'json'      => $data,
                'success'   => $success
            ]
        );
    }


    //solo para la autenticacion
    function infoAuth($data,$access)
    {
        return response()->json(
            [
                'info'     => $data,
                'access'   => $access
            ]
        );
    }

