import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Question from '../custom_components/Question/Question';
import { useLocalStorage } from 'react-use';
import DropdownDescription from '../custom_components/Drop_down/DropDownForIndex';

const Test = () => {
    const [dataList] = useLocalStorage('myData', '');
    const testID = dataList ? dataList.dataList[0]: ''; 
    const answersList = dataList ? dataList.dataList[1]: ''; 
    const questionCount = dataList ? dataList.dataList[2]: ''; 

    return (
        <>
            <Question testID={testID} answersList={answersList} questionCount={questionCount}/>  
        </>
    );
};

export default Test;
