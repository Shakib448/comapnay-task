import React, { useRef, useEffect, useState } from "react";
import "./App.sass";

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 600;
    canvas.height = 400;
    canvas.style.width = `600px`;
    canvas.style.height = `400px`;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.scale(1, 1);
    context.lineCap = "round";
    context.strokeStyle = `${color}`;
    context.lineWidth = 2;
    contextRef.current = context;
  }, [color]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const colorPicker = [
    {
      name: "Red",
      color: "#FF0000",
    },
    {
      name: "Green",
      color: "#00FF00",
    },
    {
      name: "Yellow",
      color: "#FFFF00",
    },
    {
      name: "Sky",
      color: "#CDBDE9",
    },
  ];

  return (
    <main>
      <div className="canvas__color">
        {colorPicker.map(({ name, color }, inx) => (
          <button
            className={name}
            style={{ borderColor: `${color}` }}
            key={inx}
            onClick={() => setColor(color)}
          ></button>
        ))}
      </div>
      <div className="canvas">
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          ref={canvasRef}
        />
      </div>
    </main>
  );
}

export default App;
