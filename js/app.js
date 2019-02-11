var colors = ["red","green","blue"];

function Game() {
    this.roundNum = 1;
    this.ele = document.createElement("div");
    this.ele.innerHTML = "Match the boxes on the top row! Round Number:"+this.roundNum + "<br>";
    this.ele.id = "header";
    document.body.appendChild(this.ele);
    this.createAnswerBox();
    this.createPlayerBox();
    this.checkColors();
    this.addClickListeners();
}

function PlayerBox(num) {
    var that = this;
    this.id = num;

    this.ele = document.createElement("div");
    this.ele.setAttribute("id", this.id);
    this.ele.style.width = "100px";
    this.ele.style.height = "100px";
    this.ele.style.border = "solid";
    this.ele.style.display = "inline-block";
    this.ele.style.background = colors[Math.floor(Math.random()*colors.length)];
    this.ele.addEventListener("click",function(){
        if (that.ele.style.background == "red"){
            that.ele.style.background = "green";

        }
        else if (that.ele.style.background == "green") {
            that.ele.style.background = "blue";

        }
        else if (that.ele.style.background == "blue") {
            that.ele.style.background = "red";

        }
    });
    document.body.appendChild(this.ele);
}

function AnswerBox(num) {
    this.id = num;

    this.ele = document.createElement("div");
    this.ele.setAttribute("id", this.id);
    this.ele.style.width = "100px";
    this.ele.style.height = "100px";
    this.ele.style.border = "solid";
    this.ele.style.display = "inline-block";
    this.ele.style.background = colors[Math.floor(Math.random()*colors.length)];
    document.body.appendChild(this.ele);
}


Game.prototype.createPlayerBox = function () {
    this.pboxes = [];
    this.pboxes.push(new PlayerBox("p1"), new PlayerBox("p2"), new PlayerBox("p3"));

};

Game.prototype.createAnswerBox = function () {
    this.aboxes = [];
    this.aboxes.push(new AnswerBox("a1"), new AnswerBox("a2"), new AnswerBox("a3"));
    document.body.appendChild(this.ele);
};

Game.prototype.checkColors = function () {
    while (
        //check if any of the answer colors repeat
        this.aboxes[0].ele.style.background==this.aboxes[1].ele.style.background ||
        this.aboxes[1].ele.style.background==this.aboxes[2].ele.style.background ||
        this.aboxes[0].ele.style.background==this.aboxes[2].ele.style.background ||
         //check if the player boxes colors repeat
        this.pboxes[0].ele.style.background==this.pboxes[1].ele.style.background ||
        this.pboxes[1].ele.style.background==this.pboxes[2].ele.style.background ||
        this.pboxes[0].ele.style.background==this.pboxes[2].ele.style.background ||
         //check if the a color on the top row would match with its color below
        this.pboxes[0].ele.style.background==this.aboxes[0].ele.style.background||
        this.pboxes[1].ele.style.background==this.aboxes[1].ele.style.background||
        this.pboxes[2].ele.style.background==this.aboxes[2].ele.style.background){

        //if any of the colors repeat, create them again and check, repeats until valid colors are chosen
        this.destroyBoxes();
        this.createAnswerBox();
        this.createPlayerBox();


        console.log("Retry!");

    }
};



Game.prototype.destroyBoxes = function () {
    document.getElementById("p1").remove();
    document.getElementById("p2").remove();
    document.getElementById("p3").remove();
    document.getElementById("a1").remove();
    document.getElementById("a2").remove();
    document.getElementById("a3").remove();
}

Game.prototype.addClickListeners = function () {
    var that=this;
    for(var i=0; i < this.pboxes.length; i++) {
        this.pboxes[i].ele.addEventListener('click', function () {

            if (that.pboxes[0].ele.style.background == that.aboxes[0].ele.style.background) {
                that.pboxes[0].ele.style.verticalAlign = "top";
                that.pboxes[0].ele.innerHTML = "Correct";
            }
            if (that.pboxes[1].ele.style.background == that.aboxes[1].ele.style.background) {
                that.pboxes[1].ele.style.verticalAlign = "top";
                that.pboxes[1].ele.innerHTML = "Correct";
            }
            if (that.pboxes[2].ele.style.background == that.aboxes[2].ele.style.background) {
                that.pboxes[2].ele.style.verticalAlign = "top";
                that.pboxes[2].ele.innerHTML = "Correct";
            }

            if (that.pboxes[0].ele.style.background == that.aboxes[0].ele.style.background &&
                that.pboxes[1].ele.style.background == that.aboxes[1].ele.style.background &&
                that.pboxes[2].ele.style.background == that.aboxes[2].ele.style.background &&
                that.roundNum == 3) {
                that.roundNum = " Game over!";
                document.getElementById("header").innerHTML = "Match the boxes on the top row! Round Number:"+that.roundNum + "<br>";

                that.destroyBoxes();
                that.createAnswerBox();
                that.createPlayerBox();
                that.checkColors();

                that.ele = document.createElement("BUTTON");
                that.ele.innerHTML = "Play Again!";
                that.ele.style.display = "block";
                that.ele.addEventListener("click", function () {
                    document.body.innerHTML = '';
                    
                    that.roundNum = 1;
                    that.ele = document.createElement("div");
                    that.ele.innerHTML = "Match the boxes on the top row! Round Number:"+that.roundNum + "<br>";
                    that.ele.id = "header";
                    document.body.appendChild(that.ele);
                    that.createAnswerBox();
                    that.createPlayerBox();

                    that.checkColors();

                    that.addClickListeners();
                });
                document.body.appendChild(that.ele);
            }

            if (that.pboxes[0].ele.style.background == that.aboxes[0].ele.style.background &&
                that.pboxes[1].ele.style.background == that.aboxes[1].ele.style.background &&
                that.pboxes[2].ele.style.background == that.aboxes[2].ele.style.background) {

                that.roundNum = that.roundNum + 1;
                document.getElementById("header").innerHTML = "Match the boxes on the top row! Round Number:"+that.roundNum + "<br>";
                that.destroyBoxes();
                that.createAnswerBox();
                that.createPlayerBox();
                that.checkColors();
                that.addClickListeners();
            }

        });
    }
};
var test = new Game();