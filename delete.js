// function foo() {
// 	console.log(this.a);
// }

// function func() {
// 	var a = 5;
// 	foo.call(func);
// }

// func();

// var obj = {
// 	a: 4,
// 	// foo: foo,
// 	false: false,
// };

// foo.call(obj);

let obj = {
	b: 3,
	get a() {
		return this.b;
	},
	set a(val) {
		this.a = val * 2;
	},
};

obj.a = 2;
console.log(obj.a);
obj.a = 3;
console.log(obj.a);
