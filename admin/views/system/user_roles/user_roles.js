
const UserRolesCtrl = (scope, link, swal) => {

    var model = '\\App\\AuthModel\\Rol';

    scope.objectModel = {};

    scope.forms = {

        rol : null  
    };

    scope.clear = () => {

        scope.objectModel = {};

        scope.spin_form = false;

        scope.forms.rol.$setPristine();
    };


    let Roles = async () => {

        let api = await link.get_crud(model);

        scope.listData = api.data.success ? api.data.json : [];

    };

    scope.openModalAdd = () => {
   
        scope.clear();

        scope.titleModal = 'Nuevo Rol';

        scope.titleButton = 'Guardar';

        scope.create_opcion = true;

        swal.openModal('general-modal');

    };

    scope.editItem = (item) => {

        scope.clear();

        scope.objectModel = angular.copy(item);
      
        scope.titleModal = 'Editar Rol';

        scope.titleButton = 'Actualizar';

        scope.create_opcion = false;

        swal.openModal('general-modal');

    };

    let PostSend = async (response) => {
        
        if (response.data.success) { 

            swal.closeModal('general-modal');
        
            await Roles();

            swal.success(response.data.message);
            
            scope.spin = false;
        
        } else {

            swal.error(response.data.message);

            scope.spin = false;
        
        }  
         
    };
    
    scope.sendData = async () => {

        scope.spin_form = true;

        scope.objectModel.key = scope.objectModel.nombre;

        let response = (scope.objectModel.id == null) ? await link.create_crud(model,scope.objectModel) : await  link.update_crud(model,scope.objectModel);

        await PostSend(response);

        scope.$apply();

    };

    scope.Init = async () => {

        scope.spinView = true;

        await Roles();

        scope.spinView = false;

        scope.$apply();
        
    };
}


UserRolesCtrl.$inject = [
    '$scope',
    'link.factory',
    'swal.service'
];

const UserRolesComponent = () => {
	return {
		templateUrl: "views/system/user_roles/user_roles.html",
		css: 'views/system/user_roles/user_roles.css',
        controller: UserRolesCtrl
	}
}

angular
	.module('app')
	.component('userRoles',UserRolesComponent());