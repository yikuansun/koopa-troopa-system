/*
domgame.js
A library by Yikuan Sun
*/

var DOMgame = {
	unit_type: "px",
	newEllipsePiece: function(gamescreen_element, x_radius, y_radius, center_x, center_y, fill_color) {
		gamepiece = document.createElement("DIV");
		gamepiece.style.position = "absolute";
		gamepiece.style.width = (x_radius * 2).toString() + this.unit_type;
		gamepiece.style.height = (y_radius * 2).toString() + this.unit_type;
		gamepiece.style.left = (center_x - x_radius).toString() + this.unit_type;
		gamepiece.style.bottom = (center_y - y_radius).toString() + this.unit_type;
		gamepiece.style.backgroundColor = fill_color;
		gamepiece.style.borderRadius = "100%";
		gamescreen_element.appendChild(gamepiece);
		return gamepiece;
	},
	newRectPiece: function(gamescreen_element, width, height, center_x, center_y, fill_color) {
		gamepiece = document.createElement("DIV");
		gamepiece.style.position = "absolute";
		gamepiece.style.width = (width).toString() + this.unit_type;
		gamepiece.style.height = (height).toString() + this.unit_type;
		gamepiece.style.left = (center_x - (width/2)).toString() + this.unit_type;
		gamepiece.style.bottom = (center_y - (height/2)).toString() + this.unit_type;
		gamepiece.style.backgroundColor = fill_color;
		gamescreen_element.appendChild(gamepiece);
		return gamepiece;
	},
	newImgPiece: function(gamescreen_element, width, height, center_x, center_y, imageurl) {
		gamepiece = document.createElement("DIV");
		gamepiece.style.position = "absolute";
		gamepiece.style.width = (width).toString() + this.unit_type;
		gamepiece.style.height = (height).toString() + this.unit_type;
		gamepiece.style.left = (center_x - (width/2)).toString() + this.unit_type;
		gamepiece.style.bottom = (center_y - (height/2)).toString() + this.unit_type;
		gamepiece.style.backgroundImage = "url('" + imageurl + "')";
		gamepiece.style.backgroundSize = "100% 100%";
		gamescreen_element.appendChild(gamepiece);
		return gamepiece;
	},
	newSpritePiece: function(gamescreen_element, width, height, center_x, center_y, spritesheeturl, spritesheetwidth, spritesheetheight, spritetop, spriteleft) {
		gamepiece = document.createElement("DIV");
		gamepiece.style.position = "absolute";
		gamepiece.style.width = (width).toString() + this.unit_type;
		gamepiece.style.height = (height).toString() + this.unit_type;
		gamepiece.style.left = (center_x - (width/2)).toString() + this.unit_type;
		gamepiece.style.bottom = (center_y - (height/2)).toString() + this.unit_type;
		gamepiece.style.overflow = "hidden";
		gamepiece.innerHTML = "<div style='position: absolute; background-image: url(\"" + spritesheeturl + "\"); background-size: 100% 100%; width: " + spritesheetwidth.toString() + this.unit_type + "; height: " + spritesheetheight.toString() + this.unit_type + "; top: " + spritetop.toString() + this.unit_type + "; left: " + spriteleft.toString() + this.unit_type + ";'></div>";
		gamescreen_element.appendChild(gamepiece);
		return gamepiece;
	}
}

HTMLElement.prototype.setXpos = function(xpos){
	this.style.left = (xpos - parseFloat(this.style.width) / 2).toString() + DOMgame.unit_type;
};

HTMLElement.prototype.changeXpos = function(change_by){
	this.style.left = (change_by + parseFloat(this.style.left)).toString() + DOMgame.unit_type;
};

HTMLElement.prototype.setYpos = function(ypos){
	this.style.bottom = (ypos - parseFloat(this.style.height) / 2).toString() + DOMgame.unit_type;
};

HTMLElement.prototype.changeYpos = function(change_by){
	this.style.bottom = (change_by + parseFloat(this.style.bottom)).toString() + DOMgame.unit_type;
};

HTMLElement.prototype.rectCollision = function(otherobject){
    aRect = this.getBoundingClientRect();
	bRect = otherobject.getBoundingClientRect();
    return !(
        ((aRect.top + aRect.height) < (bRect.top)) ||
        (aRect.top > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width) < bRect.left) ||
        (aRect.left > (bRect.left + bRect.width))
    );
};

HTMLElement.prototype.directionalCollision = function(otherobject) {
	if (this.rectCollision(otherobject))
	{
	item1 = this.getBoundingClientRect();
	item2 = otherobject.getBoundingClientRect();
	item1_bottom = item1.y + item1.height;
	item2_bottom = item2.y + item2.height;
	item1_right = item1.x + item1.width;
	item2_right = item2.x + item2.width;

	b_collision = item2_bottom - item1.y;
	t_collision = item1_bottom - item2.y;
	l_collision = item1_right - item2.x;
	r_collision = item2_right - item1.x;

	if (t_collision < b_collision && t_collision < l_collision && t_collision < r_collision )
	{                           
	return "top";
	}
	if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision)                        
	{            
	return "bottom";
	}
	if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision)
	{
	return "left";
	}
	if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision )
	{
	return "right";
	}
	}
	else { return false; }
}
