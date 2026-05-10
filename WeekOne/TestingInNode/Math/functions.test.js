const {
	add,
	subtract,
	multiply,
	divide,
	sqrt,
	max,
} = require('./functions.js');

describe('Math Functions', () => {
	test('add function should return the sum of two numbers', () => {
		expect(add(2, 3)).toBe(5);
	});

	test('subtract function should return the difference of two numbers', () => {
		expect(subtract(5, 2)).toBe(3);
	});

	test('multiply function should return the product of two numbers', () => {
		expect(multiply(4, 3)).toBe(12);
	});

	test('divide function should return the quotient of two numbers', () => {
		expect(divide(10, 2)).toBe(5);
	});

	test('sqrt function should return the square root of a number', () => {
		expect(sqrt(4)).toBe(2);
	});

	test('max function should return the maximum of two numbers', () => {
		expect(max(5, 10)).toBe(10);
	});
});
