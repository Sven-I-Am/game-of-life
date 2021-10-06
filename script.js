(function() {
    let interval;
    let isPaused = false;

    document.body.style.backgroundColor = "white";

    document.getElementById('pause').addEventListener('click', function (){
        if (isPaused === false) {
            clearInterval(interval);
            isPaused = true;
            document.getElementById('pause').innerText = "play";
        } else {
            let rows = parseInt(document.getElementById('rows').value);
            let cols = parseInt(document.getElementById('cols').value);
            interval = setInterval(function(){
                simulate(rows, cols);
            },500)
            isPaused = false;
            document.getElementById('pause').innerText = "pause";
        }

    })

    document.getElementById('create').addEventListener('click', function(){
        clearInterval(interval);
        isPaused = true;
        document.getElementById('pause').innerText = "play";
        let rows = parseInt(document.getElementById('rows').value);
        let cols = parseInt(document.getElementById('cols').value);
        console.log('rows: ' + rows);
        console.log('cols: ' + cols);
        let target = document.getElementById("target");
        target.innerHTML ='';
        createBoard(rows, cols);
        let board = createBoard(rows, cols);
        target.appendChild(board);
        countNeighbors(rows, cols);
    })



    function createBoard(rows, cols) {
        let table = document.createElement("table");
        for (let i=0; i<rows;i++){
            let row = table.insertRow(i);
            for (let j=0; j<cols; j++){
                let cell = row.insertCell(j);
                cell.id = createID(i,j);
                cell.value = Math.floor(Math.random()*2);
                if (cell.value===1){
                    cell.style.backgroundColor = "black";
                }
            }
        }
        return table;
    }

    function createID(y, x){
        return ('['+x+']['+y+']');
    }

    function simulate (rows, cols) {
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
                } else {
                    cell.style.backgroundColor = "white";
                }
                currentState = newState;
            }
        }
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
                        sum += document.getElementById(a).value;
                        sum += document.getElementById(b).value;
                        sum += document.getElementById(c).value;
                        sum += document.getElementById(d).value;
                        sum += document.getElementById(e).value;
                        sum += document.getElementById(f).value;
                        sum += document.getElementById(g).value;
                        sum += document.getElementById(h).value;
                        cell.style.backgroundColor = "red";
                    } else if (x===0 && y+1!==rows && y!==0) {
                        a = '['+ (x - 1 + cols) +'][' + (y-1) + ']';
                        b = '[' + x + '][' + (y -1)+']';
                        c = '[' + (x + 1) + '][' + (y - 1)+']';
                        d = '[' + (x - 1 + cols) + '][' + y + ']';
                        e = '[' + (x + 1) + '][' + y + ']';
                        f = '[' + (x - 1 + cols) + '][' + (y + 1) + ']';
                        g = '[' + x + '][' + (y + 1) + ']';
                        h = '[' + (x + 1) + '][' + (y + 1) + ']';
                        sum += document.getElementById(a).value;
                        sum += document.getElementById(b).value;
                        sum += document.getElementById(c).value;
                        sum += document.getElementById(d).value;
                        sum += document.getElementById(e).value;
                        sum += document.getElementById(f).value;
                        sum += document.getElementById(g).value;
                        sum += document.getElementById(h).value;
                        cell.style.backgroundColor = "orange";
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
                        sum += document.getElementById(a).value;
                        sum += document.getElementById(b).value;
                        sum += document.getElementById(c).value;
                        sum += document.getElementById(d).value;
                        sum += document.getElementById(e).value;
                        sum += document.getElementById(f).value;
                        sum += document.getElementById(g).value;
                        sum += document.getElementById(h).value;
                        cell.style.backgroundColor = "yellow";
                    } else if (x!==0 && x+1!==cols && y+1===rows){
                        a = '['+ (x - 1) +'][' + (y-1) + ']';
                        b = '[' + x + '][' + (y -1)+']';
                        c = '[' + (x + 1) + '][' + (y - 1)+']';
                        d = '[' + (x - 1) + '][' + y + ']';
                        e = '[' + (x + 1) + '][' + y + ']';
                        f = '[' + (x - 1) + '][' + (y + 1 - rows) + ']';
                        g = '[' + x + '][' + (y + 1 - rows) + ']';
                        h = '[' + (x + 1) + '][' + (y + 1 - rows) + ']';
                        sum += document.getElementById(a).value;
                        sum += document.getElementById(b).value;
                        sum += document.getElementById(c).value;
                        sum += document.getElementById(d).value;
                        sum += document.getElementById(e).value;
                        sum += document.getElementById(f).value;
                        sum += document.getElementById(g).value;
                        sum += document.getElementById(h).value;
                        cell.style.backgroundColor = "green";
                    } else if (x+1===cols && y+1===rows){
                        a = '['+ (x - 1) +'][' + (y-1) + ']';
                        b = '[' + x + '][' + (y -1)+']';
                        c = '[' + (x + 1-cols) + '][' + (y - 1)+']';
                        d = '[' + (x - 1) + '][' + y + ']';
                        e = '[' + (x + 1-cols) + '][' + y + ']';
                        f = '[' + (x - 1) + '][' + (y + 1 - rows) + ']';
                        g = '[' + x + '][' + (y + 1 - rows) + ']';
                        h = '[' + (x + 1-cols) + '][' + (y + 1 - rows) + ']';
                        sum += document.getElementById(a).value;
                        sum += document.getElementById(b).value;
                        sum += document.getElementById(c).value;
                        sum += document.getElementById(d).value;
                        sum += document.getElementById(e).value;
                        sum += document.getElementById(f).value;
                        sum += document.getElementById(g).value;
                        sum += document.getElementById(h).value;
                        cell.style.backgroundColor = "blue";
                    } else if (x+1===cols && y+1!==rows && y!==0){
                        a = '['+ (x - 1) +'][' + (y-1) + ']';
                        b = '[' + x + '][' + (y -1)+']';
                        c = '[' + (x + 1-cols) + '][' + (y - 1)+']';
                        d = '[' + (x - 1) + '][' + y + ']';
                        e = '[' + (x + 1-cols) + '][' + y + ']';
                        f = '[' + (x - 1) + '][' + (y + 1) + ']';
                        g = '[' + x + '][' + (y + 1) + ']';
                        h = '[' + (x + 1-cols) + '][' + (y + 1) + ']';
                        sum += document.getElementById(a).value;
                        sum += document.getElementById(b).value;
                        sum += document.getElementById(c).value;
                        sum += document.getElementById(d).value;
                        sum += document.getElementById(e).value;
                        sum += document.getElementById(f).value;
                        sum += document.getElementById(g).value;
                        sum += document.getElementById(h).value;
                        cell.style.backgroundColor = "purple";
                    } else if (x+1===cols && y===0){
                        a = '['+ (x - 1) +'][' + (y-1+rows) + ']';
                        b = '[' + x + '][' + (y -1+rows)+']';
                        c = '[' + (x + 1-cols) + '][' + (y - 1+rows)+']';
                        d = '[' + (x - 1) + '][' + y + ']';
                        e = '[' + (x + 1-cols) + '][' + y + ']';
                        f = '[' + (x - 1) + '][' + (y + 1) + ']';
                        g = '[' + x + '][' + (y + 1) + ']';
                        h = '[' + (x + 1-cols) + '][' + (y + 1) + ']';
                        sum += document.getElementById(a).value;
                        sum += document.getElementById(b).value;
                        sum += document.getElementById(c).value;
                        sum += document.getElementById(d).value;
                        sum += document.getElementById(e).value;
                        sum += document.getElementById(f).value;
                        sum += document.getElementById(g).value;
                        sum += document.getElementById(h).value;
                        cell.style.backgroundColor = "pink";
                    } else if (y===0 && x!==0 && x+1!==cols){
                        a = '['+ (x - 1) +'][' + (y-1+rows) + ']';
                        b = '[' + x + '][' + (y -1+rows)+']';
                        c = '[' + (x + 1) + '][' + (y - 1+rows)+']';
                        d = '[' + (x - 1) + '][' + y + ']';
                        e = '[' + (x + 1) + '][' + y + ']';
                        f = '[' + (x - 1) + '][' + (y + 1) + ']';
                        g = '[' + x + '][' + (y + 1) + ']';
                        h = '[' + (x + 1) + '][' + (y + 1) + ']';
                        sum += document.getElementById(a).value;
                        sum += document.getElementById(b).value;
                        sum += document.getElementById(c).value;
                        sum += document.getElementById(d).value;
                        sum += document.getElementById(e).value;
                        sum += document.getElementById(f).value;
                        sum += document.getElementById(g).value;
                        sum += document.getElementById(h).value;
                        cell.style.backgroundColor = "powderblue";
                    } else {
                            sum = 0;
                        cell.style.backgroundColor = "beige";
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
                    sum += document.getElementById(a).value;
                    //document.getElementById(a).style.backgroundColor = "blue";
                    sum += document.getElementById(b).value;
                    //document.getElementById(b).style.backgroundColor = "red";
                    sum += document.getElementById(c).value;
                    //document.getElementById(c).style.backgroundColor = "green";
                    sum += document.getElementById(d).value;
                    //document.getElementById(d).style.backgroundColor = "yellow";
                    sum += document.getElementById(e).value;
                    //document.getElementById(e).style.backgroundColor = "purple";
                    sum += document.getElementById(f).value;
                    //document.getElementById(f).style.backgroundColor = "powderblue";
                    sum += document.getElementById(g).value;
                    //document.getElementById(g).style.backgroundColor = "pink";
                    sum += document.getElementById(h).value;
                    //document.getElementById(h).style.backgroundColor = "cadetblue";
                }
                cell.innerText = sum;
            }
        }
    }

})();