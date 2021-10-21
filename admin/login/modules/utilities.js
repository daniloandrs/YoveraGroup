'use strict';

let SwalCtrl = (scope,swal) => {
    
    scope.config = () => swal.config(); 
    scope.close = () => swal.close();
}
 
SwalCtrl.$inject = ['$scope','swal.service'];

let SwalComponent  = () => {
    return {
        template:`
            <div class="modal fade" id="swal" tabindex="-1" role="dialog" aria-labelledby="swal" aria-hidden="true">
                <div class="modal-dialog modal-sm modal-notify modal-{{config().type}}" role="document">
                    <div class="modal-content text-center">
                        <div class="modal-header d-flex justify-content-center">
                            <p class="heading" ng:bind="config().title"></p>
                        </div>
                        <div class="modal-body">
                            <div ng:switch on="config().type">
                                <i class="fa fa-check fa-4x animated rotateIn" ng-switch-when="success"></i>
                                <i class="fa fa-times fa-4x animated rotateIn" ng-switch-when="danger"></i>
                                <i class="fa fa-info fa-4x animated rotateIn" ng-switch-when="info"></i>
                            </div>
                            <span ng:bind="config().message"></span>
                        </div>
                        <div class="modal-footer flex-center">
                            <a type="button" class="btn btn-sm btn-{{config().type}} waves-effect" ng:click="close();">Aceptar</a>
                        </div>
                    </div>
                </div>
            </div>`,
        controller: SwalCtrl
    }
}

class SwalService {

    constructor() {
        
        let config;
        let swal = angular.element('#swal');
        
        let init =  () => config = { title: undefined, message: undefined, type: undefined};
        
        let set = values => {
            for (let i in config)
                config[i] = (values[i]) ? values[i] : undefined;
        };

        let load = (message,type) => {
            swal.modal('show');
            set({message: message,type: type});
        }

        this.error = message => load(message,'danger');

        this.success = message => load(message,'success');

        this.info = message => load(message,'info');
        
        this.config = () => config;

        this.close = () => swal.modal('hide');
        
        init();
    }
}


angular.module('login')
    .component('componentSwal',SwalComponent())
    .service('swal.service', SwalService);