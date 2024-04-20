// App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [value, setValue] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/save', { value });
      setResponse(res.data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <p>{response}</p>
    </div>
  );
}

export default App;
