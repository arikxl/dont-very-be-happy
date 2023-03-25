import { FC, useState } from "react";

import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import { combineWords, getRandomAdjective } from "./service/service";

interface AppProps { }

const App: FC<AppProps> = () => {

  const [input, setInput] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string>('');
  const btnClass = 'lg:flex-1 lg:mx-2 border-solid bg-green-900 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none';

  const handleGetResult = (input: string, e: any) => {
    e.preventDefault();
    combineWords(input, setSuggestion)
  }

  const handleRandomResult = async (e: any) => {
    e.preventDefault();
    const adjective = await getRandomAdjective()
    setInput(adjective)
    handleGetResult(adjective, e)
  }

  const P = ({ children }: any) => {
    return (
      <p className="text-5xl">{children}</p>
    )
  }

  return (
    <>
      <AppHeader />
      <div className='max-w-[95%] lg:max-w-[80%] mx-auto h-[70vh]
       flex flex-col items-center sm:text-center justify-around'>
        <div className='text-gray-00 text-center text-lg md:text-4xl'>
          Combine "very" with a simple adjective
          <br className='2xl:hidden' />
          and get a more concise word
        </div>

        <div className='flex flex-col items-center w-full 
        md:flex-row  md:justify-around' >
          <P >very </P>
          <P >+ </P>

          <form onSubmit={(e) => handleGetResult(input, e)}
            className=' bg-red-400 w-[80%] md:w-[35%] '>
            <input
              value={input}
              onSubmit={(e) => handleGetResult(input, e)}
              onChange={(e) => setInput(e.target.value)}
              placeholder='cool'
              type='text'
              className=' text-center border-b-2 font-sans text-5xl  w-full
            sm:text-4xl lg:text-5xl xl:text-6xl font-bold transition duration-200
            bg-white  border-gray-300 appearance-none focus:outline-none'
            />
          </form>

          <P >=</P>

          <p
            className={`cursor-pointer text-center text-5xl sm:text-4xl 
              lg:text-5xl xl:text-6xl font-bold 
            ${suggestion ? 'text-green-700' : 'text-gray-500'} font-sans`}>
            {suggestion || 'refreshing'}
          </p>
        </div>

        <div className='mb-4 flex w-full justify-between lg:w-[60%] '>
          <button
            type='submit'
            onClick={(e) => handleGetResult(input, e)}
            className={btnClass}>
            Get/Refresh Result
          </button>
          <button
            type='button'
            onClick={(e) => handleRandomResult(e)}
            className={btnClass}>
            Random
          </button>
        </div>
      </div>
      <AppFooter />
    </>
  );
}

export default App;
