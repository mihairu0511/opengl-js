let which_drawing = 1;  // which drawing test to call

// create the canvas region for drawing
function setup() {
  createCanvas(400, 400, P2D);
}

// draw one of the test cases
function draw() {
  
  background (230, 230, 255);
  stroke (0, 0, 0);
  
  switch (which_drawing) {
    case 1:
      ortho_test();
      break;
    case 2:
      ortho_test_scale();
      break;
    case 3:
      ortho_test_rotate();
      break;
    case 4:
      face_test();
      break;
    case 5:
      faces();
      break;
    case 6:
      ortho_cube();
      break;
    case 7:
      ortho_cube2();
      break;
    case 8:
      perspective_cube();
      break;
    case 9:
      perspective_multi_cube();
      break;
    case 0:
      persp_initials();
      break;
    default:
      break;
  }
}

// handle key presses of digits
function keyPressed() {
    
  if (key == '1') {
    which_drawing = 1;
  }
  if (key == '2') {
    which_drawing = 2;
  }
  if (key == '3') {
    which_drawing = 3;
  }
  if (key == '4') {
    which_drawing = 4;
  }
  if (key == '5') {
    which_drawing = 5;
  }
  if (key == '6') {
    which_drawing = 6;
  }
  if (key == '7') {
    which_drawing = 7;
  }
  if (key == '8') {
    which_drawing = 8;
  }
  if (key == '9') {
    which_drawing = 9;
  }
  if (key == '0') {
    which_drawing = 0;
  }
}

// Test square drawing.
function ortho_test()
{
  let near = -10.0;
  let far = 40.0;
  
  Init_Matrix_Stack();
  Ortho (-100.0, 100.0, -100.0, 100.0, near, far);

  Square();
}

// Test square drawing with non-uniform scaling.
function ortho_test_scale()
{
  let near = -10.0;
  let far = 40.0;

  Init_Matrix_Stack();
  Ortho (-100.0, 100.0, -100.0, 100.0, near, far);

  Push_Matrix();
  Scale (1.0, 0.5, 1.0);
  Square();
  Pop_Matrix();
}

// Test square drawing with rotation.
function ortho_test_rotate()
{
  let near = -10.0;
  let far = 40.0;

  Init_Matrix_Stack();
  Ortho (-100.0, 100.0, -100.0, 100.0, near, far);

  Push_Matrix();
  RotateZ (20);
  Square();
  Pop_Matrix();
}

// draw a square
function Square()
{
  BeginShape(LINES);
  
  Vertex (-50.0, -50.0, 0.0);
  Vertex (-50.0,  50.0, 0.0);

  Vertex (-50.0, 50.0, 0.0);
  Vertex ( 50.0, 50.0, 0.0);

  Vertex (50.0, 50.0, 0.0);
  Vertex (50.0, -50.0, 0.0);

  Vertex (50.0, -50.0, 0.0);
  Vertex (-50.0, -50.0, 0.0);
  
  EndShape();
}

// Draw a cube.
function Cube()
{
  BeginShape(LINES);

  /* top square */

  Vertex (-1.0, -1.0,  1.0);
  Vertex (-1.0,  1.0,  1.0);

  Vertex (-1.0,  1.0,  1.0);
  Vertex ( 1.0,  1.0,  1.0);

  Vertex ( 1.0,  1.0,  1.0);
  Vertex ( 1.0, -1.0,  1.0);

  Vertex ( 1.0, -1.0,  1.0);
  Vertex (-1.0, -1.0,  1.0);

  /* bottom square */

  Vertex (-1.0, -1.0, -1.0);
  Vertex (-1.0,  1.0, -1.0);

  Vertex (-1.0,  1.0, -1.0);
  Vertex ( 1.0,  1.0, -1.0);

  Vertex ( 1.0,  1.0, -1.0);
  Vertex ( 1.0, -1.0, -1.0);

  Vertex ( 1.0, -1.0, -1.0);
  Vertex (-1.0, -1.0, -1.0);

  /* connect top to bottom */

  Vertex (-1.0, -1.0, -1.0);
  Vertex (-1.0, -1.0,  1.0);

  Vertex (-1.0,  1.0, -1.0);
  Vertex (-1.0,  1.0,  1.0);

  Vertex ( 1.0,  1.0, -1.0);
  Vertex ( 1.0,  1.0,  1.0);

  Vertex ( 1.0, -1.0, -1.0);
  Vertex ( 1.0, -1.0,  1.0);

  EndShape();
}

