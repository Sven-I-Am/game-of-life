(function() {
    let interval;
    let isPaused = false;
    let generation = 0;
    let liveCells = 0;
    //let savedState=[];
    //let savedNeighbor=[];

    //document.getElementById('save').disabled=true;

    document.getElementById('random').addEventListener('click', function(){
        generation = 0;
        liveCells = 0;
        createRandom();
    })

    document.getElementById('blank').addEventListener('click', function(){
        generation = 0;
        liveCells = 0;
        createBlank();
    })

    document.getElementById('pause').addEventListener('click', function (){
        if (isPaused === false) {
            clearInterval(interval);
            isPaused = true;
            document.getElementById('pause').innerText = "play";
            //document.getElementById('save').disabled=false;
        } else {
            let rows = parseInt(document.getElementById('rows').value);
            let cols = parseInt(document.getElementById('cols').value);
            interval = setInterval(function(){
                simulate(rows, cols);
            },500)
            isPaused = false;
            document.getElementById('pause').innerText = "pause";
            //document.getElementById('save').disabled=true;
        }
    })


/*
    document.getElementById('save').addEventListener('click', function(){
        localStorage.clear();
        localStorage.rows=parseInt(document.getElementById('rows').value);
        localStorage.cols=parseInt(document.getElementById('cols').value);
        localStorage.generation=parseInt(document.getElementById('gen').innerText);
        localStorage.liveCells=parseInt(document.getElementById('live').innerText);

        let sRows = localStorage.rows;
        let sCols = localStorage.cols;

        for (let i=0; i<sCols;i++) {
            for (let j = 0; j < sRows; j++) {
                let cell = document.getElementById('['+i+']['+j+']');
                let state = cell.value;
                let neighbor = cell.innerText;
                savedState.push(state);
                savedNeighbor.push(neighbor);
            }
        }

        localStorage.savedState = savedState;
        localStorage.savedNeighbor = savedNeighbor;
        console.log('stored state:= ' + localStorage.savedState);
    })

    document.getElementById('load').addEventListener('click', function(){

        loadSaved();
        document.getElementById('gen').innerText = localStorage.generation;
        document.getElementById('live').innerText = localStorage.liveCells;
    })
*/
    function clickHandler() {
        if (this.value===0){
            this.value = 1;
            this.style.backgroundColor = 'black';
            liveCells++;
        } else {
            this.value = 0;
            this.style.backgroundColor = 'white';
            liveCells--;
        }
        document.getElementById('live').innerText = liveCells;
    }

    function createRandom() {
        clearInterval(interval);
        isPaused = true;
        document.getElementById('pause').innerText = "play";
        let rows = parseInt(document.getElementById('rows').value);
        let cols = parseInt(document.getElementById('cols').value);
        console.log('rows: ' + rows);
        console.log('cols: ' + cols);
        let target = document.getElementById("target");
        target.innerHTML ='';
        let table = document.createElement("table");
        for (let i=0; i<rows;i++){
            let row = table.insertRow(i);
            for (let j=0; j<cols; j++){
                let cell = row.insertCell(j);
                cell.id = createID(i,j);
                cell.value = Math.floor(Math.random()*2);
                if (cell.value===1){
                    cell.style.backgroundColor = "black";
                    liveCells++;
                }
            }
        }
        target.appendChild(table);
        document.getElementById('counters').style.visibility = 'visible';
        document.getElementById('gen').innerText = generation;
        document.getElementById('live').innerText = liveCells;
        countNeighbors(rows, cols);
        //document.getElementById('save').disabled=false;
    }

    function createBlank() {
        clearInterval(interval);
        isPaused = true;
        document.getElementById('pause').innerText = "play";
        let rows = parseInt(document.getElementById('rows').value);
        let cols = parseInt(document.getElementById('cols').value);
        console.log('rows: ' + rows);
        console.log('cols: ' + cols);
        let target = document.getElementById("target");
        target.innerHTML ='';
        let table = document.createElement("table");
        for (let i=0; i<rows;i++){
            let row = table.insertRow(i);
            for (let j=0; j<cols; j++){
                let cell = row.insertCell(j);
                cell.id = createID(i,j);
                cell.value = 0;
            }
        }
        target.appendChild(table);
        document.querySelectorAll('td').forEach(e => e.addEventListener("click", clickHandler));
        document.getElementById('counters').style.visibility = 'visible';
        document.getElementById('gen').innerText = generation;
        document.getElementById('live').innerText = liveCells;
        countNeighbors(rows, cols);
       // document.getElementById('save').disabled=true;
    }
/*
    function loadSaved() {
        clearInterval(interval);
        isPaused = true;
        document.getElementById('pause').innerText = "play";
        let rows = localStorage.rows;
        let cols = localStorage.cols;
        console.log('rows: ' + rows);
        console.log('cols: ' + cols);
        let loadState = localStorage.savedState;
        console.log('stored state:= ' + loadState);
        let loadNeighbor = localStorage.savedNeighbor;
        loadState = loadState.split(',');
        loadNeighbor = loadNeighbor.split(',');
        let pos = 0;
        let target = document.getElementById("target");
        target.innerHTML ='';
        let table = document.createElement("table");
        for (let i=0; i<rows;i++){
            let row = table.insertRow(i);
            for (let j=0; j<cols; j++){
                let cell = row.insertCell(j);
                cell.id = '['+j+']['+i+']';
                cell.value = parseInt(loadState[pos]);
                cell.innerText = parseInt(loadNeighbor[pos]);
                if (cell.value===1){
                    cell.style.backgroundColor = "black";
                }
                pos++;
            }
        }
        target.appendChild(table);
        document.querySelectorAll('td').forEach(e => e.addEventListener("click", clickHandler));
        document.getElementById('counters').style.visibility = 'visible';
        document.getElementById('gen').innerText = generation;
        document.getElementById('live').innerText = liveCells;
        document.getElementById('save').disabled=true;
    }
*/


    function createID(y, x){
        return ('['+x+']['+y+']');
    }

    function simulate (rows, cols) {
        //savedState=[];
        liveCells = 0;
        countNeighbors(rows, cols);
        for (let i=0; i<cols;i++) {
            for (let j = 0; j < rows; j++) {
                let cell = document.getElementById('['+i+']['+j+']');

                let currentState = cell.value;

                let neighbors = parseInt(cell.innerText);

                let newState;


                if (currentState===0 && neighbors===3){
                    newState = 1;

                } else if (currentState === 1 && (neighbors < 2 || neighbors > 3)) {
                    newState =0;

                } else {
                    newState = currentState;
                }

               // console.log(cell.id + ' - ' + currentState + ' - ' + neighbors + ' - ' + newState);
                cell.value=newState;
                if (cell.value===1){
                    cell.style.backgroundColor = "black";
                    liveCells++;
                } else {
                    cell.style.backgroundColor = "white";

                }
                if (currentState!==newState && newState===0){
                    cell.style.color="red";
                } else if (currentState!==newState && newState===1){
                    cell.style.color="green";
                } else {
                    cell.style.color="gray";
                }
                //savedState = savedState.push(currentState);
                //localStorage.savedState=savedState;
                currentState = newState;

                //console.log(localStorage.savedState);
            }
        }
        generation++;
        document.getElementById('gen').innerText = generation;
        document.getElementById('live').innerText = liveCells;
    }

    function countNeighbors(rows, cols) {
        for (let i=0; i<cols;i++){
            for (let j=0; j<rows; j++){
                let x = (i+cols)%cols;
                let y = (j+rows)%rows;
                let sum =0;
                let cell = document.getElementById('['+i+']['+j+']');
                if (x===0 || y===0 || x+1===cols || y+1===rows){
                    if (x===0 && y===0){
                        var a = '['+ (x - 1 + cols) +'][' + (y-1 + rows) + ']';
                        var b = '[' + x + '][' + (y -1 + rows)+']';
                        var c = '[' + (x + 1) + '][' + (y - 1 + rows)+']';
                        var d = '[' + (x - 1 + cols) + '][' + y + ']';
                        var e = '[' + (x + 1) + '][' + y + ']';
                        var f = '[' + (x - 1 + cols) + '][' + (y + 1) + ']';
                        var g = '[' + x + '][' + (y + 1) + ']';
                        var h = '[' + (x + 1) + '][' + (y + 1) + ']';

                       // cell.style.backgroundColor = "red";
                    } else if (x===0 && y+1!==rows && y!==0) {
                        a = '['+ (x - 1 + cols) +'][' + (y-1) + ']';
                        b = '[' + x + '][' + (y -1)+']';
                        c = '[' + (x + 1) + '][' + (y - 1)+']';
                        d = '[' + (x - 1 + cols) + '][' + y + ']';
                        e = '[' + (x + 1) + '][' + y + ']';
                        f = '[' + (x - 1 + cols) + '][' + (y + 1) + ']';
                        g = '[' + x + '][' + (y + 1) + ']';
                        h = '[' + (x + 1) + '][' + (y + 1) + ']';
                       // cell.style.backgroundColor = "orange";
                    } else if (x===0 && y+1===rows){
                        a = '['+ (x - 1 +cols) +'][' + (y-1) + ']';
                        b = '[' + x + '][' + (y -1)+']';
                        console.log(b);
                        c = '[' + (x + 1) + '][' + (y - 1)+']';
                        d = '[' + (x - 1+cols) + '][' + y + ']';
                        e = '[' + (x + 1) + '][' + y + ']';
                        f = '[' + (x - 1+cols) + '][' + (y + 1-rows) + ']';
                        g = '[' + x + '][' + (y + 1-rows) + ']';
                        h = '[' + (x + 1) + '][' + (y + 1-rows) + ']';
                       // cell.style.backgroundColor = "yellow";
                    } else if (x!==0 && x+1!==cols && y+1===rows){
                        a = '['+ (x - 1) +'][' + (y-1) + ']';
                        b = '[' + x + '][' + (y -1)+']';
                        c = '[' + (x + 1) + '][' + (y - 1)+']';
                        d = '[' + (x - 1) + '][' + y + ']';
                        e = '[' + (x + 1) + '][' + y + ']';
                        f = '[' + (x - 1) + '][' + (y + 1 - rows) + ']';
                        g = '[' + x + '][' + (y + 1 - rows) + ']';
                        h = '[' + (x + 1) + '][' + (y + 1 - rows) + ']';
                       // cell.style.backgroundColor = "green";
                    } else if (x+1===cols && y+1===rows){
                        a = '['+ (x - 1) +'][' + (y-1) + ']';
                        b = '[' + x + '][' + (y -1)+']';
                        c = '[' + (x + 1-cols) + '][' + (y - 1)+']';
                        d = '[' + (x - 1) + '][' + y + ']';
                        e = '[' + (x + 1-cols) + '][' + y + ']';
                        f = '[' + (x - 1) + '][' + (y + 1 - rows) + ']';
                        g = '[' + x + '][' + (y + 1 - rows) + ']';
                        h = '[' + (x + 1-cols) + '][' + (y + 1 - rows) + ']';
                       // cell.style.backgroundColor = "blue";
                    } else if (x+1===cols && y+1!==rows && y!==0){
                        a = '['+ (x - 1) +'][' + (y-1) + ']';
                        b = '[' + x + '][' + (y -1)+']';
                        c = '[' + (x + 1-cols) + '][' + (y - 1)+']';
                        d = '[' + (x - 1) + '][' + y + ']';
                        e = '[' + (x + 1-cols) + '][' + y + ']';
                        f = '[' + (x - 1) + '][' + (y + 1) + ']';
                        g = '[' + x + '][' + (y + 1) + ']';
                        h = '[' + (x + 1-cols) + '][' + (y + 1) + ']';
                       // cell.style.backgroundColor = "purple";
                    } else if (x+1===cols && y===0){
                        a = '['+ (x - 1) +'][' + (y-1+rows) + ']';
                        b = '[' + x + '][' + (y -1+rows)+']';
                        c = '[' + (x + 1-cols) + '][' + (y - 1+rows)+']';
                        d = '[' + (x - 1) + '][' + y + ']';
                        e = '[' + (x + 1-cols) + '][' + y + ']';
                        f = '[' + (x - 1) + '][' + (y + 1) + ']';
                        g = '[' + x + '][' + (y + 1) + ']';
                        h = '[' + (x + 1-cols) + '][' + (y + 1) + ']';
                       // cell.style.backgroundColor = "pink";
                    } else if (y===0 && x!==0 && x+1!==cols){
                        a = '['+ (x - 1) +'][' + (y-1+rows) + ']';
                        b = '[' + x + '][' + (y -1+rows)+']';
                        c = '[' + (x + 1) + '][' + (y - 1+rows)+']';
                        d = '[' + (x - 1) + '][' + y + ']';
                        e = '[' + (x + 1) + '][' + y + ']';
                        f = '[' + (x - 1) + '][' + (y + 1) + ']';
                        g = '[' + x + '][' + (y + 1) + ']';
                        h = '[' + (x + 1) + '][' + (y + 1) + ']';
                       // cell.style.backgroundColor = "powderblue";
                    } else {
                            sum = 0;
                       // cell.style.backgroundColor = "beige";
                    }

                } else {
                    a = '['+ (x - 1) +'][' + (y-1) + ']';
                    b = '[' + x + '][' + (y -1)+']';
                    c = '[' + (x + 1) + '][' + (y - 1)+']';
                    d = '[' + (x - 1) + '][' + y + ']';
                    e = '[' + (x + 1) + '][' + y + ']';
                    f = '[' + (x - 1) + '][' + (y + 1) + ']';
                    g = '[' + x + '][' + (y + 1) + ']';
                    h = '[' + (x + 1) + '][' + (y + 1) + ']';
                    //document.getElementById(a).style.backgroundColor = "blue";
                    //document.getElementById(b).style.backgroundColor = "red";
                    //document.getElementById(c).style.backgroundColor = "green";
                    //document.getElementById(d).style.backgroundColor = "yellow";
                    //document.getElementById(e).style.backgroundColor = "purple";
                    //document.getElementById(f).style.backgroundColor = "powderblue";
                    //document.getElementById(g).style.backgroundColor = "pink";
                    //document.getElementById(h).style.backgroundColor = "cadetblue";
                }
                sum += document.getElementById(a).value;
                sum += document.getElementById(b).value;
                sum += document.getElementById(c).value;
                sum += document.getElementById(d).value;
                sum += document.getElementById(e).value;
                sum += document.getElementById(f).value;
                sum += document.getElementById(g).value;
                sum += document.getElementById(h).value;
                cell.innerText = sum;
            }
        }
    }

})();