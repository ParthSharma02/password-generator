import { useState, useCallback, useEffect , useRef} from 'react'

import Input from 'postcss/lib/input'

function App() {
  
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed]= useState(false)
  const [charAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback( () => {
     let pass=" "
     let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnobqrstuvwxyz"
     if (numberAllowed) str += "0123456789"
     if (charAllowed) str+= "!@#$%^&*_+-="
     
     for(let i=0; i<length; i++){
      let char= Math.floor(Math.random() * str.length +1);
      pass += str.charAt(char);     
     }

     setPassword(pass);
     

  } ,[length, numberAllowed, charAllowed, setPassword]  )

  const passwordRef = useRef(null)
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  
  useEffect( ()=> {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator]

  )

  return (
    <div className=' flex justify-content my-auto background-image'>
      <div className=' flex flex-wrap justify-center items-center bg-cover bg-no-repeat w-full max-w-md mx-auto my-20  shadow-md rounded-3xl px-4 py-10 mt-30 bg-gray-800 text-orange-500 '>
        <h1 className='text-white text-xl text-center   my-3'>Password generator </h1>
        <div className='flex  shadow rounded overflow-hidden mb-2 px-2'>
          
              
        <input 
           type="text"
           placeholder='Password'
           className='outline-none w-full py-1 px-3 rounded'  
           value={password}
           readOnly
           ref={passwordRef}
         />
         <button
              onClick={copyPasswordToClipboard}
              className='outline-none bg-orange-700 text-white px-3 py- shrink-0 rounded'>
              copy
        </button>
     </div>


     <div className='flex text-sm gap-x-2'>   
       <div className='flex items-center gap-x-1'>
         <input
          type='range'
          value={length}
          min={8}
          max={16}
          onChange={(e)=> {setLength(e.target.value)}}
          className='cursor-pointer'
         />
         <label> Length : {length}</label>
       </div>
       
      <div className='flex items-center gap-x-1'>
        <input 
          type="checkbox"
          defaultChecked={ numberAllowed}
          onChange={()=> {setNumberAllowed( (prev) => !(prev) )}} 
        />
        <label > Numbers</label>  
        
      </div> 

      <div className='flex items-center gap-x-1'>
        <input 
          type="checkbox"
          defaultChecked={ numberAllowed}
          onChange={()=> {setCharacterAllowed( (prev) => !(prev) )}} 
        />
        <label > Characters</label>  
        
      </div> 

     </div>
    </div>
    </div>
  );
  }

export default App
