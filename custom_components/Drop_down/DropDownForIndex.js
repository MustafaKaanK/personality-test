import React, { useState } from 'react';
import style from './DropDownForIndex.module.css';

const DropdownParagraph = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={style.container}>
      <div className={style.position} onClick={toggleDropdown}></div>
      <p 
        className={`${isOpen ? style.dropdownparagraphopen : style.dropdownparagraph} ${isOpen ? style.fadeInEx : ''}`}
      >
        Köpek Olsaydın Hangi Cins Köpek Olurdun? <br /><br />
        Mustafa Kaan Korkut tarafından oluşturulmuş, açık kaynak kodlu bir web uygulamasıdır.
        <br /><br />
        <a style={{ fontSize: '15px' }} href="https://www.linkedin.com/in/mustafakaankorkut/">
          Linkedin Adresi İçin
        </a>
      </p>
    </div>
  );
};

export default DropdownParagraph;