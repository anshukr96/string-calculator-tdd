export interface CalculatorResult {
    value: number;
  }
  
  interface ParsedInput {
    delimiter: string;
    numbers: string;
  }
  
  const parseInput = (input: string): ParsedInput => {
    if (!input) {
      return { delimiter: ',', numbers: '' };
    }
  
    if (input.startsWith('//')) {
      const delimiterEnd = input.indexOf('\\n');
      
      if (delimiterEnd === -1) {
        throw new Error('Invalid delimiter format');
      }
      const delimiter = input.substring(2, delimiterEnd);
      
      const numbers = input.substring(delimiterEnd + 2);
      
      return {
        delimiter,
        numbers
      };
    }
  
    return { delimiter: ',', numbers: input };
  };
  
  const parseNumbers = (numbers: string, delimiter: string): number[] => {
    if (!numbers) return [];
    
    const processedInput = numbers.replace(/\n/g, delimiter);
    return processedInput
      .split(delimiter)
      .map(num => num.trim())
      .filter(num => num !== '')
      .map(num => {
        const parsed = parseInt(num);
        if (isNaN(parsed)) {
          throw new Error(`Invalid number format: "${num}"`);
        }
        return parsed;
      });
  };
  
  const validateNumbers = (numbers: number[]): void => {
    const negativeNumbers = numbers.filter(num => num < 0);
    if (negativeNumbers.length > 0) {
      throw new Error(`negative numbers not allowed: ${negativeNumbers.join(',')}`);
    }
  };
  
  const sumNumbers = (numbers: number[]): number => 
    numbers.reduce((sum, num) => sum + (isNaN(num) ? 0 : num), 0);
  
  export const calculate = (input: string): CalculatorResult => {
    if (!input) return { value: 0 };
  
    const { delimiter, numbers } = parseInput(input);
    const parsedNumbers = parseNumbers(numbers, delimiter);
    validateNumbers(parsedNumbers);
    const sum = sumNumbers(parsedNumbers);
  
    return { value: sum };
  };
  
  export const calculatorService = {
    calculate,
    parseInput,
    parseNumbers,
    validateNumbers,
    sumNumbers,
  };