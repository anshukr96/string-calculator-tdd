export interface CalculatorResult {
    value: number;
  }
  
  interface ParsedInput {
    delimiter: string;
    numbers: string;
  }
  
  // Pure functions for each operation
  const parseInput = (input: string): ParsedInput => {
    if (!input.startsWith('//')) {
      return { delimiter: ',', numbers: input };
    }
  
    const delimiterEnd = input.indexOf('\n');
    return {
      delimiter: input.substring(2, delimiterEnd),
      numbers: input.substring(delimiterEnd + 1)
    };
  };
  
  const parseNumbers = (numbers: string, delimiter: string): number[] => {
    const processedInput = numbers.replace(/\n/g, delimiter);
    return processedInput.split(delimiter).map(num => parseInt(num.trim()));
  };
  
  const validateNumbers = (numbers: number[]): void => {
    const negativeNumbers = numbers.filter(num => num < 0);
    if (negativeNumbers.length > 0) {
      throw new Error(`negative numbers not allowed: ${negativeNumbers.join(',')}`);
    }
  };
  
  const sumNumbers = (numbers: number[]): number => 
    numbers.reduce((sum, num) => sum + (isNaN(num) ? 0 : num), 0);
  
  // Main calculator function
  export const calculate = (input: string): CalculatorResult => {
    if (!input) return { value: 0 };
  
    const { delimiter, numbers } = parseInput(input);
    const parsedNumbers = parseNumbers(numbers, delimiter);
    validateNumbers(parsedNumbers);
    const sum = sumNumbers(parsedNumbers);
  
    return { value: sum };
  };
  
  // Export individual functions if needed for testing
  export const calculatorService = {
    calculate,
    parseInput,
    parseNumbers,
    validateNumbers,
    sumNumbers,
  };