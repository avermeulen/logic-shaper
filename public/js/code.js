(function(){

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
        var shapes = createShapes();

        let refreshButton = document.querySelector('.refresh');
        refreshButton.addEventListener('click', function(){
            shapes = createShapes();
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

        let instructions = document.querySelector(".instructionText");
        let showInstructions = document.querySelector('.showInstructions');
        let instructionsEditor = CodeMirror.fromTextArea(instructions, {
            lineNumbers: true,
            matchBrackets : true,
            mode : 'markdown',
            theme : 'monokai'
        });

        let showButton = document.querySelector('.show');
        showButton.addEventListener('click', function(){
            //shapes = createShapes();
            showInstructions.innerHTML = marked(instructionsEditor.getValue());
        });

        var consoleArea = document.querySelector('.console');

        console.log = function(msg){
            consoleArea.innerHTML = JSON.stringify(msg);
        }

        executeButton.addEventListener('click', function(){
            var theCode = editor.getValue();
            eval(theCode);
        });
    });
    // editor.setOption('mode', 'javascript');
})();
