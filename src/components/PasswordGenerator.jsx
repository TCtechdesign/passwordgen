import React, { useState } from 'react';

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);


  const generatePassword = () => {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let characters = lower;
    if (includeUppercase) characters += upper;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let result = '';
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * characters.length);
      result += characters[index];
    }

    setPassword(result);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Password Generator</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Length: {length}</label>
          <input
            type="range"
            min="1"
            max="50"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2 mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
              className="mr-2"
            />
            Include Uppercase
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="mr-2"
            />
            Include Numbers
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
              className="mr-2"
            />
            Include Symbols
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded text-white font-semibold transition"
        >
          Generate Password
        </button>

        {password && (
          <div className="mt-6">
            <p className="font-medium mb-1">Your Password:</p>
            <div className="bg-gray-700 px-4 py-2 rounded break-all text-lg font-mono">
              {password}
            </div>
            <button
            onClick={() => {
              navigator.clipboard.writeText(password);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500); // clears the message after 1.5s
            }}            
            >
              Copy to Clipboard
            </button>
            {copied && (
  <span className="ml-2 text-green-400 text-sm animate-pulse">
    Copied!
  </span>
)}

          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;
