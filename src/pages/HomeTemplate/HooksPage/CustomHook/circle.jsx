import "./style.scss";
import { useMagicColor } from "./useMagicColor";

export default function Circle() {
  const color = useMagicColor();

  return (
    <div>
      <div className="square rounded-full" style={{ backgroundColor: color }}>
        Circle
      </div>
    </div>
  );
}
