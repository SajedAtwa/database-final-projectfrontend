import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { populateDatabase } from '../db methods/dbAdmin';

const Populate = () => {
  const history = useHistory();

  useEffect(() => {
    const populate = async () => {
      
      const uid = sessionStorage.getItem('uid');
      const password = sessionStorage.getItem('password'); 

      await populateDatabase(uid, password);
      history.push('/');
    };
    populate();
  }, [history]);

  return <h2>Populating the database...</h2>;
};

export default Populate;
