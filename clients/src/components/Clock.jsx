import React, { memo, useEffect, useState } from "react";

const Clock = memo(() => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const i = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <h1 className="text-2xl font-bold hidden md:block">
      {time}
    </h1>
  );
});

export default Clock;
