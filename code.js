HTMLElement.prototype.getcoords = function() { return [parseFloat(this.style.left) + parseFloat(this.style.width) / 2, parseFloat(this.style.bottom) + parseFloat(this.style.height) / 2]; }

document.body.style.backgroundColor = "black";
DOMgame.unit_type = "vmin";
gamescreen = DOMgame.newRectPiece(document.body , 100, 100, 50, 50, "white");
gamescreen.style.bottom = "50%"; gamescreen.style.left = "50%";
gamescreen.style.transform = "translate(-50%, 50%)";
gamescreen.style.overflow = "hidden";

var enemy;
var scrollscreen;

direction = "left";

function draw_level(level) {
    level_split = level.split("\n");
    scrollscreen = document.createElement("DIV");
    scrollscreen.style.bottom = "0"; scrollscreen.style.left = "0";
    scrollscreen.style.width = (5 * level_split[1].length) + "vmin"; scrollscreen.style.height = "100vmin";
    scrollscreen.style.backgroundColor = "grey";
    scrollscreen.style.position = "absolute";
    scrollscreen.id = "scrollscreen";
    gamescreen.appendChild(scrollscreen);
    for (r = 0; r < level_split.length; r++) {
        for (c = 0; c < level_split[r].length; c++) {
            if (level_split[r][c] == ">") {
                enemy = DOMgame.newRectPiece(document.getElementById("scrollscreen"), 5, 5, c * 5 + 2.5, 100 - (r * 5 + 2.5), "red");
                enemy.style.transform = "rotateY(180deg)";
            }
            else if (level_split[r][c] == "#") {
                block = DOMgame.newRectPiece(document.getElementById("scrollscreen"), 5, 5, c * 5 + 2.5, 100 - (r * 5 + 2.5), "white");
                block.setAttribute("class", "block");
                block.setAttribute("id", "brick_" + (c * 5 + 2.5).toString() + "_" + (100 - (r * 5 + 2.5)).toString());
            }
        }
    }
}

function main() {

    if (direction == "left") {
        enemy.changeXpos(-0.05);
        focused_x = Math.floor((enemy.getcoords()[0] - 2.5) / 5);
        focused_y = Math.floor((enemy.getcoords()[1] - 2.5) / 5);
        focused_brick_wall = document.getElementById("brick_" + (focused_x * 5 + 2.5).toString() + "_" + (focused_y * 5 + 2.5).toString());
        focused_brick_gap = document.getElementById("brick_" + (focused_x * 5 + 2.5).toString() + "_" + ((focused_y - 1) * 5 + 2.5).toString());
        if (document.body.contains(focused_brick_wall) || !(document.body.contains(focused_brick_gap))) {
            direction = "right";
            enemy.style.transform = "rotateY(0deg)";
        }
    }
    else {
        enemy.changeXpos(0.05);
        focused_x = Math.ceil((enemy.getcoords()[0] + 2.5) / 5) - 1;
        focused_y = Math.ceil((enemy.getcoords()[1] - 2.5) / 5);
        focused_brick_wall = document.getElementById("brick_" + (focused_x * 5 + 2.5).toString() + "_" + (focused_y * 5 + 2.5).toString());
        focused_brick_gap = document.getElementById("brick_" + (focused_x * 5 + 2.5).toString() + "_" + ((focused_y - 1) * 5 + 2.5).toString());
        if (document.body.contains(focused_brick_wall) || !(document.body.contains(focused_brick_gap))) {
            direction = "left";
            enemy.style.transform = "rotateY(180deg)";
        }
    }

    setTimeout(main, 1);
}

demolevel = "\
                    \n\
                    \n\
                    \n\
                    \n\
                    \n\
                    \n\
                    \n\
                    \n\
                    \n\
                    \n\
                    \n\
                    \n\
                    \n\
                    \n\
                    \n\
                    \n\
                    \n\
                    \n\
  #    >            \n\
############### ####"

draw_level(demolevel);
main();