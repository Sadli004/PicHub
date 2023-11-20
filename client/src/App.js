import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Routeur from './components/Routes';
import { UidContext } from './components/AppContext';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  
  useEffect (() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get('http://localhost:3001/jwtid', 
        {withCredentials: true,}
        )
        
        setUid(response.data);
        
      } catch (err) {
        console.log('No token');
      }
    };

    fetchToken();
    if(uid) dispatch(getUser(uid));
  }, [uid,dispatch]
  ); 

  return (
    <UidContext.Provider value={uid}>
      <Routeur />
    </UidContext.Provider>
  );
}

export default App;
