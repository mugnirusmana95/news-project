import Button from "components/button"
import Input, { dataInputType } from "components/input"
import { AiOutlineArrowLeft } from "@react-icons/all-files/ai/AiOutlineArrowLeft"
import { useState } from "react"
import { PageType } from "pages/PageType"

const Algorithm = ({ router }: PageType) => {
  const [firstQuestion, setFirstQuestion] = useState<dataInputType>({
    value: 'NEGIE1',
    isError: false,
    message: ''
  })
  const [resultFirstQuestion, setResultFirstQuestion] = useState<string>('')

  const [secondQuestion, setSecondQuestion] = useState<dataInputType>({
    value: 'Saya sangat senang mengerjakan soal algoritma',
    isError: false,
    message: ''
  })
  const [resultSecondQuestion, setResultSecondQuestion] = useState<string>('')

  const [input, setInput] = useState<dataInputType>({
    value: '["xc", "dz", "bbb", "dz"]',
    isError: false,
    message: ''
  })
  const [query, setQuery] = useState<dataInputType>({
    value: '["bbb", "ac", "dz"]',
    isError: false,
    message: ''
  })
  const [resultThirdQuestion, setResultThirdQuestion] = useState<string>('')

  const [inputMatrix, setInputMatrix] = useState<dataInputType>({
    value: '[[1, 2, 0], [4, 5, 6], [7, 8, 9]]',
    isError: false,
    message: ''
  })
  const [resultFourthQuestion, setResultFourthQuestion] = useState<string>('')

  const handleFirstQuestion = () => {
    const result = firstQuestion?.value?.split('')
    let numberOnly = ''
    const stringOnly = result?.filter((item: string) => {
      const regexAlphabet = /^[a-zA-Z]*$/
      if (regexAlphabet.test(item)) {
        return true
      } else {
        numberOnly += item
        return false
      }
    })
    const stringReverse = stringOnly?.reverse()?.join('')
    const resultFirstQuestion = stringReverse + numberOnly
    setResultFirstQuestion(resultFirstQuestion)
  }

  const longest = () => {
    const result = secondQuestion?.value?.split(' ')
    let longestWord = ''
    result?.forEach((word: string) => {
      if(word?.length > longestWord?.length) longestWord = word
    })
    setResultSecondQuestion(longestWord)
  }

  const handleThirdQuestion = () => {
    const dataInput = JSON.parse(input?.value??'[]')
    const dataQuery = JSON.parse(query?.value??'[]')
    let result: number[] = []
    for (const dq of dataQuery) {
      let count = 0
      for (const di of dataInput) {
        if (dq === di) count++
      }
      result.push(count)
    }
    setResultThirdQuestion(`[${result.toString()}]`)
  }

  const handleFourthQuestion = () => {
    const matrix = JSON.parse(inputMatrix?.value??'[]')
    let firstDiagonal = 0
    for (let i = 0; i < matrix?.length; i++) {
      firstDiagonal += matrix[i][i]
    }
    let secondDiagonal = 0
    for (let i = 0; i < matrix?.length; i++) {
      secondDiagonal -= matrix[i][matrix?.length - 1 - i]
    }
    const result = firstDiagonal + secondDiagonal
    setResultFourthQuestion(result.toString())
  }

  return (
    <div className="w-full h-full flex flex-col px-20 pt-10 pb-20 gap-14 text-gray-600 overflow-y-auto">
      <div className="w-full flex flex-row border-gray-600 items-center">
        <AiOutlineArrowLeft className="font-bold text-4xl cursor-pointer" onClick={() => router('/')} />
        <span className="font-bold text-4xl text-cyan-500">Algorithm Section</span>
      </div>

      <div className="w-full flex flex-col gap-5 border-[0.5px] border-gray-200 p-5 rounded hover:shadow-sm-cst duration-300">
        <span>1. Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"</span>
        <Input
          placeholder="First Question"
          type="text"
          name="firstQuestion"
          label="First Question"
          value={firstQuestion?.value}
          isError={firstQuestion?.isError}
          message={firstQuestion?.message}
          validate={
            {
              rules: {
                required: true,
                regex: /^[a-zA-Z0-9]*$/
              },
              customMessage: {
                required: "First Question is required",
                regex: "First Question must be alphabet and number"
              }
            }
          }
          onChange={(data: dataInputType) => setFirstQuestion(data)}
          onClear={(data: dataInputType) => setFirstQuestion(data)}
        />
        
        <Button
          disabled={!firstQuestion?.value || firstQuestion?.isError}
          label="Check Result"
          type="submit"
          onClick={handleFirstQuestion}
        />

        <div className="w-full flex flex-row pl-2 border-l-4 border-cyan-500">
          {resultFirstQuestion ? resultFirstQuestion : '-' }
        </div>
      </div>

      <div className="w-full flex flex-col gap-5 border-[0.5px] border-gray-200 p-5 rounded hover:shadow-sm-cst duration-300">
        <span>2. Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu</span>
        <div className="w-full flex flex-col pl-2 border-l-4 border-cyan-500">
          <span>Contoh:</span>
          <span>const sentence = "Saya sangat senang mengerjakan soal algoritma"</span>
          <span>longest(sentence)</span>
          <span>mengerjakan: 11 character</span>
        </div>
        <Input
          placeholder="Second Question"
          type="text"
          name="secondQuestion"
          label="Second Question"
          value={secondQuestion?.value}
          isError={secondQuestion?.isError}
          message={secondQuestion?.message}
          validate={
            {
              rules: {
                required: true,
                regex: /^[a-zA-Z0-9 ]*$/
              },
              customMessage: {
                required: "Second Question is required",
                regex: "Second Question must be alphabet, number and spaces"
              }
            }
          }
          onChange={(data: dataInputType) => setSecondQuestion(data)}
          onClear={(data: dataInputType) => setSecondQuestion(data)}
        />

        <Button
          disabled={!secondQuestion?.value || secondQuestion?.isError}
          label="Check Result"
          type="submit"
          onClick={longest}
        />

        <div className="w-full flex flex-row pl-2 border-l-4 border-cyan-500">
          {resultSecondQuestion ? `${resultSecondQuestion}: ${resultSecondQuestion?.length} character` : '-'}
        </div>
      </div>

      <div className="w-full flex flex-col gap-5 border-[0.5px] border-gray-200 p-5 rounded hover:shadow-sm-cst duration-300">
        <span>3. Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT</span>
        <div className="w-full flex flex-col pl-2 border-l-4 border-cyan-500">
          <span>Contoh:</span>
          <span>INPUT = ['xc', 'dz', 'bbb', 'dz']</span>
          <span>QUERY = ['bbb', 'ac', 'dz']</span>
          <span>OUTPUT = [1, 0, 2] karena kata 'bbb' terdapat 1 pada INPUT, kata 'ac' tidak ada pada INPUT, dan kata 'dz' terdapat 2 pada INPUT</span>
        </div>
        <Input
          placeholder="Third Question (INPUT)"
          type="text"
          name="thirdQuestionInput"
          label="Third Question (INPUT)"
          value={input?.value}
          isError={input?.isError}
          message={input?.message}
          validate={
            {
              rules: {
                required: true,
                regex: /^\[\s*(?:"[^"]*"\s*,\s*)*"[^"]*"\s*\]$/
              },
              customMessage: {
                required: "Third Question (INPUT) is required",
                regex: `Third Question (INPUT) must following format ["alphanumber", "alphanumber", ...]`
              }
            }
          }
          onChange={(data: dataInputType) => setInput(data)}
          onClear={(data: dataInputType) => setInput(data)}
        />

        <Input
          placeholder="Third Question (QUERY)"
          type="text"
          name="thirdQuestionQuery"
          label="Third Question (QUERY)"
          value={query?.value}
          isError={query?.isError}
          message={query?.message}
          validate={
            {
              rules: {
                required: true,
                regex: /^\[\s*(?:"[^"]*"\s*,\s*)*"[^"]*"\s*\]$/
              },
              customMessage: {
                required: "Third Question (QUERY) is required",
                regex: `Third Question (QUERY) must following format ["alphanumber", "alphanumber", ...]`
              }
            }
          }
          onChange={(data: dataInputType) => setQuery(data)}
          onClear={(data: dataInputType) => setQuery(data)}
        />

        <Button
          disabled={!input?.value || input?.isError || !query?.value || query?.isError}
          label="Check Result"
          type="submit"
          onClick={handleThirdQuestion}
        />

        <div className="w-full flex flex-row pl-2 border-l-4 border-cyan-500">
          {resultThirdQuestion ? resultThirdQuestion : '-'}
        </div>
      </div>

      <div className="w-full flex flex-col gap-5 border-[0.5px] border-gray-200 p-5 rounded hover:shadow-sm-cst duration-300">
        <span>4. Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN Contoh:</span>
        <div className="w-full flex flex-col pl-2 border-l-4 border-cyan-500">
          <span>Contoh:</span>
          <span>Matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]</span>
          <span>diagonal pertama = 1 + 5 + 9 = 15</span>
          <span>diagonal kedua = 0 + 5 + 7 = 12</span>
          <span>maka hasilnya adalah 15 - 12 = 3</span>
        </div>

        <Input
          placeholder="Input Matrix"
          type="text"
          name="inputMatrix"
          label="Input Matrix"
          value={inputMatrix?.value}
          isError={inputMatrix?.isError}
          message={inputMatrix?.message}
          validate={
            {
              rules: {
                required: true,
                regex: /^\[\s*\[\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\]\s*,\s*\[\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\]\s*,\s*\[\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\]\s*\]$/
              },
              customMessage: {
                required: "Input Matrix is required",
                regex: "Input Matrix must be number and following format [[number, number, number], [number, number, number], [number, number, number]]"
              }
            }
          }
          onChange={(data: dataInputType) => setInputMatrix(data)}
          onClear={(data: dataInputType) => setInputMatrix(data)}
        />

        <Button
          disabled={!inputMatrix?.value || inputMatrix?.isError}
          label="Check Result"
          type="submit"
          onClick={handleFourthQuestion}
        />

        <div className="w-full flex flex-row pl-2 border-l-4 border-cyan-500">
          {resultFourthQuestion ? resultFourthQuestion : '-'}
        </div>
      </div>
    </div>
  )
}

export default Algorithm