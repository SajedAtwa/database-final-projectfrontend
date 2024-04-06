import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { populateDatabase } from '../db methods/dbAdmin'; 

const Populate = () => {
  const history = useHistory();

  useEffect(() => {
    const populate = async () => {
      await populateDatabase(); 
      history.push('/'); // Redirect to home page after completion
    };
    populate();
  }, [history]);

  return <h2>Populating the database...</h2>;
};

export default Populate;
