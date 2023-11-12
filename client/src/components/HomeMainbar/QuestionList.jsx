import React from 'react'
import Questions from './Questions'

const QuestionList = ({questionsList}) => {
  return (
    <div>
      {
        questionsList?.map((question)=>(
           <Questions question={question} key={question}/> //here we are not using return because instead of {} we are using () therefore no need to use return.
        ))
      }
    </div>
  )
}

export default QuestionList
