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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setAnimationTrigger(true);
        const fetchData = async () => {
            try {
                const response = await fetch(`https://quiz-backend-sk11.onrender.com/quizzes/`);
                if (response.ok) {
                    const data = await response.json();
                    setPageData(data);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
            return new Promise((resolve) => setTimeout(resolve, 4000));
        };


    
      fetchData().then(() => {
        setLoading(false);
      });
    



        const timeout = setTimeout(() => {
            setAnimationTrigger(false);
          }, 1300);

          return () => {
            clearTimeout(timeout);
          };

    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Your repeated action here
            const response = fetch(`https://quiz-backend-sk11.onrender.com/quizzes/`);
        }, 9 * 60 * 1000); // 9 minutes in milliseconds

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
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
         <div className={styles.fadeIn}>   
         <div className={`${questionStyle.spinner} ${animationTrigger ? questionStyle.spinneractive : ''}`}>Loading...</div>Loading has completed     
              <div className={`${styles.background} ${styles.fadeIn}`}>
            
                {buttons}
                <DropDownsDescriptionIndex />
            
                
               </div>
           </div>       
        </>
    );
};

export default Index;
