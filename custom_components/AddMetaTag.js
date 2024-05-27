import React, { useEffect } from 'react';

function AddMetaTag() {
  useEffect(() => {
    const metaTag = document.createElement('meta');
    metaTag.name = 'google';
    metaTag.content = 'notranslate';
    document.head.appendChild(metaTag);

    return () => {
      document.head.removeChild(metaTag);
    };
  }, []);

  return null;
}

export default AddMetaTag;
