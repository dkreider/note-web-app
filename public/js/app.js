const noteApp = angular.module("noteApp", []);

noteApp.controller("noteController", function($scope, $http) {

    $scope.notes = [];

    $scope.loadNotes = function() {
        $http({
            method: "GET",
            url: "api/notes"
        }).then(function successCallback(response) {
            $scope.notes = response.data;
        }, function errorCallback(error) {
            if (error.data.message) {
                M.toast({'html': error.data.message}, 3000);
            }
        });
    };

    $scope.loadNote = function(noteId) {
        $http({
            method: "GET",
            url: "api/note/" + noteId
        }).then (function successCallback(response) {
            $scope.selectedNoteId = response.data._id;
            $scope.selectedNoteTitle = response.data.noteTitle;
            $scope.selectedNoteText = response.data.noteText;
        }, function errorCallback(error) {
            if (error.data.message) {
                M.toast({'html': error.data.message}, 3000);
            }
        });
    };

    $scope.updateNote = function() {
        $http({
            method: "PUT",
            url: "api/note",
            params: {
                "noteId": $scope.selectedNoteId
            },
            data: {
                "noteTitle": $scope.selectedNoteTitle,
                "noteText": $scope.selectedNoteText
            }
        }).then(function successCallback(response) {
            M.toast({'html': 'Successfully updated note.'}, 3000);
            $scope.loadNotes();
        }, function errorCallback(error) {
            if (error.data.message) {
                M.toast({'html': error.data.message}, 3000);
            }
        });
    }

    $scope.deleteNote = function(noteId) {
        $http({
            method: "DELETE",
            url: "api/note/" + noteId,
        }).then(function successCallback(response) {
            M.toast({'html': 'Successfully deleted note.'}, 3000);
            $scope.loadNotes();
        }, function errorCallback(error) {
            if (error.data.message) {
                M.toast({'html': error.data.message}, 3000);
            }
        });
    }

});

noteApp.controller("addNoteController", function($scope, $http) {

    $scope.saveNote = function() {
        $http({
            method: "POST",
            url: "api/note",
            data: {
                noteTitle: $scope.noteTitle,                
                noteText: $scope.noteText
            }
        }).then(function successCallback(response) {
            M.toast({'html': 'Successfully saved note.'}, 3000);
            $scope.loadNotes();
        }, function errorCallback(error) {
            if (error.data.message) {
                M.toast({'html': error.data.message}, 3000);
            }
        });
    }

});