let testworld = [ //行はy,列はx
  [4,3,2,3,4,1,1,2], 
  [3,3,3,3,1,1,2,4], 
  [3,3,3,4,2,0,1,2]  
];

function direction(sy, sx) { //繋がった3を見つけ出す関数
        //初期地点は2番目の左端の3(0,1)
        //returnは上下左右でつながった3を返す,返す数は6
    let count = 0;
    let visited = []; //一度訪れたか 0...False 1...True
    for (let y = 0; y < testworld.length; y++) {
        let row = [];
        for (let x = 0; x < testworld[0].length; x++) {
            row.push(0);
        } 
        visited.push(row);
    }
    let stack = [[sy, sx]]; //初期の0,-1は2番目左端の3,本来はクリックした地点
    const dirs = [
        [0, 1],   // 右
        [0, -1],  // 左
        [1, 0],   // 下
        [-1, 0]   // 上
    ];
    //1.外にはみ出してないか
    //2.訪れたマスじゃないか 
    //3.そのマスは3か
    while (stack.length > 0) {
        const [y, x] = stack.pop();//今の場所のスタックを取り除く
        if (y < 0 || x < 0 || y >= testworld.length || x >= testworld[0].length || visited[y][x] === 1 || testworld[y][x] !== 3){//範囲から外れているか、今のdydxが3か、一度いたかでなかったら戻る
            continue;//最初のwhileに戻る(breakだとwhileから抜けてしまうため使わない) 
        }
        visited[y][x] = 1;
        count += 1;
        for (let [dy, dx] of dirs) {//上下左右にある同じ色をスタックに入れる
            let newy = y + dy;
            let newx = x + dx;
            stack.push([newy, newx]);
            //console.log(dirx,diry)
        }
    }

    return count;
}

let answer = direction(1,0);
console.log("ans:", answer);  // 期待される答えは6
