function persp_initials()
{
  Perspective(45, 0, 0);
  Init_Matrix_Stack();
  Push_Matrix();
  Translate(0, 0, -20);   
  RotateX(25);            
  BeginShape(LINES);
  Vertex(-6, 0, 0);
  Vertex(-6, 6, 0);
  Vertex(-6, 6, 0);
  Vertex(-4, 0, 0);
  Vertex(-4, 0, 0);
  Vertex(-2, 6, 0);
  Vertex(-2, 6, 0);
  Vertex(-2, 0, 0);
  Vertex(2, 6, 0);
  Vertex(6, 6, 0);
  Vertex(4, 6, 0);
  Vertex(4, 0, 0);
  EndShape();
  Pop_Matrix();
}
