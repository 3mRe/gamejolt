angular.module( 'App.Views' ).config( function( $stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider )
{
	$urlMatcherFactoryProvider.type( 'gamesSection', {
		pattern: /featured|new|fresh|hot|best|worst|by\-date/
	} );

	$urlMatcherFactoryProvider.type( 'gamesCategory', {
		pattern: /arcade|action|adventure|rpg|strategy-sim|platformer|shooter|puzzle|sports|other/
	} );

	// Redirect old category URLs to new.
	$urlRouterProvider.when( '/games/{category:gamesCategory}', '/games/best/:category' );

	var subStates = {
		'section': '/{section:gamesSection}',
		'section-category': '/{section:gamesSection}/{category:gamesCategory}',
		'section-date': '/{section:gamesSection}/{date}',
	};

	angular.forEach( subStates, function( url, state )
	{
		$stateProvider.state( 'discover.games.list.' + state, {
			url: url + '?price&os&browser&maturity&status&page&query',
			controller: 'Discover.Games.List.CategoryCtrl',
			controllerAs: 'categoryCtrl',
			templateUrl: '/app/views/discover/games/list/category/category.html',
			resolve: {
				payload: function( $stateParams, Api, History_Cache, filteringContainer )
				{
					return filteringContainer.init( 'discover.games.list.' + state, $stateParams )
						.then( function()
						{
							return History_Cache.cache( function()
							{
								return Api.sendRequest( '/web/discover/games?' + filteringContainer.getQueryString( $stateParams ) );
							} );
						} );
				}
			}
		} );
	} );
} );
