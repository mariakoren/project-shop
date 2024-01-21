import React, { useEffect, useState } from 'react';

const SseComponent = () => {
    const [adMessage, setAdMessage] = useState('');
    useEffect(() => {
      const eventSource = new EventSource('http://localhost:8800/events/datetime');
  
      eventSource.onmessage = function (event) {
        const data = JSON.parse(event.data);
        setAdMessage(data.message); // Access 'message' key
      };
  
      eventSource.onerror = function (event) {
        console.error('Error occurred:', event);
      };
  
      return () => {
        eventSource.close();
      };
    }, []);
  
    return (
      <div>
        <p>{adMessage}</p>
      </div>
    );
};

export default SseComponent;