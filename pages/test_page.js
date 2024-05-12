import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Question from '../custom_components/Question/Question';
import QuestionEx from '../custom_components/Question/QuestionEx';
import { useLocalStorage } from 'react-use';
import DropdownDescription from '../custom_components/Drop_down/DropDownForIndex';


const Test = () => {

const router = useRouter();  

const [dataList] = useLocalStorage('myData', '');
const testID = dataList ? dataList.dataList[0]: ''; 
const answersList = dataList ? dataList.dataList[1]: ''; 
const questionCount = dataList ? dataList.dataList[2]: ''; 

console.log(answersList);
console.log(testID);
console.log(questionCount);

  return (
    <>
    
    <Question testID = {testID} answersList = {answersList} questionCount={questionCount}/>  
   
    
    
    </>
  );
};

export default Test;
