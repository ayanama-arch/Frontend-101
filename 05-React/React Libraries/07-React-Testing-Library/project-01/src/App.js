import { useState } from "react";

export default function App() {
  const [text, setText] = useState("original text");
  return (
    <>
      <h2>{text}</h2>
      <button onClick={() => setText("update text")}>Update</button>
    </>
  );
}
