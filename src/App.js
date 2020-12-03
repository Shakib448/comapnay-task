import { useEffect, useRef } from "react";

function App() {
  const canvasRef = useRef();
  const contextRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = t;
    contextRef.current = context;
  }, []);

  const startDrawing = () => {};

  const finishDrawing = () => {};

  const draw = () => {};

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseDown={onMouseDown}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
}

export default App;
