import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
  }
);


export const combineWords = async (secondWord: string, setSuggestion: Function) => {

  try {
    const result = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: `Combine the word "very" with another adjective to find a more suitable adjective.\n\nvery + cold = freezing\nvery + nice = charming\nvery + high = steep\nvery + shining = gleaming\nvery + ${secondWord} =`
    });

    if (!result.choices?.[0]?.text) throw new Error('Invalid response');
    const suggestion = result.choices[0].text;


    setSuggestion(suggestion);
  } catch (error) {
    console.error(error)
  }
}



export const getRandomAdjective = async () => {

  try {


    const result = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: 'Come up with one random adjective that goes well with the word "very" in front of it:\nAdjective: very',

    });

    if (!result.choices?.[0].text) throw new Error('Invalid response')
    const adjective = result.choices[0].text.trim()
    
    if (!result.choices?.[0]?.text) throw new Error('Invalid response');

    return adjective
  } catch (error) {
    throw new Error('Invalid action')
  }
}


