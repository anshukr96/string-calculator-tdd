import '@testing-library/jest-dom';
import { calculate } from '../services/calculatorService';

describe('String Calculator', () => {
  describe('basic inputs', () => {
    it('should return 0 for empty string', () => {
      expect(calculate('')).toEqual({ value: 0 });
    });

    it('should return the number for single input', () => {
      expect(calculate('1')).toEqual({ value: 1 });
    });

    it('should return sum for two numbers', () => {
      expect(calculate('1,5')).toEqual({ value: 6 });
    });
  });

  describe('multiple numbers', () => {
    it('should handle three numbers', () => {
      expect(calculate('1,2,3')).toEqual({ value: 6 });
    });

    it('should handle many numbers', () => {
      expect(calculate('1,2,3,4,5,6,7,8,9,10')).toEqual({ value: 55 });
    });

    it('should handle single digit numbers', () => {
      expect(calculate('1,1,1,1,1')).toEqual({ value: 5 });
    });

    it('should handle multiple digit numbers', () => {
      expect(calculate('10,20,30')).toEqual({ value: 60 });
    });
  });

  describe('newline delimiter', () => {
    it('should handle newline as delimiter', () => {
      expect(calculate('1\n2,3')).toEqual({ value: 6 });
    });

    it('should handle only newlines', () => {
      expect(calculate('1\n2\n3')).toEqual({ value: 6 });
    });

    it('should handle mixed delimiters', () => {
      expect(calculate('1,2\n3,4\n5')).toEqual({ value: 15 });
    });
  });

  describe('custom delimiters', () => {
    it('should handle semicolon delimiter', () => {
      expect(calculate('//;\\n1;2')).toEqual({ value: 3 });
    });

    it('should handle hash delimiter', () => {
      expect(calculate('//#\\n1#2#3')).toEqual({ value: 6 });
    });

    it('should handle dollar sign delimiter', () => {
      expect(calculate('//$\\n1$2$3')).toEqual({ value: 6 });
    });

    it('should handle custom delimiter with multiple numbers', () => {
      expect(calculate('//;\\n1;2;3;4;5')).toEqual({ value: 15 });
    });

    it('should throw error for invalid delimiter format', () => {
      expect(() => calculate('//;1;2;3'))
        .toThrow('Invalid delimiter format');
    });
  });

  describe('negative numbers', () => {
    it('should throw error for single negative number', () => {
      expect(() => calculate('1,-2,3'))
        .toThrow('negative numbers not allowed: -2');
    });

    it('should throw error with all negative numbers in message', () => {
      expect(() => calculate('1,-2,3,-4,5,-6'))
        .toThrow('negative numbers not allowed: -2,-4,-6');
    });

    it('should throw error with negative numbers using custom delimiter', () => {
      expect(() => calculate('//;\\n1;-2;3;-4'))
        .toThrow('negative numbers not allowed: -2,-4');
    });

    it('should throw error with negative numbers using newline delimiter', () => {
      expect(() => calculate('1\n-2\n3\n-4'))
        .toThrow('negative numbers not allowed: -2,-4');
    });
  });

  describe('edge cases', () => {
    it('should handle whitespace around numbers', () => {
      expect(calculate('1, 2, 3')).toEqual({ value: 6 });
    });

    it('should throw error for invalid number format', () => {
      expect(() => calculate('1,a,3'))
        .toThrow('Invalid number format: "a"');
    });

    it('should handle zero', () => {
      expect(calculate('0')).toEqual({ value: 0 });
    });

    it('should handle zeros mixed with other numbers', () => {
      expect(calculate('0,1,0,2,0')).toEqual({ value: 3 });
    });

    it('should handle consecutive delimiters', () => {
      expect(calculate('1,,2')).toEqual({ value: 3 });
    });

    it('should handle leading/trailing delimiters', () => {
      expect(calculate(',1,2,')).toEqual({ value: 3 });
    });
  });
});