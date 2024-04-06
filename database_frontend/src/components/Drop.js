import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { dropDatabase } from '../db methods/dbAdmin'; 

const Drop = () => {
  const history = useHistory();

  useEffect(() => {
    const drop = async () => {
      await dropDatabase(); 
      history.push('/'); // Redirect to home page after completion
    };
    drop();
  }, [history]);

  return <h2>Dropping the database...</h2>; 
};

export default Drop;
