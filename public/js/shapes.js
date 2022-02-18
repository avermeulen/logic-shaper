function createShape(){

    const randomSize = function() {
        var randomNumber = Math.random() * 2;
        
        if (randomNumber > 1 && randomNumber < 2){
            return 'medium'
        }
        else if (randomNumber > 2 && randomNumber < 3){
            return 'large'
        }

        return 'small';
    }

    const randomShape = function(){
        var randomNumber = Math.random() * 100;
        if (randomNumber < 33){
            return 'triangle'
        }
        else if (randomNumber > 33 && randomNumber < 66){
            return 'circle'
        }
        return 'square';
    };

    const randomColor = function(){
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
        number : Math.floor(Math.random() * 10),
        size : randomSize()
    };
    return currentShape;
}