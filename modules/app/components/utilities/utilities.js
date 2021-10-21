'use strict';

let SwalCtrl = (scope,swal,q) => {
    

    scope.config  = () => swal.config(); 

    scope.close = () => swal.close();

    scope.aceptar = () => {
        let props =swal.config();
        let method = props.methodAccept;
        if (method) {
            method(props.params);
            scope.close();
        }
    };
    scope.cancelar = () => {
        let props =swal.config();
        let method = props.methodClosed;
        if (method){
             method(props.params);
            scope.close();
        }
    };
}
 
SwalCtrl.$inject = ['$scope','swal.service','$q'];

let SwalComponent  = () => {
    return {
        templateUrl:'modules/app/components/utilities/swal-template.html',
        controller: SwalCtrl
    }
}

class SwalService {

    constructor () {
        
        let config;
        
        let swal = angular.element('#swal');
        
        let init =  () => config = { 
            title: undefined, 
            message: undefined, 
            type: undefined,
            methodAccept: undefined,
            methodClosed: undefined,
            params: undefined,
            confirm:undefined
        };
        
        let set = values => {
            for (let i in config)
                config[i] = (values[i]) ? values[i] : undefined;
        };

        let load = (message,type,confirm) => {
            
            var string_message = '';
            
            if(typeof message === "object" ) {
                for(let item in message) {
                    if (Array.isArray(message[item]) ) {
                        message[item].forEach(element => {
                            string_message +=  element + '\n';
                        });
                    }
                }
            } else {
                string_message = message;
            }

            swal.modal('show');
            set({message: string_message,type: type, confirm:confirm});
        };

        this.error   = message => load(message,'danger',false);

        this.success = message => load(message,'success',false);

        this.info    = message => load(message,'info',false);


        this.confirm = (message, method,cancelar, ...params) => {
            swal.modal('show');
            config.message = message;
            config.type = 'warning';
            config.confirm = true;
            config.params = params
            config.methodAccept = method;
            config.methodClosed = cancelar;
            
        };


        // modal open 

        this.openModal =  name => {
            $('#openModal_'+name).modal('show');
        };

        this.closeModal = name =>  {
            $('#openModal_'+name).modal('hide');
        };


        this.config = () => config;

        this.close  = () => swal.modal('hide');
        
        init();
    }
}



// Breadcrumb

let ModalComponent = () => {
    return {
        /**
         * bindings
         * side : class de mdBostrap modal-side modal-(top-left, top-right,bottom-left, bottom-right)
         * fluid: class de mdBostrap modal-full-height modal-(left,right,bottom ,top)
         */
        template:
            `
            <style>
                .modal-title {
                    text-align:center;
                    font-weight:bold;
                }
                .modal-dialog.modal-notify.modal-default .badge, .modal-dialog.modal-notify.modal-default .modal-header {
                    background-color: #ffffffb8;
                }

                .text-dark {
                    color: #000000!important;
                }
                .btn-close-dark { 
                    color : #7e8388;
                }

                .text-white {
                    color: #fffff !important;
                }

                @media (min-width: 992px) {
                    .modal .modal-fluid, .modal .modal-frame {
                        width: 100%;
                        max-width: 98%;
                    }
                }   

            </style>
            <div class="modal fade" id="openModal_{{$ctrl.name}}" tabindex="-1" role="dialog" 
                            aria-labelledby="openModal_{{$ctrl.name}}" aria-hidden="true">
                <div class=" modal-dialog 
                            modal-{{$ctrl.size  ? $ctrl.size : $ctrl.default_size }} 
                            modal-{{$ctrl.side  ? 'side':'' }} modal-{{$ctrl.side ? $ctrl.side : $ctrl.default_side }}
                            modal-{{$ctrl.fluid ? 'full-height':'' }} modal-{{$ctrl.fluid ? $ctrl.fluid : $ctrl.default_fluid }}
                            modal-{{$ctrl.fluid ? 'frame':'' }} modal-{{$ctrl.frame ? $ctrl.frame : $ctrl.default_frame }}
                            modal-notify modal-{{$ctrl.type  ? $ctrl.type : $ctrl.default_type }}"
                            role="document">

                    <div class="modal-content">
                
                        <div class="modal-header {{ $ctrl.default_color }}">
                            <h6 class="modal-title col-12" id="openModal_{{$ctrl.name}}" ng:bind="$ctrl.title"></h6>
                            <button type="button" style="position: absolute;right: 20px;"
                                class="close {{ $ctrl.default_color }}"
                                data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <div class="modal-body">
                            <ng-transclude></ng-transclude>
                        </div>
                    </div>
                </div>
            </div>
            `,
        controller: function ($attrs) {
            this.default_size  = 'md';
            this.default_side  = '';
            this.default_frame = '';
            this.default_fluid = '';
            this.default_type  = 'default';

            if ($attrs.type == null) 
                this.default_color = 'btn-close-dark';
            else
                this.default_color = 'text-white';

            
        },

        transclude:true,
        bindings:{
            name:'@',
            title:'@',
            size:'@',
            side:'@',
            fluid:'@',
            frame:'@',
            type:'@',
        }
    }
}

// Breadcrumb

let BreadcrumbComponent = () => {
    return {
        template:
            `
            <style>
                .breadcrumb {
                    z-index:0;
                }
            </style>
            <nav class="navbar navbar-expand-md navbar-dark navbar-theme mb-3 no-content breadcrumb">
                <div class="float-left">
                    <a class="white-text button-collapse" href="" data-activates="slide-out">
                        <i class="fa fa-angle-double-right white-text"></i>
                    </a>
                </div>
                <div class="mr-auto">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb clearfix d-none d-md-inline-flex pt-0">
                            <li class="breadcrumb-item">
                                <a class="white-text" href="#/home">Home</a>
                            </li>
                            <li ng:hide="item == 'home'" class="text-white" ng:class="{'active': $index+1 == $ctrl.list_routes.length }"  
                                ng:repeat="item in $ctrl.list_routes">
                                <i class="fa fa-angle-double-right mx-2 white-text" aria-hidden="true"></i>
                                <a class="white-text" ng:if="$index+1 < $ctrl.list_routes.length" href="#/{{item}}" 
                                    ng:bind="item">
                                </a>
                                <span  ng:if="$index+1 == $ctrl.list_routes.length" ng:bind="item"></span>
                            </li>
                        </ol>
                    </nav>
                </div>
            </nav>
            `,
        controller: function($location) {

            this.default_path = $location.path();

            let toArrayPath = path =>  {
                let aux =  path.split('/');
                return aux.filter(item => item != '');
            };
            
            this.list_routes = toArrayPath(this.default_path);

        }
    }
}

