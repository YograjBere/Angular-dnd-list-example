angular.module("demo").controller("SimpleDemoController", function ($scope, $log) {

    $scope.models = {
        selected: null,
        lists: { "A": [], "B": [] }
    };

    $scope.dragoverCallback = function (event, index, external, type) {
        $log.info(event, index, external, type);
    }

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.A.push({ label: "Item A" + i });
        $scope.models.lists.B.push({ label: "Item B" + i });
    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function (model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

});
