import React, { useState } from "react";
import axios from 'axios';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    axios.post(`${process.env.REACT_APP_API_URL}api/user/login`, {
      email,
      password,
    }, {
      withCredentials: true,
    })
    .then((res) => { 
      console.log(res);
      if (res.data.errors) {
        setEmailError(res.data.errors.email);
        setPasswordError(res.data.errors.password);
      } else {
        // Successful login logic
        // You may want to use React Router for navigation
        window.location ='/'
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }

  return ( 
    <div className="login-form">
      <form action="" onSubmit={handleSubmit} id="sign-in-form">
        <label htmlFor="email">Email</label>
        <br/>
        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <br/>
        <div className="email error">{emailError}</div>
        <br />
        <label htmlFor="password">Password</label>
        <br/>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <br/>
        <div className="password error">{passwordError}</div>
        <br />
        <input type="submit" value="Sign In" />
      </form>
    </div>
  );
}

export default SignInForm;
