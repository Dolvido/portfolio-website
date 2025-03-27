import React from 'react';

interface Citation {
  text: string;
  similarity: number;
}

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  citations?: Citation[];
  confidence?: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, citations, confidence }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-grow space-y-2">
            <p className="text-sm md:text-base whitespace-pre-wrap">{message}</p>
            {!isUser && confidence !== undefined && confidence > 0 && (
              <div className="flex items-center gap-2">
                <div className={`text-xs px-2 py-1 rounded-full ${
                  confidence > 0.8 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                  confidence > 0.5 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  confidence > 0.01 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                  'hidden'
                }`}>
                  {confidence > 0.01 ? `${Math.round(confidence * 100)}% confident` : ''}
                </div>
                {confidence < 0.5 && confidence > 0.01 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Consider rephrasing your question for a better answer
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        
        {!isUser && message.includes('model') && message.includes('loading') && (
          <div className="mt-2 flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
            <div className="animate-spin h-3 w-3">⚙️</div>
            <span>The AI model is warming up, please wait...</span>
          </div>
        )}
        
        {citations && citations.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
              Based on these passages:
            </p>
            <div className="space-y-2">
              {citations.map((citation, index) => (
                <div
                  key={index}
                  className="text-xs bg-white/50 dark:bg-gray-900/50 rounded-lg p-2"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`h-1.5 flex-grow rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700`}>
                      <div 
                        className={`h-full transition-all duration-500 ${
                          citation.similarity > 0.6 ? 'bg-green-500 dark:bg-green-400' :
                          citation.similarity > 0.4 ? 'bg-yellow-500 dark:bg-yellow-400' :
                          'bg-red-500 dark:bg-red-400'
                        }`}
                        style={{ width: `${Math.round(citation.similarity * 100)}%` }}
                      />
                    </div>
                    <span className={`font-medium ${
                      citation.similarity > 0.6 ? 'text-green-600 dark:text-green-400' :
                      citation.similarity > 0.4 ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {Math.round(citation.similarity * 100)}%
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    "{citation.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage; 