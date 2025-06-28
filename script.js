const canvasx = document.getElementById("gameCanvas");
const ctx = canvasx.getContext("2d");
class BoredBlocks{
    constructor(){
        this.board = []
        this.mx = 0
        this.my = 0
        this.w = 50
        this.h = 50
        this.colors = ["red","blue","white","yellow","pink"];
        this.red = new Image();
        this.red.src = 'img/red.png';
        this.blue = new Image();
        this.blue.src = 'img/blue.png';
        this.green = new Image();
        this.green.src = 'img/green.png';
        this.yellow = new Image();
        this.yellow.src = 'img/yellow.png';
        this.pink = new Image();
        this.pink.src = 'img/pink.png';
        this.white = new Image();
        this.white.src = 'img/white.png';
        this.tiles = [this.red,this.blue,this.green,this.yellow,this.pink,this.white]//0が赤,1が青,2が緑,3が黄色,4がピンク,5がwhite
        if (this.board.length == 0){
            for (let i = 0; i < 10; i++) {
                let line = [];
                for (let j = 0; j<15; j++ ){
                    line.push(Math.floor(Math.random() * 5)); // 0〜4のランダムな整数 
                }
                this.board.push(line);
            }
        }
    //example
    //[[0,0,1,1,2,3,2,0,3,0,1,1],
    // [3,1,0,1,3,0,0,1,2,2,3,2]...]
    }
    draw(ctx){
        for ( let i = 0;  i < 10;  i++ ) {
            for ( let j = 0; j < 15; j++) {
                this.mapnum = parseInt(this.board[i][j]); 
                ctx.drawImage(this.tiles[this.mapnum], 0, 0, this.w, this.h, this.mx, this.my, this.w, this.h );
                this.mx += 50;
            }
            this.mx = 0;
            this.my += 50;
        }
        this.my = 0;
    }
}
class Click{
    constructor(){
        this.cx = 0;//キャンバス内でクリックしたxy
        this.cy = 0;
        this.dy = 0;//cx,cyを50で割って二次元配列に対応したxy
        this.dx = 0;
    }
    click(canvasx,board){//クリックの場所(ブロック)の検知
        canvasx.addEventListener('click', e => {
            let rect = e.target.getBoundingClientRect();
            this.cx = e.clientX - rect.left;//cx = eventで読み取られたx-キャンバスの大きさの左端
            this.cy = e.clientY - rect.top;
            this.dy = this.cy/50;
            this.dx = this.cx/50;
            this.dy = parseInt(this.dy);//2.52や2.79とかになって配列が検知できずエラーが起きるためint化
            this.dx = parseInt(this.dx);
            //console.log(board[this.dy][this.dx])
            this.cp = board[this.dy][this.dx] //クリックされた色の記号
            let count = this.direction(board)
            let drop = this.drop(board)
            let fillup = this.fillup(board)
            //console.log("count",count)
            //[[0,0,1,1,2,3,2,0,3,0,1,1],
            // [3,1,0,1,3,0,0,1,2,2,3,2]...]
        });
    }
    direction(board){//検知したブロックの周囲に同じブロックがあるかを検知
        let count = 0;
        let visited = []; //一度訪れたか 0...False 1...True
        for (let y = 0; y < board.length; y++) { 
            let row = [];
            for (let x = 0; x < board[0].length; x++) {
                row.push(0);
            } 
            visited.push(row);
        }
        let stack = [[this.dy, this.dx]]; //初期の0,-1は2番目左端の3,本来はクリックした地点
        const dirs = [
            [0, 1],   // 右
            [0, -1],  // 左
            [1, 0],   // 下
            [-1, 0]   // 上
        ];
        while (stack.length > 0) {
            const [y, x] = stack.pop(
            );//今の場所のスタックを取り除く
            if (y < 0 || x < 0 || y >= board.length || x >= board[0].length || visited[y][x] === 1 || board[y][x] !== this.cp){//範囲から外れているか、今のdydxが3か、一度いたかでなかったら戻る
                continue;//最初のwhileに戻る(breakだとwhileから抜けてしまうため使わない) 
            }
            visited[y][x] = 1;
            count += 1;
            board[y][x] = 5;
            console.log(this.board)
            for (let [ny, nx] of dirs) {//上下左右にある同じ色をスタックに入れる
                let newy = y + ny;
                let newx = x + nx;
                stack.push([newy, newx]);
                //console.log(dix,diry)
            }
        }
        if (count === 1){
            board[this.dy][this.dx] = this.cp;
        }
        
    return count;
    }
    drop(board){
        let copyboard = board
        let visited = [];
        for (let i = 0; i < copyboard.length; i++){
            let row = [];
            for (let j = 0; j < copyboard[0].length; j++){
                row.push(5);
            }
            visited.push(row)
        }

        for (let x = 0; x < copyboard[0].length; x++){
            let ln = copyboard.length -1;
            for (let y = copyboard.length-1; y >= 0; y--){
                if (copyboard[y][x] !== 5){
                    visited[ln][x] = copyboard[y][x];
                    ln -= 1;
                }
            }
        }

        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[0].length; x++) {
                board[y][x] = visited[y][x];
            }
        }
    }
    fillup(board){
        let copyboard = board
        let visited = [];
        for (let i = 0; i < copyboard.length; i++){
            let row = [];
            for (let j = 0; j < copyboard[0].length; j++){
                row.push(5);
            }
            visited.push(row)
        }

        for (let y = 0; y < copyboard.length; y++){
            let cl = 0
            for (let x = 0; x < copyboard[0].length; x++){
                if (copyboard[y][x] !== 5){
                    visited[y][cl] = copyboard[y][x];
                    cl += 1;
                }
            }
        }

        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[0].length; x++) {
                board[y][x] = visited[y][x];
            }
        }
    }
}
function main(){
    let B = new BoredBlocks()
    let C = new Click()
    //色のブロックの座標を特定してそこお上下左右に同じ色があるか検知する。
    C.click(canvasx,B.board);
    function loop(){
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvasx.width, canvasx.height); // 背景を白
        // 2. 図形の描画r
        ctx.fillStyle = 'rgb(10, 10, 10)';
        ctx.font = "50px serif";
        ctx.beginPath();
        //ctx.fillRect(20, 300, 50, 50)
        ctx.fill();
        //ctx.font = '55px Arial'; // フォント設定
        B.draw(ctx);
        //ctx.fillStyle = 'blue'; 
        //ctx.fillText('Hello World', 20, 100); // (20, 100)の位置に文字を表示
        requestAnimationFrame(loop);
    }
    loop()
}
main();