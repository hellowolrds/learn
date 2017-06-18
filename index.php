<?php
//   error_reporting(0);
  $pathStr = $_SERVER['PATH_INFO'];

  $pathStr = substr($pathStr, 1);

  $pathinfo = explode('/', $pathStr);
  $folder = $pathinfo[ 0 ];
  $filename = $pathinfo[ 1 ];
  
  if (count($pathinfo) == 1) {
     if ( !$folder ) {
         $folder = 'index';
         $filename = 'index';
     }
     else {
         $filename = $folder;
         $folder = 'index';
     }
  }

include './views/' . $folder . '/' . $filename . '.html';

?>