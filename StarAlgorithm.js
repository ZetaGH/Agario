class Astar {
    constructor(start,end){
        this.start = start;
        this.end = end;
        this.open = [];
        this.close = [];
        this.success = false;
        this.noSolution = false;
        this.open.push(this.start);
        this.path = []
    }
    
    FindLowestCost(arr){
        let lowestCost = 0
        for (let i = 0 ; i < arr.length ; i++){
            if(arr[i].f < arr[lowestCost].f){
                lowestCost=i;
            }
        }
        return lowestCost;
    }
    removeFromArray(arr , elt){
        for ( var i = arr.length ; i >= 0 ; i--){
            if (arr[i] == elt){
                arr.splice(i,1);
            }
        }
    }
    gFunction(start,current){
        let d = dist(start.x,start.y,current.x,current.y)
        return d;
    }
    heuristic(current , end){
        let d = dist(current.x,current.y,end.x,end.y);
        return d;
    }
    run(){
        let actual_start = this.start;
        let actual_end = this.end;
        
        if(this.start !== actual_start && this.end !== actual_end){
            console.log('Se cambio de inicio y final');
            return;
        }
    
        if (this.open.length>0){
            
            let lowestCost = this.FindLowestCost(this.open);
            let current = this.open[lowestCost];
            this.removeFromArray(this.open,current);
            this.close.push(current);

            if(current === this.end){
                this.success = true;
                console.log('Success is True Were Done!! ByZetaGHost')
               
                var temp = current;
                this.path.push(temp);
                //console.log(this.path);
                while(temp.previous){
                    this.path.push(temp.previous); 
                    temp = temp.previous;
                }  
                           
                //  noLoop();
            }

            current.neighbors.forEach(element => {
                if (this.close.includes(element) === false && !element.wall){
                    //element.f = gFunction(this.start,current)+heuristic(current,this.end);
                    var tempG = current.g + 50;//element.g

                    var newPath = 1;

                    if (this.open.includes(element)){
                        if(tempG < element.g){
                            element.g = tempG;
                            newPath=true;
                        }
                    }
                    else{
                        element.g = tempG;
                        newPath = true;
                        this.open.push(element);
                    }

                    if(newPath){
                        element.h = this.heuristic(element,this.end);
                        element.f = element.g + element.h;
                        element.previous = current;
                    }
                }
            });
        }
        else{
            this.noSolution = false;
            console.log('No hay solucion');
            noLoop();
        }
        
        for ( let i = 0 ; i < this.open.length;i++){
            this.open[i].red=0;
            this.open[i].green=255;
            this.open[i].blue=0;
        }
    
        for ( let i = 0 ; i < this.close.length;i++){
            this.close[i].red=255;
            this.close[i].green=0;
            this.close[i].blue=0;
        }
        for (var i = 0 ; i < this.path.length;i++){
            this.path[i].red = 0;
            this.path[i].green = 0;
            this.path[i].blue = 255;
        }

        // stroke(0,255,0);
        // beginShape();
        //     for (var i = 0 ; i < this.path.length;i++){
        //         vertex(this.path[i].i * 50 , this.path[i].j * 50)
        //     }
        // endShape();

    }
}