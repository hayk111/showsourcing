// to modify vanilla String we can declare an interface here. Without doing so the compiler would throw an error.
interface String {
	capitalize: any;
}

// 'hello', to 'Hello'
String.prototype.capitalize = function () {
	return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};
