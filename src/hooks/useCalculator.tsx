import { useState } from 'react';
import { calculate } from '../services/calculatorService';

interface CalculatorState {
  input: string;
  result: number | null;
  error: string;
}

interface CalculatorActions {
  setInput: (value: string) => void;
  calculate: () => void;
}

export const useCalculator = (): [CalculatorState, CalculatorActions] => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    try {
      const { value } = calculate(input);
      setResult(value);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    }
  };

  return [
    { input, result, error },
    { setInput, calculate: handleCalculate }
  ];
};