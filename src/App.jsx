import { useEffect, useState, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("hygg");
  const passwordRef = useRef(null);

  const passwordGen = () => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str = str + "0123456789";
    if (charAllowed) str = str + "!@#$%^&*()_+=-~`";
    console.log(numAllowed);
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str[char];
    }
    setPassword(pass);
  };

  const copyPasswordtoClipboard = () => {
    window.navigator.clipboard.writeText(password)
      .then(() => {
        passwordRef.current.select();
      })
      .catch(error => {
        console.error('Failed to copy password: ', error);
      });
  };

  useEffect(() => {
    passwordGen();
  }, [length, charAllowed, numAllowed]);

  return (
    <>
      <div className='w-full max-w-md rounded-lg shadow-lg mx-auto px-5 pb-3 bg-orange-400 overflow-hidden mt-5'>
        <div>
          <h1 className='text-center uppercase font-bold text-gray-700 text-2xl pt-5 pb-3'>Password Generator</h1>
        </div>
        <div className='flex shadow-md rounded-lg bg-slate-500 overflow-hidden'>
          <input
            ref={passwordRef}
            type="text"
            value={password}
            placeholder='Password'
            className='w-full bg-gray-700 text-white p-2'
            readOnly />
          <button onClick={copyPasswordtoClipboard} className='text-white p-1 bg-gray-800 outline-none px-3 hover:bg-gray-900'>Copy</button>
        </div>
        <div className='flex mt-2 justify-between'>
          <div className='flex mr-2 gap-x-1'>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            Length:{length}
          </div>
          <div className='flex gap-x-1 mr-3'>
            <input type="checkbox" onChange={() => { setNumAllowed((prev) => !prev) }} /> Numbers
          </div>
          <div className='flex gap-x-1 mr-3'>
            <input type="checkbox" onChange={() => { setCharAllowed((prev) => !prev) }} /> Characters
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
