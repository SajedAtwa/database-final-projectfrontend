import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { dropDatabase } from '../db methods/dbAdmin';

const Drop = () => {
  const history = useHistory();

  useEffect(() => {
    const drop = async () => {
      const uidString = sessionStorage.getItem('uid');
      const uid = parseInt(uidString, 10);
      const password = sessionStorage.getItem('password'); 

      await dropDatabase(uid, password);

      history.push('/');
    };
    drop();
  }, [history]);

  return <h2>Dropping the database...</h2>;
};

export default Drop;
