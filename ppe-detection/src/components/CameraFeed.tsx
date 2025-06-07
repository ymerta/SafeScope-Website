import React, { useEffect, useRef, useState } from "react";
import { database, ref, onValue } from "../firebase";

const WS_URL = "ws://localhost:8000/ws/ppe";
const MJPEG_URL = (cameraId: string) => `http://localhost:8000/video_feed?camera=${cameraId}`;

const CameraFeed: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [detections, setDetections] = useState<any[]>([]);
  const [cameraList, setCameraList] = useState<string[]>([]);
  const [selectedCamera, setSelectedCamera] = useState("camera_1");

  // Kameraları Firebase'den çek
  useEffect(() => {
    const camRef = ref(database, "camera-settings");
    onValue(camRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const keys = Object.keys(data);
        setCameraList(keys);
        if (!keys.includes(selectedCamera)) {
          setSelectedCamera(keys[0]);
        }
      }
    });
  }, []);

  // WebSocket bağlantısı
  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.detections) {
        setDetections(data.detections);
      }
    };
    return () => ws.close();
  }, []);

  // Canvas çizimi
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imgRef.current;

    if (!canvas || !ctx || !img) return;

    const drawLoop = () => {
      if (img.complete) {
        const { width, height } = img;
        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        detections.forEach((d) => {
          const [x1, y1, x2, y2] = d.box;
          ctx.strokeStyle = "lime";
          ctx.lineWidth = 2;
          ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
          ctx.fillStyle = "yellow";
          ctx.font = "14px Arial";
          ctx.fillText(`${d.class} (${d.confidence})`, x1 + 4, y1 - 6);
        });
      }
      requestAnimationFrame(drawLoop);
    };

    drawLoop();
  }, [detections]);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 800 }}>
      {/* Kamera seçici */}
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="camera-select">Select Camera: </label>
        <select
          id="camera-select"
          value={selectedCamera}
          onChange={(e) => setSelectedCamera(e.target.value)}
        >
          {cameraList.map((cam) => (
            <option key={cam} value={cam}>{cam}</option>
          ))}
        </select>
      </div>

      {/* Gizli MJPEG görüntü */}
      <img
        ref={imgRef}
        src={MJPEG_URL(selectedCamera)}
        alt="Live Feed"
        style={{ display: "none" }}
      />

      {/* Canvas üstüne çizim */}
      <canvas
        ref={canvasRef}
        style={{ width: "100%", border: "2px solid #ccc", borderRadius: 10 }}
      />
    </div>
  );
};

export default CameraFeed;