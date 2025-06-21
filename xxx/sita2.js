let a = [
     [0,0,2,3,0],
     [0,1,1,2,2],
     [3,0,1,0,1],
     [0,0,0,3,0],
     [2,0,2,1,3]]
//colors = [2,1,1,2,2,3,1,1,3,2,2,1,3]
//[0,0,0,0,0],
//[0,0,2,3,0],
//[0,0,1,2,2],
//[3,0,1,3,1],
//[2,1,2,1,3],     

//y a.length
//x a.length[0]
let visited = [];
for (let i = 0; i < a.length; i++){
    let row = [];
    for (let j = 0; j < a[0].length; j++){
        row.push(0);
    }
    visited.push(row)
}
for (let x = 0; x < a[0].length; x++){
    let ln = a.length -1;
    for (let y = a.length-1; y >= 0; y--){
        if (a[y][x] !== 0){
            visited[ln][x] = a[y][x];
            ln -= 1;
        }
    }

}
console.log(visited)