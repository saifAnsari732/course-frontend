import  { useState, useEffect } from 'react';

const TypewriterHello = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const fullText = "Morden Website to learn Anything..!";

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText.charAt(index));
        setIndex(prev => prev + 1);
      }, 150);
      
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
      {text}
      <span className="ml-1 inline-block w-2 h-10 bg-cyan-400 animate-pulse align-middle"></span>
    </div>
  );
};

export default TypewriterHello;