//validaciones <validate-input></validate-input>

let ValidateInputComponent = () => {
    return {
        template:
            `
            <style> 
                .prefix {font-size:1.35rem !important;top:1rem !important;}
                .md-form .validate {
                    margin-bottom: .5rem;
                }
            </style>
            <div>
                <span class="text-danger" ng:if="$ctrl.input.$error.required && $ctrl.input.$dirty">*El campo es
                requerido</span>
                <span class="text-danger" ng:if="$ctrl.input.$error.minlength">
                    * {{ ($ctrl.minl == undefined) ? "El valor ingresado es muy pequeño." : $ctrl.minl }}
                </span>
                <span class="text-danger" ng:if="$ctrl.input.$error.maxlength">
                    * {{ ($ctrl.maxl == undefined) ? "El valor ingresado es muy grande." : $ctrl.maxl }}
                </span>
                <span class="text-danger" ng:if="$ctrl.input.$error.pattern">
                    * {{ ($ctrl.pat == undefined) ? "El formato ingresado no coincide con el solicitado.": $ctrl.pat }}
                </span>
                <span class="text-danger" ng:if="$ctrl.input.$error.min">
                    * {{ ($ctrl.min == undefined) ? "El número ingresado es muy pequeño." : $ctrl.min }}
                </span>
                <span class="text-danger" ng:if="$ctrl.input.$error.max">
                    * {{ ($ctrl.max == undefined) ? "El número ingresado es muy grande." : $ctrl.max }}
                </span>
                <span class="text-danger" ng:if="$ctrl.input.$error.number">
                    *Ingrese un número por favor.
                </span>
                <span ng:repeat="err in $ctrl.error track by $index" class="row col-12 text-danger">*{{err}}</small>
            </div>`,

        controller: function() {},
        
        bindings:{
            input: '=',
            maxl: '@',
            minl: '@',
            min: '@',
            max: '@',
            pat: '@',
            regex: '@',
            error: '='
        }
    }
}

 
// Component <input-text></input-text>

let InputTextComponent  = () => {
    return {
        template:
            `
            <style>
                .md-form.md-outline label {
                    font-size: .9rem !important;
                }
            </style>
            
            <div class="md-form md-outline">
                <i ng:if="$ctrl.icon !== undefined " class="fa fa-{{$ctrl.icon}} prefix"></i>
                <input  
                    type="{{$ctrl.type ? $ctrl.type : $ctrl.default_type}}" 
                    ng:model="$ctrl.model" placeholder="{{$ctrl.placeholder ? $ctrl.placeholder : $ctrl.default_placeholder}}"
                    class="form-control" name="{{$ctrl.name}}" id="{{ $ctrl.serial_key + '_' + $ctrl.name }}"
                    ng:required="$ctrl.ngreq===undefined?$ctrl.req:$ctrl.ngreq"
                    maxlength="{{$ctrl.maxl ? $ctrl.maxl : 999999 }}" minlength="{{$ctrl.minl ? $ctrl.minl : 0 }}"
                    pattern="{{$ctrl.ngregex?$ctrl.ngregex:$ctrl.regex?$ctrl.regex:$ctrl.default_regex}}"
                    ng:change="$ctrl.valid(event);" ng:disabled="$ctrl.disabled";
                >
                <!-- ng-pattern-restrict="{{$ctrl.ngregex?$ctrl.ngregex:$ctrl.regex?$ctrl.regex:$ctrl.default_regex}}" -->
                    
                <label for="{{$ctrl.name}}" class="active">
                    {{$ctrl.title}}
                    <span class="text-danger">{{($ctrl.ngreq?$ctrl.ngreq:$ctrl.req)?"*":""}}</span>
                </label>

                <small id="{{ $ctrl.serial_key + '_' + $$ctrl.name}}" class="form-text text-muted md-4">
                    <validate-input input="$ctrl.form" minl="El texto debe contener al menos {{$ctrl.ngminl?$ctrl.minl:$ctrl.minl}} caracteres."
                    pat="{{($ctrl.ngpat)?$ctrl.ngpat:$ctrl.pat?$ctrl.pat:$ctrl.default_pat}}" error="$ctrl.error"></validate-input>
                </small>
            </div>`
        ,
        controller: function () {
            this.default_type  = 'text';
            this.default_regex = ('^[A-Za-z0-9-ñÑáéíóúÁÉÍÓÚ ]*$').toString();
            this.default_pat   = 'Caracteres inválidos.';
            this.default_placeholder = '';
            this.default_form  = 'base_form';

            let uuidv4 = () => {
                this.serial_key = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                );
            }

            uuidv4();

            this.valid = () => this.error ? this.error : null;
        },
        bindings:{
            type:'@',
            model:'=',
            icon:'@',
            title:'@',
            placeholder:'@',
            name:'@',
            req:'@',
            ngreq:'=',
            form:'=',
            maxl:'@',
            minl:'@',
            regex:'@',
            ngregex:'=',
            pat:'@',
            disabled:'=',
        }
    }
}


// Component <input-email></input-email>

let InputEmailComponent  = () => {
    return {
        template:
            `
            <style>
                .md-form.md-outline label {
                    font-size: .9rem !important;
                }
            </style>
            <input-text title="{{$ctrl.title}}" ngtitle="$ctrl.ngtitle" name="{{$ctrl.name}}" req="{{$ctrl.req}}" ngreq="$ctrl.ngreq"
            placeholder="{{$ctrl.holder}}" ngholder="$ctrl.ngholder" minl="{{$ctrl.minl}}" ngminl="$ctrl.ngminl" maxl="{{$ctrl.maxl ? $ctrl.maxl : $ctrl.default_maxl}}"
            ngmaxl="$ctrl.ngmaxl" regex="{{$ctrl.regex ? $ctrl.regex : $ctrl.default_regex}}" ngregex="$ctrl.ngregex" pat="{{$ctrl.pat ? $ctrl.pat : $ctrl.default_pat}}"
            ngpat="$ctrl.ngpat" type="email" model="$ctrl.model" error="$ctrl.error" form="$ctrl.form" disabled="$ctrl.disabled">
        </input-text>
            `
        ,
        controller: function () {
            this.default_regex =("[a-zA-Z0-9._\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,4}").toString();
            this.default_pat   = 'ejemplo minombre@dominio.com';
            this.default_placeholder = '';
            this.default_maxl = 50; 
            this.default_form  = 'base_form';

            let uuidv4 = () => {
                this.serial_key = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                );
            }

            uuidv4();

            this.valid = () => this.error ? this.error : null;
        },
        bindings:{
            title: '@',
            ngtitle: '=',

            name: '@',

            req: '@',
            ngreq: '=',

            holder: '@',
            ngholder: '=',

            minl: '@',
            ngminl: '=',

            maxl: '@',
            ngmaxl: '=',

            regex: '@',
            ngregex: '=',

            pat: '@',
            ngpat: '=',

            type: '@',
            model: '=',
            error: '=',
            form: '=',
            disabled: '='
        }
    }
}


