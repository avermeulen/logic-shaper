function createShape(){
    var randomShape = function(){
        var randomNumber = Math.random() * 100;
        if (randomNumber < 33){
            return 'triangle'
        }
        else if (randomNumber > 33 && randomNumber < 66){
            return 'circle'
        }
        return 'square';
    };

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
    };

    var currentShape = {
        type : randomShape(),
        color : randomColor(),
        //number :         
    };
    return currentShape;
}