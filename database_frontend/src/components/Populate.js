import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { populateDatabase } from '../db methods/dbAdmin';

const Populate = () => {
  const history = useHistory();

  useEffect(() => {
    //sessionStorage.clear();
    const populate = async () => {
      
      const uidString = sessionStorage.getItem('uid');
      const uid = parseInt(uidString, 10);
      const password = sessionStorage.getItem('password'); 

      await populateDatabase(uid, password);
      history.push('/dashboard');
    };
    populate();
  }, [history]);

  return <h2>Populating the database...</h2>;
};

export default Populate;
