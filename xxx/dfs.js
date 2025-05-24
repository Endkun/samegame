let testworld = [[4,3,2,3,4,1,1,2],
                 [3,3,4,3,0,1,2,4],
                 [3,3,3,4,2,0,1,2]];

function direction(dx,dy){  //繋がった3を見つけ出す関数
    //初期地点は2番目の左端の3(0,1)
    //returnは上下左右でつながった3を返す,返す数は6
    let count = 0;
    let visited = [] //一度訪れたか 0...False 1...True
    let stack = [[0,-1]]//初期の0,-1は2番目左端の3,本来はクリックした地点
    const dirs = [
        [0,1],
        [0,-1],
        [1,0],
        [-1,0]
    ];
    //1.外にはみ出してないか
    //2.訪れたマスじゃないか 
    //3.そのマスは3か
    while(stack.length > 0){
        const [dx, dy] = stack.pop //今の場所のスタックを取り除く
        if (dx < 0 || dy < 0 || dx >= testworld[0].length || dy >= testworld.length || testworld[dx][dy] !== 3){ //範囲から外れているか、今のdxdyが3でなかったら戻る
            continue; //最初のwhileに戻る(breakだとwhileから抜けてしまうため使わない) 
        } 
        visited[dx][dy] = 1 
        count += 1; 
        for (let [dirx,diry] of dirs){ //上下左右にある同じ色をスタックに入れる
            let newx = dx + dirx
            let newy = dy + diry
            stack.push([newx,newy])
            //console.log(dirx,diry)
        }
    }
    return count;
}
awnser = direction(0,0);
console.log("ans:",answer)