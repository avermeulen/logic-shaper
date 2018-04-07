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

    var createShapeElement = function(currentShape){

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

    function createShape(){
        var currentShape = {
            type : randomShape(),
            color : randomColor(),
            //number :         
        };
        return currentShape;
    }

    function createShapes(){
        var shapes = [];
        var shapesElem = document.querySelector('.shapes');
        shapesElem.innerHTML = "";
        for (var i = 0; i < 125; i++) {
            let shape = createShape();
            shapes.push(shape);
            shapesElem.appendChild(createShapeElement(shape));
        }
        return shapes;
    }


    document.addEventListener('DOMContentLoaded', function(){
        //
        var dataset = createShapes();

        let refreshButton = document.querySelector('.refresh');
        refreshButton.addEventListener('click', function(){
            dataset = createShapes()
        });

        let executeButton = document.querySelector('.execute');
        let code = document.querySelector('.code');

        var codeTextArea = document.querySelector(".code");
        var editor = CodeMirror.fromTextArea(codeTextArea, {
            lineNumbers: true,
            matchBrackets : true,
            mode : 'javascript',
            theme : 'monokai'
        });

        var consoleArea = document.querySelector('.console');

        console.log = function(msg){
            consoleArea.innerHTML = JSON.stringify(msg);
        }

        executeButton.addEventListener('click', function(){
            //console.log(codeTextArea.getValue());

            var theCode = editor.getValue();

            //createShapes()
            //var execCode = new Function(theCode);
            //execCode(dataset);
            eval(theCode);
        });



    });

    // editor.setOption('mode', 'javascript');


})();