// component <input-number></input-number>

let InputNumberComponent  = () => {
    return {
        template:
            `
            <style>
                .md-form.md-outline label {
                    font-size: .9rem !important;
                }
            </style>
            
            <div class="md-form md-outline">
                <i ng:if="$ctrl.icon !== undefined " class="fa fa-{{$ctrl.icon}} prefix"></i>
                <input  
                    type="number" ng:model="$ctrl.model" placeholder="{{$ctrl.placeholder}}"
                    step="{{$ctrl.step ? $ctrl.step : $ctrl.default_step}}"
                    class="form-control" name="{{$ctrl.name}}" id="{{ serial_key + '_' + $ctrl.name}}"
                    ng:required="$ctrl.ngreq===undefined?$ctrl.req:$ctrl.ngreq"
                    max="{{	$ctrl.ngmax ? $ctrl.ngmax : $ctrl.max ? $ctrl.max : $ctrl.default_max}}" 
                    min="{{$ctrl.ngmin ? $ctrl.ngmin : $ctrl.min ? $ctrl.min : $ctrl.default_min}}"
                    ng-pattern-restrict="{{$ctrl.ngregex?$ctrl.ngregex:$ctrl.regex?$ctrl.regex:$ctrl.default_regex}}" 
                    ng:change="$ctrl.valid(event);"ng:disabled="$ctrl.disabled";
                >

                <label for="{{$ctrl.name}}" class="active">
                    {{$ctrl.title}}
                    <span class="text-danger">{{($ctrl.ngreq?$ctrl.ngreq:$ctrl.req)?"*":""}}</span>
                </label>

                <small id="{{ serial_key + '_' + $ctrl.name}}" class="form-text text-muted md-4">
                    <validate-input input="$ctrl.form" min="El número debe ser mayor o igual a {{$ctrl.min ? $ctrl.min : $ctrl.default_min}}."
                    max="El número debe ser menor o igual a {{$ctrl.max ? $ctrl.max : $ctrl.default_max}}" error="$ctrl.error"
                    pat="{{$ctrl.ngpat ? $ctrl.ngpat : $ctrl.pat ? $ctrl.pat : $ctrl.default_pat}}"></validate-input>
                </small>
            </div>`
        ,
        controller: function () {
            this.default_regex = ("[0-9]{0,6}").toString();
            this.default_min   = 0;
            this.default_max   = 999999;
            this.default_pat   = "Por favor ingrese un número valido.";
            this.default_step  = null;
            
            let uuidv4 = () => {
                this.serial_key = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                );
            }

            uuidv4();

            this.valid         = () => this.error ? this.error : null;
        },
        bindings:{
            model:'=',
            icon:'@',
            title:'@',
            placeholder:'@',
            name:'@',
            req:'@',
            ngreq:'=',
            form:'=',
            min: '@',
            ngmin: '=',
            max: '@',
            ngmax: '=',
            regex: '@',
            ngregex: '=',
            pat: '@',
            ngpat: '=',
            disabled: '=',
            step: '@',
        }
    }
};

// component <input-select></input-select>

let InputSelectComponent  = () => {
    return {
        template:
            `
            <style>
                .md-outline.select-wrapper+label {
                    top: .5em !important;
                    z-index: 2 !important;
                }
                .select-wrapper.md-form.md-outline + label {
                    font-size: .7rem;
                }
                .md-form.md-outline {
                    margin-bottom: 0rem;
                }
                .select-wrapper.md-form.md-outline input.select-dropdown {
                    padding: .375rem .75rem;
                    color: #7d7d7d;
                    margin: 0 0 .5rem;
                    height: 39px;
                }
            </style>
            <div class="select-outline" id="{{ serial_key + '_' + $ctrl.name}}">
                <select class="mdb-select md-form md-outline  md-form colorful-select dropdown-dark"
                    name="{{$ctrl.name}}" ng:model="$ctrl.model" id="select_component_{{$ctrl.name}}" 
                    ng:options="($ctrl.id == '*') ? item :  item[($ctrl.id) ? $ctrl.id : $ctrl.default_id] 
                        as item[($ctrl.key) ? $ctrl.key : $ctrl.default_key] for item in $ctrl.list" 
                    ng:required="($ctrl.ngreq ? $ctrl.ngreq : $ctrl.req) ? true : false" 
                    ng:change="$ctrl.change()"
                    >
                    <option value="">
                        {{$ctrl.ngdefault ? $ctrl.ngdefault : $ctrl.default ? $ctrl.default : $ctrl.default_text}}
                    </option>
                </select>
                
                <label>
                    {{$ctrl.label}}
                    <span class="text-danger">{{($ctrl.ngreq?$ctrl.ngreq:$ctrl.req)?"*":""}}</span>
                </label>

                <small id="{{ serial_key + '_' + $ctrl.name}}" class="form-text text-muted md-2">
                    <validate-input input="$ctrl.form"  error="$ctrl.error"></validate-input>
                </small>
            </div>
            `
        ,
        controller: function ($attrs) {
            
            angular.element(document).ready(function () {
                $('#select_component_'+$attrs.name).materialSelect();
            });
            
            this.default_text = "Seleccionar";
            this.default_key = "nombre";
            this.default_id = "id";
            
            let uuidv4 = () => {
                this.serial_key = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                );
            }

            uuidv4();
            this.valid      = () => this.error ? this.error : null;

        },
        bindings:{
            label: '@',
            nglabel: '=',
            name: '@',
            req: '@',
            ngreq: '=',
            default: '@',
            ngdefault: '=',
            key: '@',
            id: '@',
            model: '=',
            list: '=',
            error: '=',
            form: '=',
            change: '=',
            icon:'@',
        }
    }
};

