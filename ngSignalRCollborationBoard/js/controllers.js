app.controller('MainCtrl', function ($scope, collabPushService) {
	$scope.notes = [];

	collabPushService.on('onNoteCreated', function (data) {
		$scope.notes.push(data);
	});

	collabPushService.on('onNoteDeleted', function (data) {
		$scope.handleDeletedNoted(data.id);
	});

	$scope.createNote = function() {
		var note = {
			id: new Date().getTime(),
			title: 'New Note',
			body: 'Pending'
		};

		$scope.notes.push(note);
		collabPushService.invoke('createNote', note);
	};

	$scope.deleteNote = function(id) {
		$scope.handleDeletedNoted(id);

		collabPushService.invoke('deleteNote', { id: id });
	};

    $scope.handleDeletedNoted = function(id) {
        var oldNotes = $scope.notes,
            newNotes = [];

        angular.forEach(oldNotes, function(note) {
            if (note.id !== id) newNotes.push(note);
        });

        $scope.notes = newNotes;
    };
});