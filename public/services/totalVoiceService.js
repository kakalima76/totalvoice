
(function(){
	angular.module('app')

	.service('totalVoiceService', ['$http', '$window', function($http, $window){

		var enviar = function(telefone){

		var config = {
			headers: 
				{
					"Content-Type":" application/json",
					"Accept": "application/json",		
					"Access-Token": "4a1b44a04aa7b18c7fc5598530d8dfa2"	
		 		}
		}

 		var obj = {"numero_destino": telefone.toString(),"nome_produto":"autorizado","tamanho":"","tts":false};
		
			return $http.post('https://api2.totalvoice.com.br/verificacao', obj, config);
			
		}

		var testar = function(id, pin){
			
			var config = {
			headers: 
				{
					"Content-Type":" application/json",
					"Accept": "application/json",		
					"Access-Token": "4a1b44a04aa7b18c7fc5598530d8dfa2"	
		 		}
		}

			return $http.get('https://api2.totalvoice.com.br/verificacao/?id=' + id + '&pin=' + pin, config);
			
		}

		return {
			enviar: enviar,
			testar: testar
		}

	}]);

})();