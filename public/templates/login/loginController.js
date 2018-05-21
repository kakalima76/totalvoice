angular.module('app')
.controller('loginController', ['$window', 'totalVoiceService', '$scope', function($window, totalVoiceService, $scope){
	var vm = this;
	vm.esconder = false;
	vm.labelLeia = "Leia antes de prosseguir";
	vm.mostrarSegundaParte = true;
	vm.mostrarProsseguir = false;
	vm.mostrarLeia = true;
	vm.texto = "Ao prosseguir, autorizo meu cadastro na lista de pessoas que apoiam politicamente o Sindicato de barraqueiros de Praia do munícipio do Rio de Janeiro."
	
	vm.filtroTipo = [
	{tipo: "proprietário"},
	{tipo: "empregado"},
	{tipo: "familiar"},
	{tipo: "cliente"},
	{tipo: "vizinho"},
	{tipo: "amigo"},
	]

	vm.id;


	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	var aviso = function(){
		$window.alert("Foi enviado um código sms de confirmação para o seu celular");
	}

	vm.logar = function(){

	}

	vm.prosseguir = function (){
		

		if(vm.labelLeia === "Pressione para proseguir"){
			vm.mostrarLeia = false;
			vm.mostrarProsseguir = true;
		}


		vm.labelLeia = "Pressione para proseguir";

	}

	//agregado ao ngBlur, assim que o campo é preenchido é enviado o código 
	//para o número informado
	vm.enviarSMS = function(telefone){

		if(telefone.toString().length === 11)
			if(!isEmpty(telefone)){

				var ddd = telefone.toString().substring(0,2);

				if(ddd !== "21" && ddd !==  "22" && ddd !== "24"){

					$window.alert("Informe um DDD do Estado do Rio de Janeiro.");
					vm.seguidor.telefone = "";

				}else{
					
			
					var promise =  totalVoiceService.enviar(telefone);
					promise

					.then(function(data){
					vm.id = data.data.dados.id
					aviso();
					})

					.catch(function(err){
					console.log(err);
					})
				}

			}else{
				$window.alert("Informe um número de telefone.");
			}
		else{
			$window.alert("Número de telefone inválido.");
			vm.seguidor.telefone = "";
		}

	}



	vm.send = function(){

		if(isEmpty(vm.id) || isEmpty(vm.seguidor.codigo)){
			console.log('1 ' + vm.id);
			console.log(vm.seguidor.codigo);
			$window.alert("Informe um código de confirmação!");
		}else{
			var promise = totalVoiceService.testar(vm.id, vm.seguidor.codigo);
			promise
				.then(function(data){
					
					vm.esconder = true;
					vm.mostrarSegundaParte = false;
										
				})

				.catch(function(err){
					
					$window.alert("Código inválido.");
					vm.seguidor.codigo = "";
					
				})
		}

		


	}

	vm.aviso = function(){
		$window.alert("cu");
	}



}])