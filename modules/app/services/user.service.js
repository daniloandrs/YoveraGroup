
function UserService () {

	return {

        createUrl: (slug) => {
            
            slug = slug.toLowerCase();

            slug = removeAccents(slug);

            slug = slug.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>¿?\s]/g, ' ');
        
            slug = slug.replace(/^\s+|\s+$/gm, '');
        
            slug = slug.replace(/\s+/g, '-'); 
            
            return  slug;
        }
        
    }
}


UserService.$inject = [];

angular
    .module('app')
    .service('user.service', UserService);
