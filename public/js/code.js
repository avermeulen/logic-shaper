(function(){

    var randomShape = function(){
        var randomNumber = Math.random() * 100;

        if (randomNumber < 33){
            return 'triangle'
        }
        else if (randomNumber > 33 && randomNumber < 66){
            return 'circle'
        }

        return 'square';
    }

    var randomColor = function(){
        var randomNumber = Math.random() * 100;

        if (randomNumber < 21){
            return 'orange'
        }
        else if (randomNumber > 21 && randomNumber < 33){
            return 'green'
        }
        else if (randomNumber > 33 && randomNumber < 66){
            return 'red'
        }
        else if (randomNumber > 66 && randomNumber < 81){
            return 'blue'
        }
        else {
          return "yellow"
        }


    }

    var createShape = function(){

        var currentShape = {
            type : randomShape(),
            color : randomColor(),
            //number :         
        };

        let elem = document.createElement('div');
        elem.classList.add('shape');
        var shape = currentShape.type;
        if (shape !== ''){
            elem.classList.add(shape);
        }

        if (shape === 'triangle'){
            elem.classList.add(shape);
            elem.classList.add(currentShape.color + "-triangle");
        }
        elem.classList.add(currentShape.color);
        return elem;
    }

    var createShapes = function(){
        var shapes = document.querySelector('.shapes');
        shapes.innerHTML = "";
        for (var i = 0; i < 125; i++) {
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

    var codeTextArea = document.querySelector(".code");
    var editor = CodeMirror.fromTextArea(codeTextArea, {
        lineNumbers: true,
        matchBrackets : true,
        mode : 'javascript',
        theme : 'monokai'
    });

    // editor.setOption('mode', 'javascript');


})();
