import { type FromLanguage, type Language } from '../types'

// NO PUBLICAR ESTO O SE COLARÁ LA API KEY PERSONAL EN EL CLIENTE
// ESTO LO HACEMOS PORQUE EL PROYECTO ESTÁ ENFOCADO EN REACT Y TYPESCRIPT
// SE DEBE CREAR UNA API PARA HACERLO CORRECTAMENTE

export async function translate ({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  if (fromLanguage === toLanguage) return text

  const fromCode = `${fromLanguage}` === 'auto' ? 'auto' : `${fromLanguage}`
  const toCode = `${toLanguage}`
  const textToTranslate = text

  const GET_URL = 'https://text-translator2.p.rapidapi.com/translate'

  const OPTIONS = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '131e6c522bmsh4a982d9696c1949p12e430jsn5db6ba6509b9',
      'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    },
    body: new URLSearchParams({
      source_language: fromCode,
      target_language: toCode,
      text: textToTranslate
    })
  }

  try {
    const response = await fetch(GET_URL, OPTIONS)
    const { data, status } = await response.json()
    const result = status === 'success'
      ? data.translatedText
      : `No text translated. Status: ${status}`
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
  }
}
