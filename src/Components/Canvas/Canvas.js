import jsPDF from "jspdf";
import React, { useRef, useEffect, useState } from "react";
import "./Canvas.sass";

const Canvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#FF0000");
  const [clear, setClear] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 600;
    canvas.height = 400;
    canvas.style.width = `600px`;
    canvas.style.height = `400px`;
  }, [clear]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.scale(1, 1);
    context.lineCap = "round";
    context.strokeStyle = `${color}`;
    context.lineWidth = 2;
    contextRef.current = context;
  }, [color, clear]);

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

  const canvasDownload = () => {
    const canvas = document.getElementById("pdfCanvas");
    const imgData = canvas.toDataURL("", {
      type: "image/jpeg",
      encoderOptions: 1.0,
    });
    const doc = new jsPDF();
    doc.setFontSize(40);
    doc.text("I hope the task is completed", 20, 20);
    doc.addImage(imgData, "JPEG", 15, 40, 180, 180);
    doc.save("download.pdf");
  };

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
        <button
          className="canvas__clear"
          onClick={() => setClear(!clear)}
          style={{ borderColor: "lightgray" }}
        ></button>
      </div>

      <div className="canvas">
        <canvas
          id="pdfCanvas"
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          ref={canvasRef}
        />
      </div>
      <button onClick={canvasDownload} className="canvas__downloadBtn" download>
        Download PDF
      </button>
    </main>
  );
};

export default Canvas;
