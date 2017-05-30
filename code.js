(function(){

    var randomShape = function(){
        var randomNumber = Math.random() * 100;

        if (randomNumber < 33){
            return 'triangle'
        }
        else if (randomNumber > 33 && randomNumber < 66){
            return 'circle'
        }

        return ''
    }

    var createShape = function(){
        let elem = document.createElement('div');
        elem.classList.add('shape');
        var shape = randomShape();
        if (shape !== ''){
            elem.classList.add(shape);
        }
        return elem;
    }

    var createShapes = function(){
        var shapes = document.querySelector('.shapes');
        shapes.innerHTML = "";
        for (var i = 0; i < 110; i++) {
            let shape = createShape();
            shapes.appendChild(shape);
        }
    }


    document.addEventListener('DOMContentLoaded', function(){
        //
        createShapes();

        let refreshButton = document.querySelector('.refresh');
        refreshButton.addEventListener('click', function(){
            createShapes()
        });

        let executeButton = document.querySelector('.execute');
        let code = document.querySelector('.code');
        executeButton.addEventListener('click', function(){
            console.log(code.value);

            var theCode = code.value;

            //createShapes()
            var execCode = new Function(theCode);
            execCode();
        });



    });



})();
