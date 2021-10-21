'use strict';

let owlFactory = () => {
    
    let OwlBanner = () =>  {

        return  {
            center     : false,
            loop       : true,
            margin     : 0,
            nav        : true,
            autoplay   : false,
            slideBy    : 1,
            dots       : true,
            navText    : ["<i class='fas fa-caret-right fa-2x'></i>","<i class='fas fa-caret-right fa-2x'></i>"],
            responsive : {          
                0   :{ items:1, nav:true, loop:true},

                600 :{ items:1, nav:true, loop:true},

                1000:{ items:1, nav:true, loop:true, dots:true}
            }
            
        }
    };

	return {
        owlBanner : () => OwlBanner()
    }
    
}


owlFactory.$inject = [];

angular
    .module('app')
    .factory('owl.factory', owlFactory);