/**
 * Created by u53686 on 08/03/2017.
 */

ModalCommentCtrl.$inject = ['$uibModalInstance', 'comment']
function ModalCommentCtrl($uibModalInstance, comment) {
  var ctrl = this;
  ctrl.comment = comment;
  ctrl.commentCopy = angular.copy(ctrl.comment);

  ctrl.ok = function () {
    angular.forEach(ctrl.commentCopy, function (val, key) {
      ctrl.comment[key] = val
    })
    $uibModalInstance.close();
  };

  ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  ctrl.clickEvent = function (e) {
    if(e.keyCode === 13)
      ctrl.ok();
  }
}

angular.module('app')
  .controller('ModalCommentCtrl', ModalCommentCtrl)
