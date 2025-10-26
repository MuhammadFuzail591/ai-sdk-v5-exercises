import { useChat } from '@ai-sdk/react';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ChatInput, Message, Wrapper } from './components.tsx';
import './tailwind.css';

const App = () => {
  const { messages, sendMessage } = useChat({});
  const inputRef = React.useRef<HTMLInputElement>(null)
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [input, setInput] = useState(
    'Could you give me some financial advice?',
  );


  React.useEffect(() => {
    const handleKeyDown = (e:KeyboardEvent) => {
      if (e.key === "/"){
        inputRef?.current?.focus();
      }
    }
    
    
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  })

  React.useEffect(() => {
    
    scrollRef?.current?.scrollIntoView({behavior:"smooth"})

  }, [messages])


  return (
    <Wrapper>
      <div tabIndex={0} className='focus:outline-none'>
        {messages.map((message) => (
        <Message
          key={message.id}
          role={message.role}
          parts={message.parts}
        />
      ))}
      </div>
      <div ref={scrollRef} />
      <ChatInput
        input={input}
        ref = {inputRef}
        onChange={(e) => setInput(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({
            text: input,
          });
          setInput('');
        }}
      />
    </Wrapper>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
