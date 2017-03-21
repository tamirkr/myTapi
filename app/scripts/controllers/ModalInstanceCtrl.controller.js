
ModalInstanceCtrl.$inject = ['$uibModalInstance', 'item', 'SweetAlert']
function ModalInstanceCtrl($uibModalInstance, item, SweetAlert) {
    var ctrl = this;
    ctrl.user = item;
    ctrl.userCopy = angular.copy(ctrl.user);
    
    ctrl.ok = function () {
        angular.forEach(ctrl.userCopy, function (val, key) {
            ctrl.user[key] = val
        })
        SweetAlert.swal('עודכן בהצלחה');
        $uibModalInstance.close();
    };

    ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

angular.module('app')
    .controller('ModalInstanceCtrl', ModalInstanceCtrl)