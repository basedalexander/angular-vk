'use strict';

angular.module('app')
  .controller('NotesCtrl', function ($scope, notesModel) {
    $scope.notes = [];
    // Sub-states
    $scope.addingNewNote = false;

    notesModel.getNotes().then(onSuccess, handleError);

    function onSuccess (response) {
      console.log('success ', response);
      $scope.notes = response;
    }

    function handleError (reason) {
      console.log( "can't get notes " + reason);
    }

    $scope.addNewNote = function () {
      $scope.addingNewNote = true;
    };

    $scope.saveNewNote = function () {
      var note = {
        title: $scope.newNoteTitle,
        text: $scope.newNoteText
      };

      notesModel.saveNote(note)
        .then(
          function (response) {
            $scope.addingNewNote = false;
            onSuccess(response);
          },
          function (reason) {
            console.log("Can't save new note: ", reason);
          }
        );
    }

  });
