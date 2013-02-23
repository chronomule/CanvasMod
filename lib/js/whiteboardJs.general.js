var canvas = new fabric.Canvas('flowchart_main');
var event = new fabric.Circle({ radius: 30, fill: 'green', top: 100, left: 100 });
var process = new fabric.Rect({ left: 100, top: 180, fill: 'grey', width: 100, height: 50 });
var decision  = new fabric.Rect({ left: 100, top: 260, fill: 'navy', width: 50, height: 50 });
process.id = 1;
canvas.add(event);
canvas.add(process);
canvas.add(decision);
setPointers_process();

canvas.item(0).hasControls = canvas.item(0).hasBorders=false;
canvas.item(0).selectable = true;


canvas.item(1).hasControls = canvas.item(1).hasBorders=false;
canvas.item(1).selectable = true;

canvas.item(2).hasControls = canvas.item(2).hasBorders=false;
canvas.item(2).selectable = true;

canvas.item(2).setAngle(40);
canvas.renderAll();
function getParams(obj)
{
	//l= left; t=top; w = width; h = height;
	var l = obj.left;
	var t = obj.top;
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
function setPointers_process()
{
	var val = getParams(process);
	var point1 = new fabric.Circle({ radius: 10, selectable: false, fill: 'none', top: val[1], left: val[0] });
	var point2 = new fabric.Circle({ radius: 10, selectable: false, fill: 'none', top: val[3], left: val[2]});
	var point3 = new fabric.Circle({ radius: 10, selectable: false, fill: 'none', top: val[5], left: val[4] });
	var point4 = new fabric.Circle({ radius: 10, selectable: false, fill: 'none', top: val[7], left: val[6] });
	point1.id = "conn_1";
	point2.id = "conn_2";
	point3.id = "conn_3";
	point4.id = "conn_4";
	canvas.add(point1, point2, point3, point4);
	process.point1= point1;
	process.point2= point2;
	process.point3= point3;
	process.point4= point4;
	canvas.renderAll();
}

canvas.on('mouse:move', function(options) {

var p = canvas.getPointer(options.e);

canvas.forEachObject(function(obj) {

var str = obj.id+"";
	if(str.substring(0,4) == "conn"){
		var distX = Math.abs(p.x - obj.left),
		distY = Math.abs(p.y - obj.top);
		// obj.setOpacity(1 / (dist / 1000));
		if(distX <= 30 && distY<=30){
			obj.setFill('red');
		}
		else{
			obj.setFill('none');
		}
	}
});

canvas.renderAll();
});


/*-----------------------------------------------------------------------*/


var whiteboard ={};
(function(){
//	alert("ok");
	if(!window.$whiteboard){
		window.$whiteboard = whiteboard;
	};
})();
function makeCircle(left, top, line1, line2,clr) {
	var c = new fabric.Circle({
		left: left,
		top: top,
		strokeWidth: 5,
		radius: 9,
		fill: clr,
		stroke: '#666'
	});
	c.hasControls = c.hasBorders = false;

	c.line1 = line1;
	c.line2 = line2;

	return c;
}

function makeLine(coords, color) {
	return new fabric.Line(coords, {
		fill: color,
		strokeWidth: 5,
		hasControls: true,
		selectable: false
	});
}



var line = makeLine([ 70, 350, 150, 350 ],"red");
canvas.add(line);

//var canvas = new fabric.Canvas('flowchart_main', { selection: false });

canvas.add(
	makeCircle(line.get('x1'), line.get('y1'), null, line,"red"),
	makeCircle(line.get('x2'), line.get('y2'), line, null,"blue")
);


var group = new fabric.Group([line, canvas.item(8),canvas.item(9)]);
canvas.setActiveGroup(group);
canvas.renderAll();


canvas.on('object:moving', function(e) {
	var p = e.target;
	if((p+"")=="#<fabric.Circle>" )
	{
		p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
		p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
	}
	else if((p+"")=="#<fabric.Rect>" && p.id == 1)
	{
		var val = getParams(process);
		p.point1.set({ left: val[0], top: val[1] });
		p.point2.set({ left: val[2], top: val[3] });
		p.point3.set({ left: val[4], top: val[5] });
		p.point4.set({ left: val[6], top: val[7] });
	}
	canvas.renderAll();
});
canvas.findTarget = (function(originalFn) {
  return function() {
    var target = originalFn.apply(this, arguments);
    if (target) {
      if (this._hoveredTarget !== target) {
        canvas.fire('object:over', { target: target });
        if (this._hoveredTarget) {
          canvas.fire('object:out', { target: this._hoveredTarget });
        }
        this._hoveredTarget = target;
      }
    }
    else if (this._hoveredTarget) {
      canvas.fire('object:out', { target: this._hoveredTarget });
      this._hoveredTarget = null;
    }
    return target;
  };
})(canvas.findTarget);


/*canvas.on('object:over', function(e) {
  var p = e.target;
	if((p+"")=="#<fabric.Rect>" && p.id == 1)
	{
		  p.point1.setFill('red');
		  p.point2.setFill('red');
		  p.point3.setFill('red');
		  p.point4.setFill('red');
		  p.point1.setOpacity(0.5);
		  p.point2.setOpacity(0.5);
		  p.point3.setOpacity(0.5);
		  p.point4.setOpacity(0.5);
	}
  canvas.renderAll();
});

canvas.on('object:out', function(e) {
  var p = e.target;
if((p+"")=="#<fabric.Rect>" && p.id == 1)
{
	  p.point1.setFill('none');
	  p.point2.setFill('none');
	  p.point3.setFill('none');
	  p.point4.setFill('none');
}
});*/
