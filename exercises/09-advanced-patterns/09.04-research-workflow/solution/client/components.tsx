import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { MyMessage } from '../api/chat.ts';

export const Wrapper = (props: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {props.children}
    </div>
  );
};

export const Message = ({
  role,
  parts,
}: {
  role: string;
  parts: MyMessage['parts'];
}) => (
  <div className="my-4">
    {parts.map((part) => {
      if (part.type === 'data-queries') {
        return (
          <div key={part.id} className="mb-4">
            <h2 className="text-gray-300 text-sm mb-1">
              Queries
            </h2>
            <ul className="text-gray-400 text-xs monospace">
              {Object.values(part.data).map((query) => (
                <li key={query}>{query}</li>
              ))}
            </ul>
          </div>
        );
      }

      if (part.type === 'data-plan') {
        return (
          <div key={part.id} className="mb-4">
            <h2 className="text-gray-300 text-sm mb-1">Plan</h2>
            <div className="prose prose-invert text-gray-400 text-xs">
              <ReactMarkdown>{part.data}</ReactMarkdown>
            </div>
          </div>
        );
      }

      if (part.type === 'text') {
        return (
          <div className="prose prose-invert">
            <ReactMarkdown>
              {(role === 'user' ? 'User: ' : 'AI: ') + part.text}
            </ReactMarkdown>
          </div>
        );
      }
      return null;
    })}
  </div>
);

export const ChatInput = ({
  input,
  onChange,
  onSubmit,
  disabled,
}: {
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled?: boolean;
}) => (
  <form onSubmit={onSubmit}>
    <input
      className={`fixed bottom-0 w-full max-w-md p-2 mb-8 border-2 border-zinc-700 rounded shadow-xl bg-gray-800 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      value={input}
      placeholder={
        disabled
          ? 'Please handle tool calls first...'
          : 'Say something...'
      }
      onChange={onChange}
      disabled={disabled}
      autoFocus
    />
  </form>
);
