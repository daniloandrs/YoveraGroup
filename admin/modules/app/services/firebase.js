'use strict';

class FirebaseService {
  constructor(cFirebase) {
    this.Firebase = () => {
     // console.log(firebase.database());
    };
  }
}

FirebaseService.$inject = ['cFirebase'];
 
angular
    .module('app')
    .service('firebase.service', FirebaseService);

