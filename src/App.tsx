import { FC, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { combineWords, getRandomAdjective } from "./service/service";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


interface AppProps { }


const App: FC<AppProps> = ({ }) => {

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

  return (
    <div className='max-w-6xl mx-auto min-h-screen flex flex-col items-center mt-32 mb-16 sm:text-center sm:mb-0'>
      <div className='text-gray-400 text-center'>
        Combine "very" with a simple adjective and get a more concise adjective
      </div>
      <div className='grid grid-cols-12 justify-center items-center w-full mb-4 py-16'>
        <p className='text-center col-span-2 text-xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold'>very</p>
        <p className='text-center col-span-1 text-xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold'>+</p>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='cool'
          type='text'
          className='col-span-4 text-center border-b-2 font-sans text-xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold h-24 transition duration-200 bg-white  border-gray-300 appearance-none focus:outline-none'
        />
        <p className='text-center col-span-1 text-xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold'>=</p>
        <div className='text-center  w-96 col-span-4'>
          <p
            className={`cursor-pointer text-center text-xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold 
            ${suggestion ? 'text-green-700' : 'text-gray-500'
              } font-serif`}>
            {suggestion || 'refreshing'}
          </p>
        </div>
      </div>
      <div className='mb-4 flex flex-row'>
        <div className='pr-6 cursor-pointer'>
          <button
            type='button'
            onClick={() => handleGetResult(input)}
            className='border-solid bg-black inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none'>
            Get/Refresh Result
          </button>
        </div>
        <div className='pl-6 cursor-pointer'>
          <button
            type='button'
            onClick={handleRandomResult}
            className='border-solid bg-black inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none'>
            Random
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
