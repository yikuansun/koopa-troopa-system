HTMLElement.prototype.rectCollision = function(otherobject){
    item1 = this;
	item2 = otherobject;
    return (
        parseFloat(item1.style.bottom) + parseFloat(item1.style.height) >= parseFloat(item2.style.bottom) &&
        parseFloat(item1.style.left) + parseFloat(item1.style.width) >= parseFloat(item2.style.left) &&
        parseFloat(item1.style.bottom) <= parseFloat(item2.style.bottom) + parseFloat(item2.style.height) &&
        parseFloat(item1.style.left) <= parseFloat(item2.style.left) + parseFloat(item2.style.width)
    )
};

HTMLElement.prototype.directionalCollision = function(otherobject) {
	if (this.rectCollision(otherobject))
	{
	item1 = this;
	item2 = otherobject;
	item1_bottom = parseFloat(item1.style.bottom) + parseFloat(item1.style.height);
	item2_bottom = parseFloat(item2.style.bottom) + parseFloat(item2.style.height);
	item1_right = parseFloat(item1.style.left) + parseFloat(item1.style.width);
	item2_right = parseFloat(item2.style.left) + parseFloat(item2.style.width);

	b_collision = item2_bottom - parseFloat(item1.style.bottom);
	t_collision = item1_bottom - parseFloat(item2.style.bottom);
	l_collision = item1_right - parseFloat(item2.style.left);
	r_collision = item2_right - parseFloat(item1.style.left);

	if (t_collision < b_collision && t_collision < l_collision && t_collision < r_collision )
	{                           
	return "bottom";
	}
	if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision)                        
	{            
	return "top";
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