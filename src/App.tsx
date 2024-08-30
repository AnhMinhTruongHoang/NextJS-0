import InputToDo from "./test/Inputtodo";

function App() {
  const name = "minh";
  const age = 25;
  const info = {
    gender: "male",
    address: "Dn",
  };

  const todos = ["t1", "t2", "t3", "t4", "t5", "t6"];

  return (
    <div>
      <div className="parent">
        <div className="child"></div>
      </div>
      <InputToDo name={name} age={age} info={info} />
      <ul>
        {todos.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default App; 
