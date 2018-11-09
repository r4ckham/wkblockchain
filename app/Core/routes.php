<?php
/**
 * Routes - all standard routes are defined here.
 *
 * @author David Carr - dave@daveismyname.com
 *
 * @version 2.2
 * @date updated Sept 19, 2015
 */

/** Create alias for Router. */
use Core\Router;
use Helpers\Hooks;
use Helpers\Url;

/* Define routes. */
Router::any('', 'Controllers\Welcome@index');
Router::any('subpage', 'Controllers\Welcome@subPage');

Router::any(Url::URL_SEARCH, 'Controllers\Welcome@search');
Router::any(Url::URL_WRITE, 'Controllers\Welcome@insertBlock');
Router::any(Url::URL_VERIFY, 'controllers\Welcome@verifContrat');
Router::any(Url::URL_DASH_AJAX, 'controllers\Welcome@ajax');
Router::any(Url::URL_LOGOUT, 'controllers\Welcome@logOut');



/* Module routes. */
$hooks = Hooks::get();
$hooks->run('routes');

/* If no route found. */
Router::error('Core\Error@index');

/* Turn on old style routing. */
Router::$fallback = false;

/* Execute matched routes. */
Router::dispatch();
