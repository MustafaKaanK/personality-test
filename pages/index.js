import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '../styles/index.module.css';
import { useLocalStorage } from 'react-use';
import DropDownsDescriptionIndex from '../custom_components/Drop_down/DropDownForIndex';

const Index = () => {
    const router = useRouter();
    const [pageData, setPageData] = useState(null);
    const [sendData, setSendData] = useLocalStorage('myData', '');
    const [animationTrigger, setAnimationTrigger] = useState(true);

    useEffect(() => {
        setAnimationTrigger(true);
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/quizzes/`);
                if (response.ok) {
                    const data = await response.json();
                    setPageData(data);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        };

        fetchData();

        const timeout = setTimeout(() => {
            setAnimationTrigger(null);
          }, 3860);

          return () => {
            clearTimeout(timeout);
          };

    }, []);

    const answersList = [];

    const testCount = pageData ? pageData.length : '';

    const handleClick = (input) => {
        localStorage.clear();
        const testID = input + 4;
        const testData = pageData.find(item => item.id == testID);
        const questionCount = testData.questions.length;
        const test = testData.description;
        setSendData({ dataList: [testID, answersList, questionCount] });
        router.push({
            pathname: '/test_page',
            query: {
                test
            },
        });

    };

    const buttons = [];
    for (let i = 0; i < testCount; i++) {
        buttons.push(
            <button key={i} className={styles.customButton} onClick={() => handleClick(i)} ><div></div></button>
        );
    }
    return (
        <>
        
            <div className={`${styles.background} ${styles.fadeIn}`}>
                {buttons}
                <DropDownsDescriptionIndex />
            <div className={` ${ animationTrigger ? styles.blankpage : ''}`}>
                
            </div>
        </div>
        </>
    );
};

export default Index;
