import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { dropDatabase } from '../db methods/dbAdmin';

const Drop = () => {
  const history = useHistory();

  useEffect(() => {
    const drop = async () => {
      // Retrieve uid and password securely
      const uid = sessionStorage.getItem('uid'); 
      const password = sessionStorage.getItem('password'); 

      // Ensure uid and password are present
      if (!uid || !password) {
        console.error('User UID or password is missing');
        return; 
      }

      await dropDatabase(uid, password);

      // Redirect to home page after completion
      history.push('/');
    };
    drop();
  }, [history]);

  return <h2>Dropping the database...</h2>;
};

export default Drop;