let checkDisabledDirective = () => {
    return {
        link : (scope,element) =>  {
            
            let runing = () => {
                ( scope.$ctrl.disabled == true ) ? element.attr('disabled','') :
                    (element.attr('disabled')) ? element.removeAttr('disabled','') : '';   
            }        
        
            let castBoolean = () => {

                if  (typeof(scope.$ctrl.model) == 'number')
                        (scope.$ctrl.model == 1) ? scope.$ctrl.model = true : 
                            (scope.$ctrl.model == 0) ? scope.$ctrl.model = false : scope.$ctrl.model;

                if  (typeof(scope.$ctrl.model) == 'string')
                        (scope.$ctrl.model == 'true') ? scope.$ctrl.model =  true : 
                            (scope.$ctrl.model == 'false') ? scope.$ctrl.model = false : scope.$ctrl.model;
            
            };

            scope.$watch('$ctrl.disabled',() => runing());

            castBoolean();

        }
    }
};

let InputSwitchComponent  = () => {
    return {
        template:
            `
            <style>
            .switch label input[type=checkbox]:checked+.lever:after {
                background-color: #00e25b;
                left: 1.5rem;
            }
            .title-size {
                font-size:12px;
            }
            </style>

            <div class="switch  {{ $ctrl.center ? $ctrl.center : $ctrl.default_center}}">
                <div class="">
                    <span class="title-size" ng:bind="$ctrl.title"></span>
                </div>
                <label>
                    {{ $ctrl.off ? $ctrl.off : $ctrl.default_off }}
                    <input type="checkbox" ng:model="$ctrl.model" ng:change="$ctrl.change();" check-disabled>
                    <span class="lever"></span> 
                    {{ $ctrl.on ? $ctrl.on :$ctrl.default_on }}
                </label>
            </div>
            `
        ,
        controller: function () {
            this.default_tooltip    = 'nuevo';
            this.default_off        = 'No';
            this.default_on         = 'Si';    
            this.default_center     = 'text-center';

            
        },
        bindings:{
            title:'@',
            on:'@',
            off:'@',
            form: '=',
            change:'&',
            disabled:'=',
            model:'=',
            center:'@'
        }
    }
}

// buttons 

// component <input-number></input-number>

let ButtonComponent  = () => {
    return {
        template:
            `
            <style>
                .fa-icon {
                    color:#ffff !important;
                }
                .mi-spin {
                    margin: auto;
                }
            </style>
            <div class="{{$ctrl.center ? $ctrl.center : $ctrl.default_center}}">
                <button class="material-tooltip-main btn btn-{{$ctrl.size ? $ctrl.size : $ctrl.default_size}} 
                    btn-{{$ctrl.type ? $ctrl.type : $ctrl.default_type}}" 
                    ng:disabled="$ctrl.spiner || $ctrl.form.$invalid || ($ctrl.disabled != null) ? ($ctrl.disabled || $ctrl.spiner) : ($ctrl.default_disabled || $ctrl.default_spiner)"
                    ng:click="$ctrl.click();"
                >
                    <span ng:show="!$ctrl.spiner" class="fa-icon fas fa-{{$ctrl.icon ? $ctrl.icon : $ctrl.default_icon}}" 
                        ng:bind="' '+ $ctrl.title">
                    </span>

                    <div class="mi-spin" ng:show="$ctrl.spiner">
                        <i class=" fa fa-spin fa-spinner"></i>
                         Enviando ... 
                    </div>

                </button>    
            </div>`
        ,
        controller: function () {
            this.default_center         = 'text-center';
            this.default_type           = 'default';
            this.default_size           = 'sm';
            this.default_icon           = '';
            this.default_spiner         = false;
            this.default_tooltip        = 'nuevo';
            this.default_disabled       = false;

            this.valid  = () => this.error ? this.error : null;
        },
        bindings:{
            center:'@',
            icon:'@',
            title:'@',
            type:'@',
            size:'@',
            spiner:'=',
            form: '=',
            click:'&',
            disabled:'='
        }
    }
}
let DragDropDirective = () => {
    return {
        link : (scope,element) =>  {       
            
            element.on('dragover',e => {
                e.preventDefault();
                
            });
            element.on('dragleave', e =>  {
                e.preventDefault();
            });

            element.on('drop', e => {
                console.log(e.originalEvent.dataTransfer);
                if (e.originalEvent.dataTransfer) {
                    if (e.originalEvent.dataTransfer.files.length) {
                      e.preventDefault();
                      e.stopPropagation();
                      $(this).css('border', '1px solid #0F0');
                      //saveFile(e.originalEvent.dataTransfer.files);
                    }
                  }
            })

        },
        bindings: {
        //    fileModel: '=',
        //   options: '=',
        //    nameModel: '='
        }
    }
};

