import { useCallback, useState, useEffect, useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")


  // useRef hook
  const passwordref = useRef(null)

  const copyPassword = useCallback(() => {
    // even if you don't use password ref the program will work, put it is good for UX and optimization
    passwordref.current?.select();
    // see difference by comment out below line
    // passwordref.current?.setSelectionRange(0, 3);

    window.navigator.clipboard.writeText(password)
  }, [password])


  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789";

    if(charAllowed) str += "!@#$%^&*()_-+=[]{}|<>/?";

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      
      pass += str.charAt(char);
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])



  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-300">
        <h5 className="text-2xl text-center text-purple-950 m-3">Password Generator</h5>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3 rounded-md'
          placeholder='Password'
          readOnly
          ref={passwordref}
          />

          <button 
          onClick={copyPassword}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-6'>
            <div className='flex items-center gap-x-1'>
              <input 
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
              />
              <label className='text-purple-950'>Length: {length}</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={()=>{
                setNumberAllowed((prev) => !prev)
              }}
              />
              <label htmlFor="numberInput" className='text-purple-950'>Numbers</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="CharacterInput"
              onChange={()=>{
                setCharAllowed((prev) => !prev)
              }}
              />
              <label htmlFor="CharacterInput" className='text-purple-950'>Characters</label>
            </div>

          </div>

      </div>
    </>
  )
}

export default App
