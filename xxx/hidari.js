let a = [[1,0,0,2,0],
         [2,1,2,0,0],
         [1,0,4,0,0],
         [0,1,4,0,0],
         [3,3,0,0,1]]

let visited = [];
for (let i = 0; i < a.length; i++){
    let row = [];
    for (let j = 0; j < a[0].length; j++){
        row.push(0);
    }
    visited.push(row)
}
for (let y = 0; y < a.length; y++){
    let cl = 0
    for (let x = 0; x < a[0].length; x++){
        if (a[y][x] !== 0){
            visited[y][cl] = a[y][x];
            cl += 1;
        }
    }

}
console.log(visited)