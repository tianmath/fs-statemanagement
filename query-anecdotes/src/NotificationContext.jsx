import { createContext, useState } from 'react';

const NotificationContext = createContext();

export default NotificationContext;

export const NotificationContextProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [messageTimer, setMessageTimer] = useState(null);

  const displayMessage = (msg, timeout) => {
    if (messageTimer !== null) clearTimeout(messageTimer);

    setMessage(msg);
    const currentMessageTimer = setTimeout(() => {
      setMessage('');
      setMessageTimer(null);
    }, timeout);
    setMessageTimer(currentMessageTimer);
  };

  return (
    <NotificationContext.Provider value={{ message, displayMessage }}>
      {children}
    </NotificationContext.Provider>
  );
};
