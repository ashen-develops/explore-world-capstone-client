$(document).ready(function () {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var speed = .5;

    var canvasXmin = 0;
    var canvasYmin = 0;
    var canvasXmax = $("#canvas").width();
    var canvasYmax = $("#canvas").height();

    var Balls = [];

    Init();

    function Init() {
        var b1 = new Ball();
        b1.Xmin = 0;
        b1.Ymin = (canvasYmax / 2) - (b1.Height / 2);
        b1.Xdir = 1;
        b1.Ydir = 1;
        UpdateBallMax(b1);
        Balls.push(b1);

        var b2 = new Ball();
        b2.Xmin = canvasXmax - b2.Width;
        b2.Ymin = (canvasYmax / 2) - (b2.Height / 2);
        b2.Red = 255;
        b2.Green = 0;
        b2.Blue = 0;
        b2.Xdir = -1;
        b2.Ydir = 0;
        UpdateBallMax(b2);
        Balls.push(b2);

        var b3 = new Ball();
        b3.Xmin = canvasXmax - b3.Width;
        b3.Ymin = canvasYmax - b3.Height;
        b3.Red = 255;
        b3.Green = 255;
        b3.Blue = 0;
        b3.Xdir = -1;
        b3.Ydir = 0;
        UpdateBallMax(b3);
        Balls.push(b3);

        var b4 = new Ball();
        b4.Xmin = 0;
        b4.Ymin = (canvasYmax - (b4.Height * 2))-1;
        b4.Red = 0;
        b4.Green = 0;
        b4.Blue = 0;
        b4.Xdir = 1;
        b4.Ydir = 0;
        UpdateBallMax(b4);
        Balls.push(b4);
        
        var b5 = new Ball();
        b5.Xmin = (canvasXmax / 2) - (b5.Width / 2);
        b5.Ymin = 0
        b5.Red = 200;
        b5.Green = 200;
        b5.Blue = 200;
        b5.Xdir = 0;
        b5.Ydir = 1;
        UpdateBallMax(b5);
        Balls.push(b5);

        var b6 = new Ball();
        b6.Xmin = (canvasXmax / 2) - (b6.Width / 2);
        b6.Ymin = canvasYmax - b6.Height;
        b6.Red = 75;
        b6.Green = 75;
        b6.Blue = 75;
        b6.Xdir = 0;
        b6.Ydir = -1;
        UpdateBallMax(b6);
        Balls.push(b6);




        StartClock();
    }

    function StartClock() {
        setInterval(Game, speed);
    }

    function Game() {
        Logic();
        Draw();
    }

    function Logic() {
        for (var i = 0; i < Balls.length; i++) {
            CheckBallCollision(Balls, i);
            CheckWallCollision(Balls[i]);
        }

        for (var i = 0; i < Balls.length; i++) {
            Balls[i].Xmin = Balls[i].Xmin + Balls[i].Xdir;
            Balls[i].Ymin = Balls[i].Ymin + Balls[i].Ydir;
            UpdateBallMax(Balls[i]);
        }

    }

    function CheckBallCollision(BallsArray, index) {
        var Ball = BallsArray[index];
        
        for (var i = 0; i < BallsArray.length; i++) {
            if (index != i) {
                
                if ((Ball.Xdir == 1)) {
                    if ((Ball.Xmax == BallsArray[i].Xmin)) {
                        if ((Ball.Ymin <= BallsArray[i].Ymin) && (Ball.Ymax >= BallsArray[i].Ymin) ||
                       ((Ball.Ymax >= BallsArray[i].Ymax) && (Ball.Ymin <= BallsArray[i].Ymax))) {
                            Ball.Xdir = -Ball.Xdir;
                        }
                    }
                } else if ((Ball.Xdir == -1)) {
                    if ((Ball.Xmin == BallsArray[i].Xmax)) {
                        if ((Ball.Ymin <= BallsArray[i].Ymin) && (Ball.Ymax >= BallsArray[i].Ymin) ||
                       ((Ball.Ymax >= BallsArray[i].Ymax) && (Ball.Ymin <= BallsArray[i].Ymax))) {
                            Ball.Xdir = -Ball.Xdir;
                        }
                    }
                }

                if ((Ball.Ydir == 1)) {
                    if ((Ball.Ymax == BallsArray[i].Ymin)) {
                        if ((Ball.Xmin <= BallsArray[i].Xmin) && (Ball.Xmax >= BallsArray[i].Xmin) ||
                       ((Ball.Xmax >= BallsArray[i].Xmax) && (Ball.Xmin <= BallsArray[i].Xmax))) {
                            Ball.Ydir = -Ball.Ydir;
                        }
                    }
                } else if ((Ball.Ydir == -1)) {
                    if ((Ball.Ymin == BallsArray[i].Ymax)) {
                        if ((Ball.Xmin <= BallsArray[i].Xmin) && (Ball.Xmax >= BallsArray[i].Xmin) ||
                       ((Ball.Xmax >= BallsArray[i].Xmax) && (Ball.Xmin <= BallsArray[i].Xmax))) {
                            Ball.Ydir = -Ball.Ydir;
                        }
                    }
                }


            }
        }
    }

    function CollisionCheckHeight() {
    }

    function CheckWallCollision(ball) {
        if ((ball.Xmax > canvasXmax) || (ball.Xmin < canvasXmin)) {
            ball.Xdir = -ball.Xdir;
        }

        if ((ball.Ymax > canvasYmax) || (ball.Ymin < canvasYmin)) {
            ball.Ydir = -ball.Ydir;
        }
    }

    function Draw() {
        ClearScreen();
        for (var i = 0; i < Balls.length; i++) {
            ctx.fillStyle = "rgba(" + Balls[i].Red + ", " + Balls[i].Green + ", " + Balls[i].Blue + ", " + Balls[i].Opacity + ")";
            ctx.fillRect(Balls[i].Xmin, Balls[i].Ymin, Balls[i].Width, Balls[i].Height);
        }

    }

    function ClearScreen() {
        canvas.width = canvas.width;
    }

    function UpdateBallMax(ball) {
        UpdateBallMaxX(ball);
        UpdateBallMaxY(ball);
    }

    function UpdateBallMaxX(ball) {
        ball.Xmax = ball.Xmin + ball.Width;
    }

    function UpdateBallMaxY(ball) {
        ball.Ymax = ball.Ymin + ball.Height;
    }

    function Ball() {
        this.Xmin = 0; //top left X coord
        this.Ymin = 0; //top left y coord
        this.Height = 25;
        this.Width = 25;
        this.Xmax = this.Xmin + this.Width;
        this.Ymax = this.Ymin + this.Height;
        this.Xdir = 0; // 0 not moving, 1 moving right, -1 moving left
        this.Ydir = 0;
        this.Red = 0;
        this.Green = 0;
        this.Blue = 200;
        this.Opacity = 1;
        this.Speed = 1;
    }

});