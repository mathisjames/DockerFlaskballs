//----------------------------------------------------------------------------//
// P R O J E C T  I N F O R M A T I O N //
//----------------------------------------------------------------------------//
//
// NAME: script.js
// DATE: 02/2023
// CREATOR: James Mathis
//
// DESCRIPTION:
// ------------
//    This is the frontend javascript helper for flaskballs.
//
//
// METHODS:
// --------
//   o flaskballs
//       - routine to animate flaskballs in web browser.
//
//----------------------------------------------------------------------------//
        
// link to canvas ID on webpage //
var canvas = document.getElementById('myCanvas');

// create 2d canvas //
var ctx = canvas.getContext('2d');

// Set shadow properties
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Shadow color (black with 50% opacity)
ctx.shadowBlur = 10; // Shadow blur radius
ctx.shadowOffsetX = 5; // Horizontal shadow offset
ctx.shadowOffsetY = 5; // Vertical shadow offset

// create new image object for flaskballs //
var img = new Image();

// add flaskball image source //
img.src = "static/gfx/ball.png";

// set max 3d points //
const max_points = 120;

// create vector points array //
var mx3d = new Array(max_points);
var my3d = new Array(max_points);
var mz3d = new Array(max_points);

// create rotated vector points array //
var x3r = new Array(max_points);
var y3r = new Array(max_points);
var z3r = new Array(max_points);

// create 2d vector points array //
var x2d = new Array(max_points);
var y2d = new Array(max_points);
var z2d = new Array(max_points);

// screen distance //
var distance = 800;

// size / spacing //
vector_size = 12;

// axis //
var ax = 0;
var ay = 0;
var az = 0;

var scale = 2.5


////////////////////////////
// flaskballs 3d mainloop //
//////////////////////////////////////////////////////
function flaskballs() {

	// add random 3d vector coors //
	for (x = 0; x < max_points; x++) {

		mx3d[x] = -5 + Math.floor(Math.random() * 10);
		my3d[x] = -5 + Math.floor(Math.random() * 10);
		mz3d[x] = -6 + Math.floor(Math.random() * 12);
	}

	generateSpherePoints(max_points);

	//generateTorusPoints(numU, numV, R, r);

	// setup vectors x and y //
	var vx = 0;
	var vy = 0;

	// store canvas width and height /2 for radius //
	var vxs = (canvas.width - 40) / 2; 
	var vys = (canvas.height - 40) / 2; 

	// setup vector x/y add or index //
	var vax = 0.05;
	var vay = 0.05; 

	// setup interval refresh cycle //
	setInterval(function(){

		var backgroundColor = "#ffffff";

		// clear canvas for new frame //
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);


		// store temp vectors x/y //
		var tvx = vx;
		var tvy = vy;

		// rotate vectors //
		rotate();

		// project vectors //
		project();

		// plot vectorballs //
		for( i = 0; i < max_points; i++ ) {
	
			// plot ball //
			x = vxs + x2d[i];
			y = vys + y2d[i];

			// draw flaskball with new vector points //
			ctx.drawImage(img, x, y, 40, 40);
//			ctx.drawImage(img, x, y, z3r[i] / 5, z3r[i] / 5);

		}

		// move original vector points so all flaksballs move //
	  	ax += 0.02;
		ay -= 0.03;
		az += 0.04;

	// refresh flaskball page //
	},1000/30);

}

////////////////////
// rotate vectors //
///////////////////////////////////////////////
function rotate() {

    var rotatedPoints = [];

	// loop through 3d points //
	for (x = 0; x < max_points; x++) {

		// 3d vector //
		x0 = mx3d[x] * vector_size;
		y0 = my3d[x] * vector_size;
		z0 = mz3d[x] * vector_size;

        // Perform rotations around x, y, and z axes
        var x1 = x0;
        var y1 = y0 * Math.cos(ax) - z0 * Math.sin(ax);
        var z1 = y0 * Math.sin(ax) + z0 * Math.cos(ax);

        var x2 = x1 * Math.cos(ay) + z1 * Math.sin(ay);
        var y2 = y1;
        var z2 = -x1 * Math.sin(ay) + z1 * Math.cos(ay);

        var x3 = x2 * Math.cos(az) - y2 * Math.sin(az);
        var y3 = x2 * Math.sin(az) + y2 * Math.cos(az);
        var z3 = z2;

        // Store rotated point
        rotatedPoints.push({x: x3, y: y3, z: z3});
    }

    // Sort rotated points by z-coordinate
    rotatedPoints.sort(function(a, b) {
        return b.z - a.z; // Sort in ascending order based on z-coordinate
    });

    // Update original points arrays with sorted rotated points
    for (var i = 0; i < max_points; i++) {
        x3r[i] = rotatedPoints[i].x * scale;
        y3r[i] = rotatedPoints[i].y * scale;
        z3r[i] = rotatedPoints[i].z * scale;
    }

}

// generate 3d sphere //
// Function to generate points on the surface of a sphere
function generateSpherePoints(numPoints) {
 
    var phi = Math.PI * (3 - Math.sqrt(5)); // Golden Ratio

    for (var i = 0; i < numPoints; i++) {
        var y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
        var radius = Math.sqrt(1 - y * y); // Radius at y

        var theta = phi * i; // Golden angle increment

        var x = Math.cos(theta) * radius;
        var z = Math.sin(theta) * radius;

        mx3d[i] = x * 10;
        my3d[i] = y * 10;
        mz3d[i] = z * 10;
    }

}

// Function to generate points on the surface of a torus
function generateTorusPoints(numU, numV, R, r) {

	var a = 0;

    for (var i = 0; i < numU; i++) {
        var u = (i / numU) * 2 * Math.PI;

        for (var j = 0; j < numV; j++) {
            var v = (j / numV) * 2 * Math.PI;

            var x = (R + r * Math.cos(v)) * Math.cos(u);
            var y = (R + r * Math.cos(v)) * Math.sin(u);
            var z = r * Math.sin(v);

            mx3d[a] = x;
            my3d[a] = y;
            mz3d[a] = z;

			a = a + 1;
        }
    }

}

// Usage:
var numU = max_points; // Number of points along the major circumference
var numV = max_points; // Number of points along the minor circumference
var R = 8;     // Major radius
var r = 4;     // Minor radius

/////////////////////////////////
// convert 3d to 2d projection //
/////////////////////////////////////////////////////
function project() {

	// loop through 3d vectors //
	for (x = 0; x < max_points; x++) {

		// convert x to 2d //
		x2d[x] = distance * x3r[x] / (z3r[x] + distance);
		y2d[x] = distance * y3r[x] / (z3r[x] + distance);
	}
}

