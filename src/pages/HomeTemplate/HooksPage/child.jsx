import { memo } from "react";

function Child() {
  console.log("render - Child");

  return (
    <div>
      <h1>Child</h1>
    </div>
  );
}

export default memo(Child);
