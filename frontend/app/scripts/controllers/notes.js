'use strict';

angular.module('app')
  .controller('NotesCtrl', function ($scope, notesModel) {

    notesModel.getNotes().then(onSuccess, handleError);


    function onSuccess (response) {
      console.log('success ' + response);
    }

    function handleError (reason) {
      console.log('fail ' + reason);
    }

  });
