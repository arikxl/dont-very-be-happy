import { FC, useState } from "react";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";

import { combineWords, getRandomAdjective } from "./service/service";

interface AppProps { }

const App: FC<AppProps> = () => {

  const [input, setInput] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string>('');

  const handleGetResult = (input: string) => {
    combineWords(input, setSuggestion)
  }

  const handleRandomResult = async () => {
    const adjective = await getRandomAdjective()
    setInput(adjective)
    handleGetResult(adjective)
  }

  const P = ({ children }: any, span: any) => {
    return (
      <p className={`text-center col-span-${span} text-xl sm:text-4xl 
        lg:text-5xl xl:text-6xl font-bold`}>{children}</p>
      // <p className={`text-center flex text-xl sm:text-4xl 
      //   lg:text-5xl xl:text-6xl font-bold`}>{children}</p>
    )
  }

  return (
    <>
      <AppHeader />
      <div className='max-w-[95%] lg:max-w-[80%] mx-auto h-[70vh] bg-gray-200
       flex flex-col items-center sm:text-center justify-between'>
        <div className='text-gray-00 text-center'>
          Combine "very" with a simple adjective and get a more concise word
        </div>
        {/* <div className='flex justify-center items-center w-full mb-4 py-16'> */}
        <div className='flex flex-col justify-around items-center
         w-full   lg:flex-row
         bg-red-200'>
          <P span={2}>very</P>
          &nbsp;
          <P span={1}>+</P>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='cool'
            type='text'
            className='col-span-4 text-center border-b-2 font-sans text-xl
           sm:text-4xl lg:text-5xl xl:text-6xl font-bold h-24 transition duration-200
            bg-white  border-gray-300 appearance-none focus:outline-none'
          />
          <P span={1}>=</P>

          <div className='text-center  w-96 col-span-4'>
            <p
              className={`cursor-pointer text-center text-xl sm:text-4xl 
            lg:text-5xl xl:text-6xl font-bold 
            ${suggestion ? 'text-green-700' : 'text-gray-500'} font-serif`}>
              {suggestion || 'refreshing'}
            </p>
          </div>
        </div>
        <div className='mb-4 flex flex-row'>
          <div className='pr-6 cursor-pointer'>
            <button
              type='button'
              onClick={() => handleGetResult(input)}
              className='border-solid bg-black inline-flex items-center 
            justify-center h-12 px-6 font-medium tracking-wide text-white
            transition duration-200 rounded shadow-md bg-deep-purple-accent-400
            hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none'>
              Get/Refresh Result
            </button>
          </div>
          <div className='pl-6 cursor-pointer'>
            <button
              type='button'
              onClick={handleRandomResult}
              className='border-solid bg-black inline-flex items-center
            justify-center h-12 px-6 font-medium tracking-wide text-white
            transition duration-200 rounded shadow-md bg-deep-purple-accent-400
            hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none'>
              Random
            </button>
          </div>
        </div>
      </div>
      <AppFooter />
    </>
  );
}

export default App;
