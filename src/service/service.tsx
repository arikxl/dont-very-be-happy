import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



export const combineWords = async (secondWord: string, setSuggestion: Function) => {
    try {
      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Combine the word "very" with another adjective to find a more suitable adjective.\n\nvery + cold = freezing\nvery + nice = charming\nvery + high = steep\nvery + shining = gleaming\nvery + ${secondWord} =`,
        temperature: 0.7,
        max_tokens: 25,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })

      if (!result.data.choices?.[0].text) throw new Error('Invalid response')
      const suggestion = result.data.choices[0].text

      setSuggestion(suggestion)
    } catch (error) {
      console.error(error)
    }
}

// export const handleGetResult = (input: string) => {
//   combineWords(input)
// }


export const getRandomAdjective = async () => {
  // Generate random adjective
  try {
    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        'Come up with one random adjective that goes well with the word "very" in front of it:\nAdjective: very',
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    if (!result.data.choices?.[0].text) throw new Error('Invalid response')
    const adjective = result.data.choices[0].text.trim()

    return adjective
  } catch (error) {
    throw new Error('Invalid action')
  }
}

// export const handleRandomResult = async () => {
//   const adjective = await getRandomAdjective()
//   setInput(adjective)
//   handleGetResult(adjective)
// }
