var pallet_id_value = 10000;
var drawable_id_value = 10000;
var cpoint_id_value = 10000;
var bpoint_id_value = 10000;
var general_id_value = 10000;

function drawCircle(left,top,radius){
	var circle = new fabric.Circle({
		left: left,
		top:  top,
		radius: radius,
		fill: "green",
		selectable: true,
		hasControls: true,
		hasBorders: true
	});
	circle.id = getUid("pallet");
	circle.shape  = "circle";
	return circle;
}

function drawRectangle(left,top,width,height){
	var rect = new fabric.Rect ({
		left: left,
		top:  top,
		width: width,
		height: height,
		fill: "navy",
		selectable: true,
		hasControls: false,
		hasBorders: false
	});
	rect.id = getUid("pallet_rect");
	rect.shape = "rectangle";
	return rect;
}
function getUid(str)	{
	switch (str) {
		case "pallet": {
			pallet_id_value++;
			return "pallet_"+pallet_id_value;
		}
		case "drawable": {
			drawable_id_value++;
			return "drawable_"+drawable_id_value;
		}
		case "cpoint": {
			cpoint_id_value++;
			return "cpoint_"+cpoint_id_value;
		}
		case "bpoint": {
			bpoint_id_value++;
			return "bpoint_"+bpoint_id_value;
		}
		default: {
			general_id_value++
			return "whiteboard_"+general_id_value;
		}
	}
}

function setBindpoints(obj){
	var type = String(obj.shape);
	switch (type){
		case "circle" :	{
			setPointers_process(obj);
			break;
			
		}
		case "rectangle" :	{
			setPointers_process(obj);
			break;
		}
		case "rhombus" :	{
			break;
		}
		case "line":		{
			break;
		}
		case "action":		{
			break;
		}
		case "parellogram":	{
			break;
		}
		case "connectors":	{
			break;
		}
		default:	{
			break;
		}
	}
}

function setPointers_process(obj)
{
	var val = getParams(obj);
	var color = "none";
	var radius = 6;
	var point1 = new fabric.Circle({ radius: radius, selectable: false, fill: color, top: val[1], left: val[0] });
	var point2 = new fabric.Circle({ radius: radius, selectable: false, fill: color, top: val[3], left: val[2]});
	var point3 = new fabric.Circle({ radius: radius, selectable: false, fill: color, top: val[5], left: val[4] });
	var point4 = new fabric.Circle({ radius: radius, selectable: false, fill: color, top: val[7], left: val[6] });
	point1.id = getUid("bpoint");
	point2.id = getUid("bpoint");
	point3.id = getUid("bpoint");
	point4.id = getUid("bpoint");

	point1.shape = point2.shape = point3.shape = point4.shape = "bpoint";

	obj.point1= point1;
	obj.point2= point2;
	obj.point3= point3;
	obj.point4= point4;
	canvas.add(point1, point2, point3, point4);
	canvas.renderAll();
}

function getParams(obj)
{
	var type = String(obj.shape);
	var l = obj.left;
	var t = obj.top;
	switch(type)	{
		case "rectangle" : {
			var w = obj.getWidth();
			var h = obj.getHeight();
			var val = new Array();
			val[0] = l;
			val[1] = t-(h/2);
			val[2] = l+(w/2);
			val[3] = t;
			val[4] = l;
			val[5] = t+h/2;
			val[6] = l-(w/2);
			val[7] = t;
			return val;
		}
		case "circle":	{
			var w = obj.getRadiusX();
			var h = obj.getRadiusY();
			var val = new Array();
			val[0] = l;
			val[1] = t-h;
			val[2] = l+w;
			val[3] = t;
			val[4] = l;
			val[5] = t+h;
			val[6] = l-w;
			val[7] = t;
			return val;
		}
		default :	{
			break;
		}
	}
}

function drawConnector(coords){
	var line = connectorLine(coords,"black");
	canvas.add(line);
	var obj1  = connectorCircle(line.get('x1'), line.get('y1'), null, line,"red");
	var obj2 = connectorCircle(line.get('x2'), line.get('y2'), line, null,"blue")
	canvas.add(obj1,obj2);

//	var group = new fabric.Group([line, obj1,obj2]);
//	canvas.setActiveGroup(group);
//	canvas.renderAll();
}

function connectorCircle(left, top, line1, line2,clr) {
	var c = new fabric.Circle({
		left: left,
		top: top,
		strokeWidth: 2,
		radius: 6,
		fill: "white",
		stroke: '#666'
	});
	c.hasControls = c.hasBorders = false;
	c.id = getUid("cpoint");
	c.shape = "connector";
	c.line1 = line1;
	c.line2 = line2;
	return c;
}

function connectorLine(coords, color) {
	return new fabric.Line(coords, {
		fill: color,
		strokeWidth: 5,
		hasControls: true,
		selectable: false
	});
}



