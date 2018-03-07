// to modify vanilla String we can declare an interface here. Without doing so the compiler would throw an error.
interface String {
	capitalize: any;
	pascalToKebabCase: any;
}

// 'hello', to 'Hello'
String.prototype.capitalize = function() {
	return this.replace(/(?:^|\s)\S/g, function(a) {
		return a.toUpperCase();
	});
};

// PascalCase to snake_case used to convert pascal to css rules
String.prototype.pascalToKebabCase = function() {
	return this.split(/(?=[A-Z])/)
		.join('-')
		.toLowerCase();
};
