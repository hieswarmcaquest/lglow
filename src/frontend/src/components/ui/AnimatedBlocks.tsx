import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaBrain, FaNetworkWired, FaInfoCircle } from "react-icons/fa";

const blockVariants = {
  initial: { opacity: 1 },
  animate: {
    x: [0, 2, -2, 0],
    y: [0, 1, -1, 0],
    transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
  },
  drag: {
    x: [0, 10, -10, 0],
    y: [0, 5, -5, 0],
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const Block = ({ gradient, position, setPosition, refProp, label, icon, maxWidth }) => {
  const handleMouseDown = (event) => {
    const startX = event.clientX - position.left;
    const startY = event.clientY - position.top;

    const handleMouseMove = (event) => {
      setPosition({
        left: event.clientX - startX,
        top: event.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <motion.div
      ref={refProp}
      variants={blockVariants}
      initial="initial"
      animate="animate"
      whileTap="drag"
      className={`w-[${maxWidth}px] px-6 h-20 whitespace-nowrap ${gradient} flex items-center justify-center gap-2 rounded-2xl shadow-lg absolute cursor-pointer border-2 border-white`}
      style={{ left: position.left, top: position.top }}
      onMouseDown={handleMouseDown}
    >
      {icon}
      <span className="text-white text-lg font-bold drop-shadow-lg">{label}</span>
    </motion.div>
  );
};

const AnimatedBlocks = () => {
  const block1Ref = useRef(null);
  const block2Ref = useRef(null);
  const block3Ref = useRef(null);
  const block4Ref = useRef(null);
  const canvasRef = useRef(null);

  const [block1Pos, setBlock1Pos] = useState({ left: 200, top: 100 });
  const [block2Pos, setBlock2Pos] = useState({ left: 200, top: 300 });
  const [block3Pos, setBlock3Pos] = useState({ left: 200, top: 500 });
  const [block4Pos, setBlock4Pos] = useState({ left: 440, top: 300 });

  useEffect(() => {
    setTimeout(() => {
      setBlock4Pos(prev => ({ left: prev.left + 100, top: prev.top }));
    }, 500);
  }, []);

  const blockLabels = ["Product Research", "AI", "Product Info", "RAG"];
  const maxWidth = Math.max(...blockLabels.map(label => label.length * 14)) + 80;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    const resizeCanvas = () => {
      canvas.width = canvas.parentNode.offsetWidth;
      canvas.height = canvas.parentNode.offsetHeight;
    };
    resizeCanvas();

    let dashOffset = 0;

    function drawLine(blockA, blockB) {
      const startX = blockA.left + maxWidth / 2;
      const startY = blockA.top + 40;
      const endX = blockB.left + maxWidth / 2;
      const endY = blockB.top + 40;

      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.lineDashOffset = dashOffset;
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.lineWidth = 2;
      const gradientColors = ['#ff7eb3', '#ff758c', '#ff7eb3', '#ff758c', '#ff7eb3'];
      const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
      gradientColors.forEach((color, index) => gradient.addColorStop(index / gradientColors.length, color));
      ctx.strokeStyle = gradient;
      ctx.stroke();
    }

    function animateLines() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawLine(block1Pos, block2Pos);
      drawLine(block1Pos, block2Pos);
drawLine(block2Pos, block3Pos);
drawLine(block2Pos, block4Pos);
      drawLine(block2Pos, block4Pos);
      dashOffset -= 0.5;
      requestAnimationFrame(animateLines);
    }

    animateLines();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [block1Pos, block2Pos, block3Pos, block4Pos, maxWidth]);

  return (
    <div className="absolute right-10 top-1/2 transform -translate-y-1/2 w-1/2 h-screen flex justify-center items-center bg-transparent overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
      <Block refProp={block1Ref} gradient="bg-gradient-to-r from-indigo-300 to-indigo-500" position={block1Pos} setPosition={setBlock1Pos} label="Product Research" icon={<FaSearch className="text-white text-xl" />} maxWidth={maxWidth} />
      <Block refProp={block2Ref} gradient="bg-gradient-to-r from-teal-300 to-teal-500" position={block2Pos} setPosition={setBlock2Pos} label="AI" icon={<FaBrain className="text-white text-xl" />} maxWidth={maxWidth} />
      <Block refProp={block3Ref} gradient="bg-gradient-to-r from-rose-300 to-rose-500" position={block3Pos} setPosition={setBlock3Pos} label="Product Info" icon={<FaInfoCircle className="text-white text-xl" />} maxWidth={maxWidth} />
      <Block refProp={block4Ref} gradient="bg-gradient-to-r from-amber-300 to-amber-500" position={block4Pos} setPosition={setBlock4Pos} label="RAG" icon={<FaNetworkWired className="text-white text-xl" />} maxWidth={maxWidth} />
    </div>
  );
};

export default AnimatedBlocks;

