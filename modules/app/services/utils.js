
function Utils () {

    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } 

	return {

        createUrl: (slug) => {
            
            slug = slug.toLowerCase();

            slug = removeAccents(slug);

            slug = slug.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>¿?\s]/g, ' ');
        
            slug = slug.replace(/^\s+|\s+$/gm, '');
        
            slug = slug.replace(/\s+/g, '-'); 
            
            return  slug;
        },

        hoy : () => {
            let hoy = new Date();
            return hoy;
        },

        dateToString : (value) => {
            return filter('date')(value, 'yyyy-MM-dd', 'America/Lima');
        },

        ParseDate : date_string => {
            return new Date(filter('date')(date_string, 'yyyy-MM-dd', 'America/Lima'));
        }
        
    }
}


Utils.$inject = [];

angular
    .module('app')
    .service('utils.service', Utils);