// Orthographic cube.
function ortho_cube()
{ 
  Init_Matrix_Stack();
  Ortho (-2.0, 2.0, -2.0, 2.0, 0.0, 10000.0);

  Push_Matrix();
  Translate (0.0, 0.0, -4.0);
  RotateY(17.0);
  Cube();
  Pop_Matrix();
}

// Orthographic cube rotated.

function ortho_cube2()
{    
  Init_Matrix_Stack();
  Ortho (-2.0, 2.0, -2.0, 2.0, 0.0, 10000.0);

  Push_Matrix();
  Translate (0.0, 0.0, -4.0);
  RotateZ(5.0);
  RotateX(25.0);
  RotateY(20.0);
  Cube();
  Pop_Matrix();
}

// Perspective cube.
function perspective_cube()
{
  Init_Matrix_Stack();
  Perspective (60.0, 1.0, 100.0);

  Push_Matrix();
  Translate (0.0, 0.0, -4.0);
  Cube();
  Pop_Matrix();
}

// Draw multiple cubes in perspective.
function perspective_multi_cube()
{
  Perspective (60.0, 1.0, 100.0);

  Init_Matrix_Stack();

  Push_Matrix();
  Translate (0.0, 0.0, -20.0);
  RotateZ(5);
  RotateX(25);
  RotateY(20);
    
  // draw several cubes in three lines along the axes
  for (let delta = -12; delta <= 12; delta += 3) {
    
    Push_Matrix();
    Translate(delta, 0, 0);
    Cube();
    Pop_Matrix();
    
    Push_Matrix();
    Translate(0, delta, 0);
    Cube();
    Pop_Matrix();
    
    Push_Matrix();
    Translate(0, 0, delta);
    Cube();
    Pop_Matrix();
  }

  Pop_Matrix();
}

// Test the matrix stack by drawing a face.
function face_test()
{
  let nnear = -10.0;
  let ffar = 100000.0;

  Ortho (0.0, 1.0, 0.0, 1.0, nnear, ffar);

  Init_Matrix_Stack();
  face (1, 0, 0, 0);
}

// Draw four faces.
function faces()
{
  let near = -10.0;
  let far = 100000.0;

  Ortho (0.0, 1.0, 0.0, 1.0, near, far);

  Init_Matrix_Stack();

  face (0.5, 0, 0.25, -0.25);
  face (0.5, 0, -0.25, -0.25);
  face (0.5, 0, 0.25, 0.25);
  face (0.5, 30, -0.25, 0.25);
}

// Draw a face.
function face(sc, theta, dx, dy)
{
  // head
  
  Push_Matrix();

  Translate (dx, dy, 1.0);
  Translate (0.5, 0.5, 0.0);
  RotateZ (theta);
  Scale (sc, sc, 1.0);
  Translate (-0.5, -0.5, 0.0);
  
  Push_Matrix();
  Translate (0.5, 0.5, 0.0);
  Scale (0.4, 0.4, 1.0);
  Circle();
  Pop_Matrix();

  // right eye

  Push_Matrix();
  Translate (0.7, 0.7, 0.0);
  Scale (0.1, 0.1, 1.0);
  Circle();
  Pop_Matrix();

  // left eye

  Push_Matrix();
  Translate (0.3, 0.7, 0.0);
  Scale (0.1, 0.1, 1.0);
  Circle();
  Pop_Matrix();

  // nose

  Push_Matrix();
  Translate (0.5, 0.5, 0.0);
  Scale (0.07, 0.07, 1.0);
  Circle();
  Pop_Matrix();

  // mouth
  
  Push_Matrix();
  Translate (0.5, 0.25, 0.0);
  Scale (0.2, 0.1, 1.0);
  Circle();
  Pop_Matrix();

  Pop_Matrix();

}

// Draw a circle of unit radius.
function Circle()
{
  let steps = 50;

  BeginShape(LINES);

  let x0 = 1.0;
  let y0 = 0.0;
  for (let i = 0; i <= steps; i++) {
    let theta = 2 * 3.1415926535 * i / steps;
    let x1 = cos (theta);
    let y1 = sin (theta);
    Vertex (x0, y0, 0.0);
    Vertex (x1, y1, 0.0);
    x0 = x1;
    y0 = y1;
  }

  EndShape();
}
