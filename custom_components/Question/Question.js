import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import dynamic from "next/dynamic";
import questionStyle from './QuestionScreen.module.css';


const Question = ({ testID, answersList, questionCount }) => {
  const router = useRouter();
  const [slug, setSlug] = useState(1);
  const [pageData, setPageData] = useState(null);
  const [sendData, setSendData] = useLocalStorage('myArray', []);
  const [animationTrigger, setAnimationTrigger] = useState(null);
  const [mainAnimation, setMainAnimation] = useState(true);

  useEffect(() => {
    setAnimationTrigger(true);
    const fetchData = async () => {    
      console.log("True falselar ilk check" + animationTrigger + mainAnimation);
      console.log(sendData);
      console.log("Slug " + slug);
      try {
        const response = await fetch(`http://localhost:8000/quizzes/${testID}/questions/${slug}`);
        if (response.ok) {
          const jsonData = await response.json();
          setPageData(jsonData);
        }
      } catch (error) {
        console.error('Error fetching page data:', error);
      }
    };
  
  
    if (slug) {
      fetchData();
    }
  
    const timeout = setTimeout(() => {
      setAnimationTrigger(null);
    }, 860);

    localStorage.removeItem('myArray');  
    return () => {
      clearTimeout(timeout);
    };
  
  }, [slug]);

  const description = pageData ? pageData.description : '';
  const optionsslug = pageData ? pageData.options : [];


  const handleClick = (input) => {
    if (slug == 1){
      setSendData(prev => {prev.push(input + 1); return prev;});
    }else{
      setSendData(prev => {prev.push(input + 1); return prev;});
    }      

    if (questionCount === slug) {
      router.push({
        pathname: '/Result',
        query: { testID },
      });
    } else {
      setSlug(prevSlug => prevSlug + 1);
    }
  };
  

  const handlePrevious = () => {
    if (slug > 1) {
      setSendData(prev => { prev.pop(); return prev; });
      setSlug(prevSlug => prevSlug - 1);
    }

    if (slug === 1) {
      router.push({
        pathname: '/'
      });
    }
  };

  const optionArray = [];
  optionsslug.forEach((obj, index) => {
    const value = obj.description;
    optionArray.push(
      <div key={index} className={`${questionStyle.option} `} onClick={() => handleClick(index)}>{value}</div>
    );
  });

  return (
    <>
      <div className={`${questionStyle.background} ${mainAnimation ? questionStyle.enlarge : ''}`}>      
      </div>
      <div className={`${questionStyle.outerCard} ${mainAnimation ? questionStyle.enlargeX : ''}`} >
        <div className={questionStyle.card}>
          <div className={`${questionStyle.innerCard}`}> 
            <div className={`${questionStyle.button} `} onClick={() => handlePrevious()}>BACK</div> 
            <div className={`${questionStyle.title} ${animationTrigger ? questionStyle.enlargeX : ''}`}>{description}</div>
            <div className={`${questionStyle.index} `}>{slug}/{questionCount}</div>
          </div>
          <div className={`${questionStyle.optionBox} ${animationTrigger ? questionStyle.enlargeX : ''}  `}>
            {optionArray}
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Question), { ssr: false });