//入力
let a = [[0,0,0,2,0],
         [2,0,2,1,0],
         [1,0,4,1,0],
         [2,0,4,3,1],
         [3,0,1,2,1]]
//出力
let b = [[0,0,2,0,0],
         [2,2,1,0,0],
         [1,4,1,0,0],
         [2,4,3,1,0],
         [3,1,2,1,0]]

let visited = [];
for (let i = 0; i < a.length; i++){
    let row = [];
    for (let j = 0; j < a[0].length; j++){
        row.push(0);
    }
    visited.push(row)
}

let kekkax = 0
for (let x = 0; x < a[0].length; x++){
    let zero = true
    for (let y = 0; y < a.length; y++){
        if (a[y][x] !== 0){
            zero = false
            break;
        }
    }
    if (zero === false){
        for (let y = 0; y < a.length; y++){
            visited[y][kekkax] = a[y][x];
        }
        kekkax += 1
    }
}
console.log(visited)
