(() => {
  angular
    .module('todoListsApp')
    .service('Task', ['Restangular', Restangular => {
      let Task = Restangular.service('tasks');
      return Task;
    }]);
})();
