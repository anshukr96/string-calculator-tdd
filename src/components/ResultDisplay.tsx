interface ResultDisplayProps {
    result: number | null;
  }
  
  export const ResultDisplay = ({ result }: ResultDisplayProps) => {
    if (result === null) return null;
    
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-green-700 font-semibold">Result:</span>
          <span className="text-green-800 text-lg">{result}</span>
        </div>
      </div>
    );
  };