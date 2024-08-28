// ///object
// console.log("hello world");

// const user = {
//   name: "Eric",
//   age: 25,
//   address: "Ha Noi",
// };

// // const name = user.name;
// // const age = user.age;
// // const address = user.address;

// const { name, age, address } = user;

// console.log("check ", user);

// ///array
// lever = ["i", "f", "j", "m", "s"];

// const [a, , , , b] = lever;

// console.log(";", a, ";", b);

// ///spread syntax

// const arr1 = [1, 2, 3];
// // arr1.push(5);
// // const arr2 = arr1;

// // const arr2 = [...arr1,5];
// const arr2 = [0, ...arr1, 5];

// console.log(">>> check arr1", arr1, "arr2", arr2);

// ////b

// const obj1 = { foo: "bar", x: 42 };
// const obj2 = { foo: "baz", y: 13 };
// const clonedObj = { ...obj1 };
// // { foo: "bar", x: 42 }
// const mergedObj = { ...obj1, ...obj2 };
// // { foo: "baz", x: 42, y: 13 }

// console.log(">>> check obj1", clonedObj, "merge", mergedObj);

///12. Conditional Operator (Toán tử điều kiện)

// const a = 10;
// // let b = null;
// // if (a > 5) {
// //   b = true;
// // } else {
// //   b = false;
// // }

// /////
// const b = a > 5 ? true : false;

//13 optional chaining

// const x = {
//   name: 'Alice',
//   cat: {
//   name: 'Dinah'
//   }
//  };

//  console.log('check name =' ,x.cat.name)  /// binh thuong
////////////// a
// const x = {
//   name: "Alice",
//   cat: {
//     name: "Dinah",
//   },
// };

// console.log("check name =", x?.dog?.name ?? 'minh'); //// dung optional chaining bo qua loi
///// b
const arr1 = null;

const arr2 = arr1?.map((item) => item * 2) ?? [69]

console.log(">>> check arr2", arr2, "arr1", arr1);
