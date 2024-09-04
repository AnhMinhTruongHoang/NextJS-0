import { useState } from "react";

interface Iprops {
  name: string;
  age: number;
  info: {
    gender: string;
    address: string;
  };
  handleTest: (value: string) => void; ///// ko co input dau vao or  dung any
  listToDo: string[];
  setListToDo: (v: string[]) => void; /// tra ve void or :any
}

const InputToDo = (props: Iprops) => {
  // const [fullName, setFullName] = useState("");
  const { handleTest, listToDo, setListToDo } = props;
  const [getName, setGetName] = useState("");

  const handleSave = () => {
    handleTest(getName);
    if (!getName) {
      alert("name not set");
      return;
    }

    setListToDo([...listToDo, getName]);
    setGetName("");
  };

  return (
    <div style={{ border: "1px solid red" }}>
      <div>New count </div>
      {/* <div>age = {props.age}</div>
      <div>name = {props.name}</div> */}
      <label htmlFor="inputTo"> Add new todo</label>
      <input
        value={getName}
        onChange={(event) => setGetName(event.target.value)}
        type="text"
        id="inputTo"
      />

      <button
        onClick={() => handleSave()}
        style={{ border: "1px solid green", borderRadius: "5px" }}
      >
        Save
      </button>
     
    
    </div>
  );
};

export default InputToDo;
