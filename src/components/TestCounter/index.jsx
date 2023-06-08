import { createSignal } from "solid-js";

function TestCounter() {
    const [count, setCount] = createSignal(0);

  const handleBtnClick = () => {
    console.log("im getting clicked");
    setCount((c) => c + 1)
  };

 
  return (
    <div>
      <div>btn will follow</div>
      <div>count value: {`${count()}`}</div>
      <div>
        <button onClick={handleBtnClick}>Click me</button>
      </div>
    </div>
  );
}

export default TestCounter;
