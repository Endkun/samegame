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
//console.log(visited)
for (let x = 0; x < a[0].length; x++){
    let colors = [];   
    for (let y = 0; y < a.length; y++){
        if (a[y][x] !== 0){
            colors.push(a[y][x])
        }
    }
    for (let i = 0; i < colors.length; i++){
        visited[a.length-1-i][x] = colors[colors.length-1-i];
    }
}
console.log(visited)