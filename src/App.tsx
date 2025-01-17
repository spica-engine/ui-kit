import React from 'react';
import logo from './logo.svg';
import './App.scss';
import StringMinimized from 'components/atoms/inputs/minimized/string/StringMinimized';

function App() {
  const [inputValue, setInputValue] = React.useState('');

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClear = () => {
    setInputValue('');
  };
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <StringMinimized
          value={inputValue} // Pass the value
          onChange={handleValueChange} // Pass the change handler
          onClear={handleClear} // Pass the clear handler
          placeholder="Enter text here..."
          type="text"
          
        />
      </header>
    </div>
  );
}

export default App;
