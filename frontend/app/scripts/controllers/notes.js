'use strict';

angular.module('app')
  .controller('NotesCtrl', function ($scope, notesModel) {
    $scope.notes = [];
    // Sub-states
    $scope.addingNewNote = false;
    $scope.showingNote = false;

    notesModel.getNotes().then(onSuccess, handleError);

    function onSuccess (response) {
      console.log('success ', response);
      $scope.notes = response;
    }

    function handleError (reason) {
      console.log( "can't get notes " + reason);
    }

    $scope.showNote = function (note) {
      if ($scope.addingNewNote) { $scope.cancelAddNote(); }

      $scope.showingNote = true;
      $scope.currentNote = note;

      $scope.showNoteTitle = note.title;
      $scope.showNoteText = note.text;
    };

    $scope.closeNote = function () {
      $scope.showingNote = false;
      $scope.currentNote = false;

      $scope.showNoteTitle = '';
      $scope.showNoteText = '';
    };

    $scope.updateNote = function (noteId) {
      var fields = {
        title: $scope.showNoteTitle,
        text: $scope.showNoteText
      };

      notesModel.updateNote(noteId, fields)
        .then(onSuccess, handleError);
    };

    $scope.addNewNote = function () {
      if ($scope.showingNote) { $scope.closeNote();}

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
            $scope.cancelAddNote();
            onSuccess(response);
          },
          function (reason) {
            console.log("Can't save new note: ", reason);
          }
        );
    };

    $scope.removeNote = function (noteId) {

      console.log('deleting note: ', noteId);
      notesModel.removeNote(noteId)
        .then(onSuccess, handleError);

    };

    $scope.cancelAddNote = function () {
      $scope.addingNewNote = false;
      $scope.newNoteTitle = '';
      $scope.newNoteText = '';
    };
  });
