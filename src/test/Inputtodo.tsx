

interface Iprops {
  name: string;
  age: number;
  info: {
    gender: string;
    address: string;
  }
  abc?: string
}

const InputToDo = (props: Iprops) => {
  console.log("check props", props);
  return (
    <div>
      <div>age = {props.age}</div>
      <div>name = {props.name}</div>
      <label htmlFor="inputTo"> Add new todo</label>
      <input id="inputTo" />
      <button style={{ border: "1px solid grey", borderRadius: "5px" }}>
        {" "}
        Save{" "}
      </button>
    </div>
  );
};

export default InputToDo;
