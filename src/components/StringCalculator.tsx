import { useCalculator } from "../hooks/useCalculator";
import { ResultDisplay } from "./ResultDisplay";

const StringCalculator = () => {
  const [{ input, result, error }, { setInput, calculate }] = useCalculator();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">String Calculator</h1>
          <p className="text-gray-600">Enter numbers separated by commas or newlines</p>
        </div>

        <div className="space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 p-4 text-gray-700 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Examples:&#13;&#10;1,2,3&#13;&#10;1\n2,3&#13;&#10;//;\n1;2;3"
          />
          
          <button
            onClick={calculate}
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Calculate Sum
          </button>
        </div>

        <ResultDisplay result={result} />

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-red-700 font-semibold">Error:</span>
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Input Examples:</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p><span className="font-medium">Basic:</span> "1,2,3" → 6</p>
            <p><span className="font-medium">With newlines:</span> "1\n2,3" → 6</p>
            <p><span className="font-medium">Custom delimiter:</span> "//;\n1;2;3" → 6</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StringCalculator;