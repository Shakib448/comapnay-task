import { useRef } from "react";

function App() {
  const canvasRef = useRef();

  const startDrawing = () => {};

  const finishDrawing = () => {};

  const draw = () => {};

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseDown={onMouseDown}
      onMouseMove={draw}
    />
  );
}

export default App;
