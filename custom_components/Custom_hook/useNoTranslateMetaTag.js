import { useEffect } from 'react';

function useNoTranslateMetaTag() {
  useEffect(() => {
    const metaTag = document.createElement('meta');
    metaTag.name = 'google';
    metaTag.content = 'notranslate';
    document.head.appendChild(metaTag);

    return () => {
      document.head.removeChild(metaTag);
    };
  }, []);
}

export default useNoTranslateMetaTag;
