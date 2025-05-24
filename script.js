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
        this.white = new Image();
        this.white.src = 'img/white.png';
        this.yellow = new Image();
        this.yellow.src = 'img/yellow.png';
        this.pink = new Image();
        this.pink.src = 'img/pink.png';
        this.tiles = [this.red,this.blue,this.white,this.yellow,this.pink]
    }
    //example
    //[[0,0,1,1,2,3,2,0,3,0,1,1],
    // [3,1,0,1,3,0,0,1,2,2,3,2]...]
    update(ctx){
        if (this.board.length == 0){
            for (let i = 0; i < 10; i++) {
                let line = [];
                for (let j = 0; j<15; j++ ){
                    line.push(Math.floor(Math.random() * 5)); // 0〜99のランダムな整数 
                }
                this.board.push(line);
            }
            console.log("board=",this.board);
        }else{
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
}
class Click{
    constructor(){
        this.cx = 0;//キャンバス内でクリックしたxy
        this.cy = 0;
        this.dx = 0;//cx,cyを50で割って二次元配列に対応したxy
        this.dy = 0;
    }
    click(canvasx,board){//クリックの場所(ブロック)の検知
        canvasx.addEventListener('click', e => {
            let rect = e.target.getBoundingClientRect();
            this.cx = e.clientX - rect.left;//cx = eventで読み取られたx-キャンバスの大きさの左端
            this.cy = e.clientY - rect.top;
            this.dx = this.cx/50;
            this.dy = this.cy/50;
            this.dx = parseInt(this.dx);//2.52や2.79とかになって配列が検知できずエラーが起きるためint化
            this.dy = parseInt(this.dy);
            console.log(board[this.dy][this.dx])
            //[[0,0,1,1,2,3,2,0,3,0,1,1],
            // [3,1,0,1,3,0,0,1,2,2,3,2]...]
        });
    }
    direction(){//検知したブロックの周囲に同じブロックがあるかを検知
        dirs = [[0,1],
                [0,-1],
                [1,0],
                [-1,0]]   
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
        // 2. 図形の描画
        ctx.fillStyle = 'rgb(10, 10, 10)';
        ctx.font = "50px serif";
        ctx.beginPath();
        //ctx.fillRect(20, 300, 50, 50)
        ctx.fill();
        B.update(ctx);
        requestAnimationFrame(loop);
    }
    loop()
}
main();