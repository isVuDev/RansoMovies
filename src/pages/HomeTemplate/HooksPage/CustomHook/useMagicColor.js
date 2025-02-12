import { useState, useEffect } from "react";

function useMagicColor() {
  const [color, setColor] = useState("red");

  useEffect(() => {
    setInterval(() => {
      // random color code
      const color = Math.floor(Math.random() * 999999);
      setColor(`#${color}`);
    }, 1000);
  }, []);

  return color;
}

export { useMagicColor };
