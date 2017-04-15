angular
  .module('todoListsApp')
  .controller('NotesController', ['$scope', '$http', 'raw',
    ($scope, $http, raw) => {
      let notes = $scope.notes = raw.data.notes;
      $scope.remove = note => {
        $http.delete('/notes/'+note.id);
        notes.splice(notes.indexOf(note), 1);
      };
    }]);
