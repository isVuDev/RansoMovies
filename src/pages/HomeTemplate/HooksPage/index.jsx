import React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import Child from "./child";
import CustomHook from "./CustomHook";

export default function HooksPage() {
  const [number, setNumber] = useState(0);
  const [keyword, setKeyword] = useState("");

  console.log("render - HooksPage");

  useEffect(() => {
    console.log("useEffect - HooksPage - chạy 1 lần duy nhất");
  }, []);

  useEffect(() => {
    console.log(
      `useEffect - HooksPage - chạy mỗi lần number thay đổi - lấy data trang ${
        number + 1
      }`
    );
  }, [number, keyword]);

  useEffect(() => {
    let interval = setInterval(() => {
      console.log("Hello Cybersoft");
    }, 1000);

    return () => {
      // clearInterval, clear tài nguyên k còn sử dụng...
      clearInterval(interval);
    };
  }, []);

  const handleTest = () => {
    console.log("handleTest");
  };

  const handleTestCache = useCallback(handleTest, []);

  const handleCountUp = () => {
    let i = 0;
    while (i < 1000) {
      i++;
    }

    console.log(i);

    return i;
  };

  const countUpCache = useMemo(() => handleCountUp(), []);

  return (
    <div>
      <h1>HooksPage</h1>
      <h1>Number: {number}</h1>
      <button onClick={() => setNumber(number + 1)}>+</button>

      <h1>Number Up: {countUpCache}</h1>

      <hr />

      <Child handleTest={handleTestCache} />

      <hr />

      <CustomHook />
    </div>
  );
}