let InputFileReadDirective = () => {
    return {
        link : (scope,element) =>  {

            element.attr('id',scope.$ctrl.nameModel);
        
            if (scope.$ctrl.options) {
                switch (scope.$ctrl.options.type) {
                    case 'image':
                        element.attr('accept', 'image/*');
                        break;
                    case 'pdf':
                        element.attr('accept', 'application/pdf');
                        break;
                    case 'excel':
                        element.attr('accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                        break;
                }
            }
            if (scope.$ctrl.options && scope.$ctrl.options.multiple)
                element.attr('multiple', true);
            
           element.on('change',(event) => {
                scope.$apply( () => {
                    let files; 
                    if ( scope.$ctrl.options && scope.$ctrl.options.multiple )
                        files = event.target.files;
                    else
                        files = event.target.files[0];
                
                    scope.$ctrl.file_model = files;
                    console.log(files)
               });

           });

        },
        bindings: {
            fileModel: '=',
            options: '=',
            nameModel: '='
        }
    }
};

let InputFileComponent  = () => {
    return {
        template:
            `
            <style>
                .input-file {
                    display: block;
                    position: relative;
                    visibility: hidden;
                    width: 0;
                }

                .drop-file {
                    cursor:pointer;
                }
                .dn-uploaderfile small {
                    font-size: 80%;
                }
                .dn-uploaderfile .area-input {
                    position: relative;
                    height: 230px;
                    padding: 5px;
                    margin: 0 auto;
                    margin-bottom: 10px;
                    border: 2px dashed lightgray;
                    box-sizing: content-box;
                }
                    .dn-uploaderfile .area-input.label-error {
                        border-color: rgba(255, 54, 54, 0.8);
                    }
                    .dn-uploaderfile .area-input.label-success {
                        border-color: rgba(24, 206, 15, 0.8);
                    }
                    .dn-uploaderfile .area-input.label-full {
                        /* width: 100%; */
                        height: 100%;
                    }
                    .dn-uploaderfile .area-input.label-full .img-multiple {
                        position: initial;
                        max-width: 80px;
                        max-height: 40px;
                    }
                    .dn-uploaderfile .area-input i.default-icon {
                        font-size: 70px;
                        color: gray;
                        opacity: 1;
                        padding-top: .5em;
                    }
                    .dn-uploaderfile .table-responsive {
                        width: 100%;
                        background-color: #fff;
                    }
                    .dn-uploaderfile .table td {
                        text-transform: lowercase;
                    }
            
                    .dn-uploaderfile .area-input .single-file .icons i {
                        position: absolute;
                        top: -15px;
                        left: -15px;
                        font-size: 20px;
                        padding: 5px;
                        border-radius: 20px;
                        background-color: #fff;
                        z-index: 1;
                    }
            
                .dn-uploaderfile .clean {
                    position: absolute;
                    right: 0;
                    background-color: #ff3547;
                    padding: 0;
                    top: 0;
                    margin: 2.7em 1.6em;
                    color: #ffff !important;
                    height: 3em;
                    width: 7em;
                    visibility: hidden;
                    opacity: 0;
                    transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                    .dn-uploaderfile:hover .clean {
                        visibility: visible;
                        opacity: 1;
                    }

                
            
                .dn-uploaderfile .dimentions span {
                    display: block;
                    /* font-weight: bold; */
                    font-size: 11px;
                }
                
                .dn-uploaderfile h6 {
                    margin: 40px;
                }
                .dn-uploaderfile input {
                    display: none;
                }
                .dn-uploaderfile .area-input .img-simple {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    max-width: 95%;
                    max-height: 95%;
                    transform: translate(-50%, -50%);
                }
            
                .modal-app .img-preview {
                    max-height: 72vh;
                }
                .overlay iframe.preview-file {
                    width: 100%;
                    min-height: 72vh;
                    display: block;
                    border: none;
                }
            
                .dn-uploaderfile .table .row-error {
                    background-color: rgba(255, 54, 54, 0.2);
                }
                .dn-uploaderfile .table .row-success {
                    background-color: rgba(24, 206, 15, 0.2);
                }
            
                .dn-uploaderfile .table td h6 {
                    margin: 0;
                }
            
                .dn-uploaderfile .table {
                    margin-bottom: 0;
                    border-bottom: 1px solid rgb(128, 128, 128, .2);
                }
            
                .dn-uploaderfile .area-input .hover-area-input {
                    position: absolute;
                    width: calc(100% - 12px);
                    height: 60px;
                    color: #fff;
                    background-color: rgba(0, 0, 0, .5);
                    bottom: 6px;
                    left: 6px;
                    text-align: center;
                    margin-bottom: 0;
                    visibility: hidden;
                    opacity: 0;
                    transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                    .dn-uploaderfile .area-input:hover .hover-area-input {
                        visibility: visible;
                        opacity: 1;
                    }
                    .dn-uploaderfile .area-input .hover-area-input small { margin-left: 10px; }
            
                    .file-preview iframe {
                        width: 100%;
                        border: none;
                        background-color: #fff;
                        padding: 10px;
                        min-height: 70vh;
                    }
            
            .content-mini-img {
                cursor: pointer;
            }
            
            @media screen and (max-width: 991px) {
                .modal-app .img-preview {
                    max-height: 58vh;
                }
            }
            .icon-files-success {
                font-size: 6.5em !important;
                color: #00c851 !important;
            }
            .icon-files-error {
                font-size: 6.5em !important;
                color: #ff3547 !important;
            }
            .label-files-title {
                display:block;
                margin: 1em 0em;
            }
            .item-dropzone  {
                background-color: white; 
                display:inline-block;
                box-shadow: 0 0 0 0 white!important;               
            }

            .clean-dropzone {
                position: absolute;
                right: 0;
                background-color: #ff3547;
                top: 0;
                cursor:pointer;
                padding: 1em .5em !important;
                color: #ffff !important;
                width: 8em;
                visibility: hidden;
                opacity: 0;
                transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .icon-deletes {
                cursor:pointer; left:95% !important
            }
                .item-dropzone:hover .clean-dropzone {
                    visibility: visible;
                    opacity: 1;
                }

            .label-dropzone {
                min-height:15em !important;
            }
            .label-multiple-dropzone {
                top: 0;
                left: 0;
                position: absolute;
                height: 98%;
                width: 98.5%;
                color: #FF5722 !important;
                background-color: #46454400 !important;
                box-shadow: none;
            }
            .label-multiple-dropzone:hover  {
                box-shadow:none;
            }
            .btn-success .label-multiple-dropzone:hover {
                 background-color: #9E9E9E !important;
                box-shadow: none;
            }
            </style>

            <div class="dn-uploaderfile" ng:init="onInit();">
                <div class="input-file">
                    <input type="file" file-model="file_model" file-read name-model="$ctrl.nameModel" options="options">
                </div>
                <div ng:if="options.multiple" class="text-center">
                    <div style="padding-bottom: 30px;" class="area-input bg-white label-dropzone" ng:class="{ 'label-full': options.multiple }" >
                        <label for="{{$ctrl.nameModel}}" class="btn label-multiple-dropzone" dn-drag-drop ondragover="return false">
                            <span ng:show="options.type === 'image' && list__files.length == 0">
                                <p><i class="fa fa-cloud-upload fa-10x" style="font-size:15em;"></i></p>
                                Elegir imágenes</span>
                            <span ng:hide="options.type === 'image' || list__files.length > 0">
                            <p><i class="fa fa-cloud-upload fa-10x" style="font-size:15em;"></i></p>Elegir archivos</span>
                            <i class="fa fa-images"></i>
                        </label>
                        <br>
                        <div class="card col-md-3 item-dropzone" ng:repeat="one in list__files" ng:class="{ 'row-error': one.validation.error }"">
                            <div class="area-input bg-white fix-col justify-content-center" ng:class="{ 'label-error': one.validation.error && !$ctrl.model, 'label-success': one.validation.success && $ctrl.model }">
                                <i class="default-icon fa fa-{{one.attrs.type}}" ng:if="one.attrs.type !== 'imagen'"></i>
                                <i class="default-icon fa fa-cloud-upload-alt" ng:if="!one && !nameFileDefault"></i>
                                <i class="default-icon fa fa-{{getIconOtherFile(undefined, $ctrl.type)}}" ng:if="nameFileDefault && !one"></i>
                                <div class="single-file" ng:if="one">
                                    <div class="icons">
                                        <i class="text-success fa fa-check-circle" ng:if="one.validation.success && $ctrl.model"></i>
                                        <i class="text-danger fa fa-ban" ng:if="one.validation.error && !$ctrl.model" ></i>
                                        <i class="text-danger fa fa-times-circle icon-deletes" d:tooltip="Eliminar Archivo" ng:click="remove__event($index, one.attrs)">
                                        </i>
                                        
                                    </div>

                                    <img ng:if="one.attrs.type === 'imagen'" class="img img-simple" ng:src="{{one.result}}"
                                            alt="{{one.attrs.name}}" d-lightbox-open>
                                    
                                    <label class="label-files-title" d-lightbox-open ng:if="one.attrs.type !== 'imagen'" ng:bind="one.attrs.name"></label>
                                    <!--
                                    <i style="font-size: 20px;" class="fa fa-{{one.attrs.type}}" ng:if="one.attrs.type !== 'imagen'"
                                    ng:click="preview__event(one)"></i>
                                    -->
        
                                </div>
                            </div>
                            <button class="btn clean-dropzone btn-sm" ng:click="remove__event($index, one.attrs)">
                                remove <i class="fa fa-trash fa-2x"></i>
                            </button>
                            
                            <div class="alert alert-danger" role="alert" ng:if="one.validation.error && one">
                                <div class="container text-center">
                                    <strong>Alerta!</strong>
                                    <small ng:bind="one.validation.message"></small>
                                    <br>
                                    <div class="dimentions text-center" ng:if="one.attrs">
                                        <small  ng:if="one.attrs.type === 'imagen'">TAMAÑO :</small>
                                        <span  ng:if="one.attrs.type === 'imagen'" 
                                            ng:bind="one.attrs.width + ' y ' + one.attrs.height + ' px.' "></span>
                                        <br>
                                        <span ng:bind="one.attrs.size"></span>
                                    </div>
                                </div>
                            </div>
        
                            <div class="alert alert-success" role="alert" ng:if="one.validation.success && one">
                                <div class="container text-center">
                                    <strong ng:bind="one.validation.message"></strong>
                                    <div class="dimentions text-center" ng:if="one.attrs">
                                        
                                    <small ng:if="one.attrs.type === 'imagen'">TAMAÑO :
                                            <strong> 
                                                {{ one.attrs.width + ' x ' + one.attrs.height +' px. ' }} 
                                            </strong> (Ancho x Alto). </small>
                                        
                                        <span ng:bind="one.attrs.size"></span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                    </div>
                </div>

                <div id="video_preview"></div>
                <div ng:if="!options.multiple" class="text-center">
                    <div class="text-left">
                        <label ng:bind="$ctrl.title ? $ctrl.title : 'Subir Archivo' "></label>
                    </div>
                    <div class="area-input bg-white fix-col justify-content-center" ng:class="{ 'label-error': file__current.validation.error && !$ctrl.model,'label-success': file__current.validation.success && $ctrl.model}">
                        <i class="default-icon fa fa-{{file__current.attrs.type}}" ng:if="file__current.attrs.type !== 'imagen'"
                            ng:class="{'icon-files-success': file__current.validation.success,
                                    'icon-files-error': file__current.validation.error}">
                        </i>
                        <i class="default-icon fa fa-cloud-upload-alt" ng:if="!file__current && !nameFileDefault"></i>
                        <i class="default-icon fa fa-{{getIconOtherFile(undefined, $ctrl.type)}}" 
                            ng:if="nameFileDefault && !file__current && $ctrl.type !== 'image'">
                        </i>
                        
                        <div class="single-file text-center" ng:if="file__current">
                            <div class="icons">
                                <i class="text-success fa fa-check-circle" ng:if="file__current.validation.success && $ctrl.model"></i>
                                <i class="text-danger fa fa-ban" ng:if="file__current.validation.error && !$ctrl.model"></i>
                            </div>
                            <img class="img img-simple" d-lightbox-open ng:if="file__current.attrs.type === 'imagen'" ng:src="{{file__current.result}}"
                                alt="{{file__current.attrs.name}}">

                            
   
                            <label class="label-files-title" d-lightbox-open ng:if="file__current.attrs.type !== 'imagen'" ng:bind="file__current.attrs.name"></label>
                        </div>
                        
                        <img ng:if="!file__current && content__default" d-lightbox-open class="img img-simple" ng:src="{{content__default}}"
                            alt="">
                        
                        <div class="hover-area-input fix-col justify-content-center">
                            <label for="{{$ctrl.nameModel}}" class="btn btn-info">
                                <i class="fa fa-upload"></i>
                                <small>Elegir archivo</small>
                            </label>
                        </div>
                        
                        <div ng:if="file__current && file__current.attrs.type !== 'imagen' || nameFileDefault">
                            <!-- <br> 
                            <small class="d-block" ng:bind="file__current.attrs.name || nameFileDefault"></small>
                            <br> -->
                        </div>
                        
                        <button class="btn clean btn-sm" ng:click="clean__event();" ng:disabled="validateClean()">
                            remove <i class="fa fa-trash fa-2x"></i>
                        </button>
                    </div>
                    

                    <div class="alert alert-danger" role="alert" ng:if="file__current.validation.error && file__current">
                        <div class="container text-center">
                            <strong>Alerta!</strong>
                            <small ng:bind="file__current.validation.message"></small>
                            <br>
                            <div class="dimentions text-center" ng:if="file__current.attrs">
                                <small  ng:if="file__current.attrs.type === 'imagen'">TAMAÑO ACTUAL</small>
                                <span  ng:if="file__current.attrs.type === 'imagen'" 
                                    ng:bind="file__current.attrs.width + ' y ' + file__current.attrs.height + ' px.' "></span>
                                <br>
                                <span ng:bind="file__current.attrs.size"></span>
                            </div>
                        </div>
                    </div>

                    <div class="alert alert-success" role="alert" ng:if="file__current.validation.success && file__current">
                        <div class="container text-center">
                            <strong ng:bind="file__current.validation.message"></strong>
                            <div class="dimentions text-center" ng:if="file__current.attrs">
                                
                            <small ng:if="file__current.attrs.type === 'imagen'">TAMAÑO ACTUAL : 
                                    <strong> 
                                        {{ file__current.attrs.width + ' x ' + file__current.attrs.height +' px. ' }} 
                                    </strong> (Ancho x Alto). </small>
                                
                                <span ng:bind="file__current.attrs.size"></span>
                            </div>
                        </div>
                    </div>
                <div>
            </div>
            `
        ,
        controller: function ($scope,cApp,$rootScope, swal = 'swal.service') {
            
            var scope = $scope;
            
            scope.file__current;
            let ImageDataBackup = './assets/img/uploader/upload-1.png';
            let ListFilesModel = [];

            this.file_model = '';
        
            let MegasConvertion = bytes => {
                if (bytes) {
                    let kilobyte = 1024;
                    let res = bytes / kilobyte;
                    return res.toFixed(0, 3);
                }
            };
            
            let HaveSizeValid = (bytes, type) => {
                let size = parseInt(MegasConvertion(bytes));
                return size <= scope.dimentions__max.size;
            };

            scope.validateClean = () => {
                let bloq = true;
                if (scope.file__current)  bloq = false;
                
                if (!this.model) bloq = true;
        
                return bloq;
            };

            let IterateArrayOfFiles = files => {
                let options = this.options;
                angular.forEach(files, (value, key) => {
                    if (value.type.indexOf('image') !== -1) {
                        if (options && options.resize) {
                            ResizeImage(value, options.resize.width, options.resize.height, ProccessImage);
                        } else {
                            ProccessImage(value);
                        }
                    } else if (value.type.indexOf('image') === -1 ) {
                        ProccessOtherFile(value);
                    }
                });
            };
    

            let ResizeImage = (file, max_width, max_height, callback) => {
                let image = new Image();
                let Reader = new FileReader();
                Reader.readAsDataURL(file);
                Reader.onloadend = e => {
                    image.src = Reader.result;
                    let canvas = document.createElement('canvas');
                    let ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0);
    
                    let MaxWidth = max_width;
                    let MaxHeight = max_height;
    
                    image.onload = () => {
                        let width = image.width;
                        let height = image.height;
    
                        if (width > height) {
                            if (width > MaxWidth) {
                                height *= MaxWidth / width;
                                width = MaxWidth;
                            }
                        } else {
                            if (height > MaxHeight) {
                                width *= MaxHeight / height;
                                height = MaxHeight;
                            }
                        }
                        canvas.width = width;
                        canvas.height = height;
    
                        ctx = canvas.getContext('2d');
                        ctx.drawImage(image, 0, 0, width, height);
    
                        canvas.toBlob(blob => {
                            let properties = {
                                type: file.type,
                                lastModified: file.lastModified,
                                lastModifiedDate: file.lastModifiedDate,
                                name: file.name,
                                webkitRelativePath: file.webkitRelativePath
                            };
                            let file_resized = new File([blob], file.name, properties);
                            callback(file_resized);
                        }, "image/jpeg", 0.95);
                    };
                };
            };


            scope.getIconOtherFile = (type, otherType) => {
                let icon;
                if (type) {
                    switch (type) {
                        case 'application/javascript':
                            icon = 'file-alt-o'
                            break;
                        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                            icon = 'file-word-o'
                            break;
                        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                            icon = 'file-excel-o'
                            break;
                        case 'application/x-zip-compressed':
                            icon = 'file-archive-0'
                            break;
                        case 'text/plain':
                            icon = 'font'
                            break;
                        case 'application/pdf':
                            icon = 'file-pdf-o'
                            break;
                        case 'video/mp4':
                            icon = 'file-video-o'
                            break;
                        default:
                            icon = 'file'
                            break;
                    }
                } else {
                    switch (otherType) {
                        case 'javascript':
                            icon = 'file-alt'
                            break;
                        case 'word':
                            icon = 'file-word'
                            break;
                        case 'excel':
                            icon = 'file-excel'
                            break;
                        case 'zip':
                            icon = 'file-archive'
                            break;
                        case 'text':
                            icon = 'font'
                            break;
                        case 'pdf':
                            icon = 'file-pdf'
                            break;
                        case 'video':
                            icon = 'file-video'
                            break;
                        default:
                            icon = 'file'
                            break;
                    }
                }
                return icon;
            };
 
            scope.clean__event = () => {
                this.model = undefined;
                scope.file__current = undefined;
                scope.content__default = this.default;
                scope.list__files = [];
                ListFilesModel = [];
                this.deleteEvent();
            };


            scope.remove__event = (index, attrs) => {
                angular.forEach(ListFilesModel, (value, key) => {
                    if (value.name === attrs.name) {
                        ListFilesModel.splice(key, 1);
                        this.model = ListFilesModel;
                    }
                });
                scope.list__files.splice(index, 1);
            };


            let ProccessImage = file => {
                let d_result;
                let d_image;
                let Reader = new FileReader();
                Reader.readAsDataURL(file);
                Reader.onloadend = () => {
                    scope.$apply(() => {
                        d_result = Reader.result;
                        let image = new Image();
                        image.src = Reader.result;
                        image.onload = () => {
                            scope.$apply(() => {
                                let width = image.width;
                                let height = image.height;
                                d_image = {
                                    name: file.name,
                                    size: MegasConvertion(file.size) + ' kylobytes',
                                    type: 'imagen',
                                    width: width,
                                    height: height
                                };
                                let validation;
                                if (width <= scope.dimentions__max.width && height <= scope.dimentions__max.height && HaveSizeValid(file.size, file.type)) {
                                    validation = {
                                        success: true,
                                        message: 'Imagen correcta.'
                                    };
                                    if (scope.options.multiple) {
                                        ListFilesModel.push(file);
                                        this.model = ListFilesModel;
                                    } else {
                                        this.model = file;
                                    }
                                } else {
                                    if (!scope.options.multiple) {
                                        this.model = undefined;
                                    }
                                    validation = {
                                        error: true,
                                        message: `La imagen excede las dimensiones máximas : ${scope.dimentions__max.width}  y ${scope.dimentions__max.height} px (ancho y Alto), por lo cúal no será enviada.`
                                    };
                                }
                                let data__final = {
                                    result: d_result,
                                    attrs: d_image,
                                    validation: validation
                                };
                                if (scope.options.multiple) {
                                    scope.list__files.push(data__final);
                                } else {
                                    scope.file__current = data__final;
                                }
                            });
                        };
                    });
                };
                Reader.onloadstart = () => {}

            };


            let ProccessOtherFile = file => {
                let d_result;
                let Reader = new FileReader();
                Reader.readAsDataURL(file);
                Reader.onload = () => {
                    scope.$apply(() => {
                        d_result = Reader.result;
                        let d_file = {
                            name: file.name,
                            size: MegasConvertion(file.size) + ' kylobyes',
                            type: scope.getIconOtherFile(file.type)
                        };
                        // source: file
                        let d_final = {
                            result: d_result,
                            attrs: d_file
                        };
                        if (scope.options.multiple) {
                            if (HaveSizeValid(file.size, file.type)) {
                                d_final.validation = {
                                    success: true,
                                    message: 'Archivo correcto.'
                                }
                                ListFilesModel.push(file);
                                this.model = ListFilesModel;
                            } else {
                                d_final.validation = {
                                    error: true,
                                    message: 'Archivo excede peso máximo y no será enviado.'
                                }
                            }
                            scope.list__files.push(d_final);
                        } else {
                            if (HaveSizeValid(file.size, file.type)) {
                                this.model = file;
                                d_final.validation = {
                                    success: true,
                                    message: 'Archivo correcto.'
                                }
                                scope.file__current = d_final;

                            } else {
                                d_final.validation = {
                                    error: true,
                                    message: 'Archivo excede peso máximo y no será enviado.'
                                }
                                scope.file__current = d_final;
                                //swal.error('El archivo seleccionado excede el peso máximo de kilobytes.');
                            }
                        }
                    });
                };
                Reader.onloadstart = () => {
    
                };
            }
            /*
            scope.createVideoCanvas = (f)  => {
            
              var vid = document.createElement('video');
                var img = document.createElement('img');

              vid.src = window.URL.createObjectURL(f);
              console.log(vid);
              vid.play();
              var canvas = document.createElement('canvas');
              canvas.width  = 105;
              canvas.height = 100;
              canvas.getContext("2d").drawImage(vid, 0, 0, 100, 100);

              window.URL.revokeObjectURL(f);  
              console.log(vid,canvas);    
              var dataURL = canvas.toDataURL();
                img.setAttribute('src', dataURL);          
              document.getElementById('video_preview').appendChild(img);
             }
             */

            scope.$watch('$ctrl.file_model',before => {
                if (before) {
                    if (scope.options.multiple) {
                        IterateArrayOfFiles(before);
                    } else {
                        let options = this.options;
                        if (before.type.indexOf('image') !== -1) {
                            if (options && options.resize) {
                                ResizeImage(before, options.resize.width, options.resize.height, ProccessImage);
                            } else {
                                ProccessImage(before);
                            }
                        } else if (before.type.indexOf('image') === -1 && scope.options.type === 'all-files') {
                            ProccessOtherFile(before);
                            
                        } else {
                            ProccessOtherFile(before);
                            /*
                            if (before.type == "video/mp4") {
                                scope.createVideoCanvas(before);
                            }
                            */
                        }
                    }
                } 
            });
            /*
            if (before.type == "video/mp4") {
                scope.createVideoCanvas(before);
            }
            */
            scope.$watch('$ctrl.default', before => {
                if (before) {
                    scope.content__default = before;
                    scope.nameFileDefault = scope.content__default && this.type !== 'image' ?
                        typeof scope.content__default === 'string' ?
                            scope.content__default.replace(cApp().storage, '') :
                            scope.content__default :
                        undefined;
                }
            });

            $rootScope.$on('upload-file', (data, value) => {
                if (this.multiple) {
                    scope.clean__event();
                    scope.list__files = [];
                    const res = value.res.info.archivos;
                    scope.content__default = res;
                }
            })
    
            $rootScope.$on('clear', (data, value) => {
                scope.file__current = null
            })

            scope.onInit = () => {
                
                scope.dimentions__max = {
                    width: this.options && this.options.dimentions && this.options.dimentions.width ? this.options.dimentions.width : 2400,
                    height: this.options && this.options.dimentions && this.options.dimentions.height ? this.options.dimentions.height : 3600,
                    size: this.options && this.options.dimentions && this.options.dimentions.size ? this.options.dimentions.size : 4096
                };
                scope.list__files = [];
                scope.content__default = this.default;
                scope.nameFileDefault = scope.content__default && this.type !== 'image' ?
                    typeof scope.content__default === 'string' ?
                        scope.content__default.replace(cApp().storage, '') :
                        scope.content__default :
                    undefined;
                scope.image__data_result = ImageDataBackup;
                scope.options = {
                    type: this.options.type ? this.options.type : 'all-files',
                    multiple: this.options.multiple ? this.options.multiple : false, 
                };

                scope.storagePath = cApp().storage;
                scope.isDraft = this.isDraft;
        
            };
        },

        bindings:{
            title:'@',
            model:'=',
            nameModel:'@model',
            options:'=',
            form: '=',
            required:'=',
            default: '=',
            multiple:'=',
            deleteEvent:'&',
            //modelObject:'='
        }
    }
};

