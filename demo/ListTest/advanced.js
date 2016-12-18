angular.module("demo").controller("TestController", function ($scope, $log) {
    $scope.schedules = [
        { id: 1, type: 'Src', label: 'A' },
        { id: 2, type: 'Src', label: 'B' },
        { id: 3, type: 'Src', label: 'C' },
        { id: 4, type: 'Src', label: 'D' },
    ];

    $scope.roations = [
       { id: 1, type: 'Dest', label: 'P' },
       { id: 2, type: 'Dest', label: 'Q' },
       { id: 3, type: 'Dest', label: 'R' },
       { id: 4, type: 'Dest', label: 'S' },
    ];


    $scope.dragoverCallback = function (event, index, external, type) {
        // $log.info("DragOver");
        // $log.info(event.srcElement.parentElement.id);
        // $scope.logListEvent('dragged over', event, index, external, type);
        // Disallow dropping in the third row. Could also be done with dnd-disable-if.
        return true;
    };

    $scope.dropCallback = function (event, index, item, external, type, allowedType) {
        $log.info("Drop");
        $log.info(event.srcElement.parentElement.id);
        $scope.targetId = event.srcElement.parentElement.id;
        var element = event.srcElement.parentElement;
        if (element.id === "scheduleContainer") return false;
        if ($scope.targetId === $scope.sourceId && element.id === "roationContainer") {
            var oldIndex = $scope.roations.indexOf(item);
            var oldItem = $scope.roations.splice(index, 1);
            var newItem = item;

            return item;
        }
        if ($scope.targetId === $scope.sourceId) return false;

        return item;
    };

    $scope.dragStart = function (event, index, item, external, type, allowedType) {
        $log.info("Drag Start");
        $log.info(event.srcElement.parentElement.id);
        $scope.sourceId = event.srcElement.parentElement.id;
    }

    $scope.logEvent = function (message, event) {
        console.log(message, '(triggered by the following', event.type, 'event)');
        console.log(event);
    };

    $scope.logListEvent = function (action, event, index, external, type) {
        var message = external ? 'External ' : '';
        message += type + ' element is ' + action + ' position ' + index;
        $scope.logEvent(message, event);
    };

    $scope.model = [];

    // Initialize model
    var id = 10;
    for (var i = 0; i < 3; ++i) {
        $scope.model.push([]);
        for (var j = 0; j < 2; ++j) {
            $scope.model[i].push([]);
            for (var k = 0; k < 7; ++k) {
                $scope.model[i][j].push({ label: 'Item ' + id++ });
            }
        }
    }

    $scope.$watch('model', function (model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

});
