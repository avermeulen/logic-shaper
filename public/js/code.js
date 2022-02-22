
document.addEventListener("DOMContentLoaded", function () {

    let shapes = [];
    let functioName = "";
    // let instructions = "";

    function setPuzzleData(data) {
        functioName = data.function_name;
        instructions = data.instructions;
        showInstructions.innerHTML = marked.parse(instructions);
    }

    var createShapeElement = function (currentShape) {

        let elem = document.createElement('div');
        elem.classList.add('shape');
        var shape = currentShape.type;
        if (shape !== '') {
            elem.classList.add(shape);
        }

        elem.classList.add(currentShape.color);
        // elem.classList.add(currentShape.size);

        if (shape === 'triangle') {
            elem.classList.add(shape);
            elem.classList.add(currentShape.color + "-triangle");
        }



        elem.innerHTML = "<div class='number' >" + currentShape.number + "</div>";

        return elem;
    }

    function createShapes() {

        // create an empty list of shapes
        shapes = [];
        var shapesElem = document.querySelector('.shapes');
        shapesElem.innerHTML = "";

        const shapeCount = Math.ceil((Math.random() * 125))

        for (var i = 0; i < shapeCount; i++) {
            let shape = createShape();
            shapes.push(shape);
            // storeShape(shape);
            shapesElem.appendChild(createShapeElement(shape));
        }

        // console.log(shapes);
        return shapes;
    }



    var db = openDatabase('logic_shaper', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS shape (type, color, size, number)');
    });

    function storeShape(shape) {
        const sql = `insert into shape (type, color, size, number) values (?,?,?,?)`;

        db.transaction(function (tx) {
            tx.executeSql(sql, [shape.type, shape.color, shape.size, shape.number]);
        });
    }


    // document.addEventListener('DOMContentLoaded', function () {
        //
        shapes = createShapes();
        const notAllowed = ['.filter', '.map', '.find'];

        let refreshButton = document.querySelector('.refresh');
        refreshButton.addEventListener('click', function () {
            shapes = createShapes();
        });

        let executeButton = document.querySelector('.execute');
        // let code = document.querySelector('.code');

        var codeTextArea = document.querySelector(".code");
        var editor = CodeMirror.fromTextArea(codeTextArea, {
            lineNumbers: true,
            matchBrackets: true,
            mode: 'javascript',
            theme: 'monokai'
        });

        const storedCode = localStorage['code'];
        editor.getDoc().setValue(storedCode ? storedCode : '');


        // editor.on('change', function() {
        //     const notAllowedFunctionsUsed = notAllowed.some((n) => theCode.indexOf(n) !== -1 );
        //     if (notAllowedFunctionsUsed) {
        //         //executeButton.attributes.add('disabled');
        //     }
        //     else {
        //         // executeButton.attributes.remove('disabled');
        //     }
        // })

        // let instructionText = document.querySelector(".instructionText");
        let showInstructions = document.querySelector('.showInstructions');


        // let instructionsEditor = CodeMirror.fromTextArea(instructionText, {
        //     lineNumbers: true,
        //     matchBrackets: true,
        //     mode: 'markdown',
        //     theme: 'monokai'
        // });

        // showInstructions.addEventListener('click', function () {
        //     //shapes = createShapes();
        //     showInstructions.innerHTML = marked(instructionsEditor.getValue());
        // });


        let showButton = document.querySelector('.show');


        var consoleArea = document.querySelector('.console');

        console.log = function (msg) {
            consoleArea.innerHTML = JSON.stringify(msg);
        }

        executeButton.addEventListener('click', function () {

            try {
                // alert(editor);
                let theCode = editor.getValue();
                eval(theCode);

                localStorage['code'] = theCode;

                // let shapes = document.querySelectorAll('.shape');


                // if (notAllowedFunctionsUsed) {
                //     alert("You not allowed to use the " + notAllowed.join(', ') + " functions.")
                // }

                // shapes = Array.from(shapes).map(e => {
                //     return {
                //           shape: e.classList[1],
                //         color: e.classList[2]
                //     };
                //   });


                // console.log(shapes);


                let result = eval(`${functioName}(shapes);`);

                axios.post('/api/check-answer', {
                    answer: result,
                    dataset: shapes
                }).then(function (result) {
                    console.log(result.data);
                }).catch(function (err) {
                    console.log(err);
                });

            }
            catch (err) {
                console.log(err.stack);
            }

        });

        
        function handleHashChange(hash) {
            const parts = hash.split("/");
            const id = parts[parts.length - 1];

            axios.get(`/api/puzzle/${id}`)
                .then(function(result){
                    
                    const data = result.data;
                    setPuzzleData(data)

                    //todo - show message that new puzzle was loaded...


                });


        }

        window.addEventListener("hashchange", function (e) {
            // console.log(window.location.hash);
            handleHashChange(window.location.hash)
        });
    
        // console.log(window.location.hash);
        handleHashChange(window.location.hash)
    
});

