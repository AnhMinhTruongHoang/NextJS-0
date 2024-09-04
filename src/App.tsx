import { useState } from "react";
import InputToDo from "./componets/Users/Inputtodo";

function App() {
  const name = "minh";
  const age = 25;
  const info = {
    gender: "male",
    address: "Dn",
  };

  const [listToDo, setListToDo] = useState([
    "t1",
    "t2",
    "t3",
    "t4",
    "t5",
    "t6",
  ]);

  const handleTest = (getName: string) => {
    alert(`handle test name = ${getName}`);
  };

  return (
    <div>
      <div className="parent">
        <div className="child"></div>
      </div>
      <InputToDo
        name={name}
        age={age}
        info={info}
        handleTest={handleTest}
        listToDo={listToDo}
        setListToDo={setListToDo}
      />
      <br style={{border: "1px solid red"}} />
      <ul>
        {listToDo.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
