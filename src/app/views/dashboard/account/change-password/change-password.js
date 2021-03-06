angular.module( 'App.Views' ).config( function( $stateProvider, $urlRouterProvider )
{
	$urlRouterProvider.when( '/dashboard/profile/change-password', '/dashboard/change-password' );

	$stateProvider.state( 'dashboard.account.change-password', {
		url: '/change-password',
		controller: 'Dashboard.Account.ChangePasswordCtrl',
		controllerAs: 'changePasswordCtrl',
		templateUrl: '/app/views/dashboard/account/change-password/change-password.html',
	} );
} );
