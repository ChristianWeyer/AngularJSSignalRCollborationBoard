app.directive('stickyNote', function (collabPushService) {
	var linker = function(scope, element, attrs) {
			element.draggable({
				stop: function(event, ui) {
				    collabPushService.invoke('moveNote', {
						id: scope.note.id,
						x: ui.position.left,
						y: ui.position.top
					});
				}
			});

			collabPushService.on('onNoteMoved', function (data) {
				if(data.id == scope.note.id) {
					element.animate({
						left: data.x,
						top: data.y
					});
				}
			});

			element.css('left', '10px');
			element.css('top', '50px');
			element.hide().fadeIn();
		};

	var controller = function($scope) {
	    collabPushService.on('onNoteUpdated', function (data) {
				if(data.id == $scope.note.id) {
					$scope.note.title = data.title;
					$scope.note.body = data.body;
				}				
			});

			$scope.updateNote = function(note) {
			    collabPushService.invoke('updateNote', note);
			};

			$scope.deleteNote = function(id) {
				$scope.ondelete({
					id: id
				});
			};
		};

	return {
		restrict: 'A',
		link: linker,
		controller: controller,
		scope: {
			note: '=',
			ondelete: '&'
		}
	};
});