let TableGridScrollDirective = () => {

    return {
        link : (scope,element,attr) =>  {
            scope.active = false;        
            let runing = () => {     
                if (scope.active ) {
                    angular.element(element).removeClass('t-sticky');
                    scope.$apply( () => attr.$$observers.tSticky.$$scope.colKey = null);

                } else { 
                    angular.element(element).addClass('t-sticky');  
                    scope.$apply( () => attr.$$observers.tSticky.$$scope.colKey = scope.tSticky); 
                }
                scope.active = !scope.active;
            }        
            element.on('click',runing);
        },

        scope:{
            tSticky:'@',
        },
    
    }
};



let LightGalleryDirective  = () => {
    return {        
        link : (scope,element,attr) =>  {

            if (scope.$last) {
                element.parent().lightGallery({
                    dynamic: true,
                    dynamicEl: attr.$$observers.data
                });
            }
        },

        scope:{
            data:'@',
        },
    }
}

angular
    //module
    .module('app')
    //services
    .service('swal.service',SwalService)

    //directives 
    .directive('checkDisabled',checkDisabledDirective)
    .directive('dnDragDrop',DragDropDirective)
    .directive('fileRead',InputFileReadDirective)
    .directive('tSticky',TableGridScrollDirective)
    .directive('lightGallery',LightGalleryDirective)
    //components
    .component('componentSwal',SwalComponent())
    .component('dModal',ModalComponent())
    .component('breadcrumb',BreadcrumbComponent())
    .component('validateInput',ValidateInputComponent())
    .component('inputText',InputTextComponent())
    .component('inputEmail',InputEmailComponent())
    .component('inputNumber',InputNumberComponent())
    .component('inputSelect',InputSelectComponent())
    .component('inputSwitch',InputSwitchComponent())
    .component('btn',ButtonComponent())
    .component('inputFile',InputFileComponent())
  
