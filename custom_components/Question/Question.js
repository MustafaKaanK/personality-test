import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import dynamic from 'next/dynamic';
import questionStyle from './QuestionScreen.module.css';

const Question = ({ testID, answersList, questionCount }) => {
  const router = useRouter();
  const [slug, setSlug] = useState(1);
  const [pageData, setPageData] = useState(null);
  const [sendData, setSendData] = useLocalStorage('myArray', []);
  const [animationTrigger, setAnimationTrigger] = useState(null);
  const [mainAnimation, setMainAnimation] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAnimationTrigger(true);

    const fetchData = async () => {
      try {
        const response = await fetch(`https://quiz-backend-sk11.onrender.com/quizzes/${testID}/questions/${slug}`);
        if (response.ok) {
          const jsonData = await response.json();
          setPageData(jsonData);
        }
      } catch (error) {
        console.error('Error fetching page data:', error);
      }
      return new Promise((resolve) => setTimeout(resolve, 2500));
    };

    if (slug) {
      fetchData().then(() => {
        setLoading(false);
      });
    }

    const timeout = setTimeout(() => {
      setAnimationTrigger(null);
    }, 1160);

    localStorage.removeItem('myArray');

    return () => {
      clearTimeout(timeout);
    };
  }, [slug]);

  const description = pageData ? pageData.description : '';
  const optionsslug = pageData ? pageData.options : [];

  const handleClick = (input) => {
    setSendData((prev) => {
      prev.push(input + 1);
      return prev;
    });

    if (questionCount === slug) {
      router.push({
        pathname: '/Result',
        query: { testID },
      });
    } else {
      setSlug((prevSlug) => prevSlug + 1);
    }
  };

  const handlePrevious = () => {
    if (slug > 1) {
      setSendData((prev) => {
        prev.pop();
        return prev;
      });
      setSlug((prevSlug) => prevSlug - 1);
    }

    if (slug === 1) {
      router.push({
        pathname: '/',
      });
    }
  };

  const optionArray = [];
  optionsslug.forEach((obj, index) => {
    const value = obj.description;
    optionArray.push(
      <div key={index} className={`${questionStyle.option}`} onClick={() => handleClick(index)}>
        {value}
      </div>
    );
  });

  if (loading) {
    return <div className="spinner">Loading...</div>; // Your loading spinner or skeleton screen
  }

  return (
    <>
      <div className={`${questionStyle.background} ${mainAnimation ? questionStyle.enlargeY : ''}`}></div>
      <div className={`${questionStyle.outerCard} ${mainAnimation ? questionStyle.enlarge : ''}`}>
        <div className={questionStyle.card}>
          <div className={`${questionStyle.innerCard}`}>
            <div className={`${questionStyle.button}`} onClick={handlePrevious}>BACK</div>
            <div className={`${questionStyle.title} ${animationTrigger ? questionStyle.enlargeX : ''}`}>{description}</div>
            <div className={`${questionStyle.index}`}>{slug}/{questionCount}</div>
          </div>
          <div className={`${questionStyle.optionBox} ${animationTrigger ? questionStyle.enlargeX : ''}`}>
            {optionArray}
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Question), { ssr: false });
