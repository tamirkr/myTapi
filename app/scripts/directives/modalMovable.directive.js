/**
 * Created by u53686 on 21/03/2017.
 */
modalMovable.$inject = ['$document'];

function modalMovable($document) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var startX = 0, startY = 0, x = 0, y = 0;
            var dialogWrapper = element.parent();
            console.log(dialogWrapper)
            dialogWrapper.css({
                position: 'relative'
            });

            dialogWrapper.on('mousedown', function (e) {
                e.preventDefault();
                startX = e.pageX - x;
                startY = e.pageY - y;
                console.log("startX: " + startX + " startY: " + startY);
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(e) {
                y = e.pageY - startY;
                x = e.pageX - startX;
                console.log("x: " + x + "y: " + y);

                dialogWrapper.css({
                    top: y + 'px',
                    left: x + 'px'
                });
            }

            function mouseup() {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
            }
        }
    }
}

angular.module('app')
    .directive('modalMovable', modalMovable);