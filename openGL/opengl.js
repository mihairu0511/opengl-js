let inBeginShape = false;
let vertex = null;

function Ortho (l, r, b, t, n, f) {
  project = "ortho";
  Left = l;
  Right = r;
  Bottom = b;
  Top = t;
}

function Perspective(field_of_view, near, far) {
  project = "perspective";
  FOV = field_of_view;
}

function BeginShape() {
  inBeginShape = true;
  vertex = null;
}

function EndShape() {
  inBeginShape = false;
  vertex = null;
}

function Vertex(x, y, z) {
  if (!inBeginShape) {
    return;
  }

  let matrix = matrixStack[matrixStack.length - 1];
  let [tx, ty, tz] = transform(x, y, z, matrix);

  let [newx, newy] = mapToScreen(tx, ty, tz);

  if (vertex == null) {
    vertex = {newx, newy};
  } else {
    line(vertex.newx, vertex.newy, newx, newy);
    vertex = null;
  }
}

function transform(x, y, z, matrix) {
  let newx = matrix[0][0] * x + matrix[0][1] * y + matrix[0][2] * z + matrix[0][3];
  let newy = matrix[1][0] * x + matrix[1][1] * y + matrix[1][2] * z + matrix[1][3];
  let newz = matrix[2][0] * x + matrix[2][1] * y + matrix[2][2] * z + matrix[2][3];
  return [newx, newy, newz];
}

function mapToScreen(x, y, z) {
  let newx;
  let newy;

  if (project == "ortho") {
    let u = (x - Left) / (Right - Left);
    let v = (y - Bottom) / (Top - Bottom);
    newx = u * width;
    newy = (1 - v) * height;

  } else {
    let radians = (FOV * PI) / 180;
    let k = 1 / tan(radians / 2);
    
    let X = (k * x) / -z;  
    let Y = (k * y) / -z;  
    let u = (X + 1) / 2;     
    let v = (Y + 1) / 2;     
    newx = u * width;
    newy = (1 - v) * height;
  }
  
  return [newx, newy];
}

let formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 8,
});

function identityMatrix() {
  return [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
}

function multiply(x, y) {
  let output = identityMatrix();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      output[i][j] = 0;
      for (let k = 0; k < 4; k++) {
        output[i][j] += x[i][k] * y[k][j];
      }
    }
  }
  return output;
}

function Init_Matrix_Stack()
{
  matrixStack = [];
  matrixStack.push(identityMatrix());
}

function Translate(x, y, z)
{
  let translationMatrix = [
    [1, 0, 0, x],
    [0, 1, 0, y],
    [0, 0, 1, z],
    [0, 0, 0, 1],
  ];
  let C_old = matrixStack[matrixStack.length - 1];
  let C_new = multiply(C_old, translationMatrix);
  matrixStack[matrixStack.length - 1] = C_new;
}

function Scale(x, y, z)
{
  let scaleMatrix = [
    [x, 0, 0, 0],
    [0, y, 0, 0],
    [0, 0, z, 0],
    [0, 0, 0, 1],
  ];
  let C_old = matrixStack[matrixStack.length - 1];
  let C_new = multiply(C_old, scaleMatrix);
  matrixStack[matrixStack.length - 1] = C_new;
}

function RotateX(theta)
{
  let radian = (theta * PI) / 180;
  let rotationMatrix = [
    [1, 0, 0, 0],
    [0, cos(radian), -sin(radian), 0],
    [0, sin(radian), cos(radian), 0],
    [0, 0, 0, 1],
  ];
  let C_old = matrixStack[matrixStack.length - 1];
  let C_new = multiply(C_old, rotationMatrix);
  matrixStack[matrixStack.length - 1] = C_new;
}

function RotateY(theta)
{
  let radian = (theta * PI) / 180;
  let rotationMatrix = [
    [cos(radian), 0, sin(radian), 0],
    [0, 1, 0, 0],
    [-sin(radian), 0, cos(radian), 0],
    [0, 0, 0, 1],
  ];
  let C_old = matrixStack[matrixStack.length - 1];
  let C_new = multiply(C_old, rotationMatrix);
  matrixStack[matrixStack.length - 1] = C_new;
}

function RotateZ(theta)
{
  let radian = (theta * PI) / 180;
  let rotationMatrix = [
    [cos(radian), -sin(radian), 0, 0],
    [sin(radian), cos(radian), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
  let C_old = matrixStack[matrixStack.length - 1];
  let C_new = multiply(C_old, rotationMatrix);
  matrixStack[matrixStack.length - 1] = C_new;
}

function Print_Current_Matrix()
{
  let matrix = matrixStack[matrixStack.length - 1];
  for (let i = 0; i < 4; i++) {
    let row = "";
    for (let j = 0; j < 4; j++) {
      row += formatter.format(matrix[i][j]) + " ";
    }
    console.log(row.trim());
  }
  console.log("");
}

function Push_Matrix()
{
  let matrix = matrixStack[matrixStack.length - 1];
  matrixStack.push(matrix);
}

function Pop_Matrix()
{
  if (matrixStack.length == 1) {
    console.log("Only one matrix, cannot pop stack.");
  } else {
    matrixStack.pop();
  }
}