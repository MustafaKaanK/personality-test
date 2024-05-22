import questionStyle from '../styles/result.module.css'
import { useRouter } from 'next/router';
import React, { useEffect, useState} from 'react';
import { useLocalStorage } from 'react-use';
import { FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon, TwitterShareButton,TwitterIcon, WhatsappShareButton,WhatsappIcon} from 'react-share';
import DropdownDescription from '../custom_components/Drop_down/DropDownForResult';

const Result = () =>{
  const router = useRouter();
  const {testID} = router.query;
  const [responseData, setResponseData] = useState(`null`);
  const [animationTrigger, setAnimationTrigger] = useState(true);
 
  const [dataList] = useLocalStorage('myArray', '');
  const [newID, setnewID] = useLocalStorage('newID', '');

  
  const result = dataList ? dataList : '';

  
  useEffect(() => {
    if (testID) {
      setnewID(testID); 
    } 
      const timeout = setTimeout(() => {
        setAnimationTrigger(false);
      }, 1301);
    
      return () => clearTimeout(timeout);
    
  }, [newID]);
  

  useEffect(() => {
    
    
    const fetchData = async () => {
      try {
        const payload = {
          selected_options: result
        };
        const response = await fetch(`https://quiz-backend-sk11.onrender.com/quizzes/${newID}/submission/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        if (response.ok){
        const data = await response.json();
        setResponseData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    if(newID){
      fetchData();
      
    }
    
  }, [newID]);
  const description = responseData ? responseData.description : '';
  const index = description ? description.indexOf('/'): '';
  const descriptionTitle = description && index ? description.slice(0, index): '';
  const descriptionText = description && index ? description.slice(index + 1): '';
  console.log(description == undefined);
  console.log(descriptionText);

  const handleclick = () => {
    router.push({
      pathname:'/'
  })}
  

  return (
    <>
      <div className={`${questionStyle.background}`}>
        <div className={`${questionStyle.Resultcard} ${animationTrigger ? questionStyle.cardResult : ''}`}>
          <div className={`${questionStyle.innerCard} ${animationTrigger ? questionStyle.fadeInEx : ''}`}>
            <img src={`${descriptionTitle}.jpg`} className={`${questionStyle.img} ${animationTrigger ? questionStyle.fadeInEx : ''}`} alt="Image" />
            <div>
              {descriptionTitle}
            </div>
            <div className={questionStyle.description}> 
              {descriptionText} 
            </div>
          </div>  
          <div className={questionStyle.socialbox}>
            <FacebookShareButton className={questionStyle.share}  url='https://dog-personality-test.vercel.app/'><FacebookIcon  borderRadius={40}></FacebookIcon></FacebookShareButton>
            <LinkedinShareButton className={questionStyle.share} url='https://dog-personality-test.vercel.app/'><LinkedinIcon  borderRadius={40}></LinkedinIcon></LinkedinShareButton>
            <TwitterShareButton className={questionStyle.share}  url='https://dog-personality-test.vercel.app/'><TwitterIcon  borderRadius={40}></TwitterIcon></TwitterShareButton>
            <WhatsappShareButton className={questionStyle.share}  url='https://dog-personality-test.vercel.app/'><WhatsappIcon  borderRadius={40}></WhatsappIcon></WhatsappShareButton> 
            <div className={questionStyle.button} onClick={() => handleclick()}></div> 
          </div>
        </div>
        <DropdownDescription></DropdownDescription>
      </div>
    </>
  );
};
export default Result
