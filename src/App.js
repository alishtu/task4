import React, { useState, useEffect } from 'react';

const withTimeTracking = (WrappedComponent) => {
  return function TimeTrackingComponent(props) {
    const [startTime, setStartTime] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timeSpent, setTimeSpent] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime((prevTime) => {
          const now = new Date();
          setTimeSpent((prevTime - startTime + (now - prevTime)) / 1000); 
          return now;
        });
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }, [startTime]);

    return (
      <div>
        <h2>Time Tracker</h2>
        <p>Current Time: {currentTime.toLocaleTimeString()}</p>
        <p>Time Spent: {timeSpent.toFixed(2)} seconds</p>
        <WrappedComponent {...props} />
      </div>
    );
  };
};


const Component1 = () => {
  return <div>Component 1 content here</div>;
};

const Component1WithTimeTracking = withTimeTracking(Component1);


const App = () => {
  return (
    <div>
      <h1>My App</h1>
      <Component1WithTimeTracking />
    
    </div>
  );
};

export default App;
