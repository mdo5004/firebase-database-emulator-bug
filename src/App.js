import './App.css';
import React from 'react';
import fire from './fire';

let userSession = {};

fire.auth().onAuthStateChanged((user) => {
  if (user) {
    // user is signed in
    userSession = user;
  } else {
    // user is signed out
    userSession = {};
  }
});

function App() {
  const dbref = React.useRef();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [databaseData, setDatabaseData] = React.useState({});
  const [hasLoggedIn, setHasLoggedIn] = React.useState(false);
  function login(e) {
    e.preventDefault();
    return fire.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        setHasLoggedIn(true);
      });
  }
  const logout = () => {
    fire.auth().signOut();
    setHasLoggedIn(false);
  };
  React.useEffect(() => {
    if (userSession.uid) {
      dbref.current = fire.database().ref('data');
      dbref.current.on('value', (snap) => {
        const data = snap.val();
        // console.log(data)
        setDatabaseData(data);
      })
    }
  }, [hasLoggedIn]);


  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      {
        userSession.uid && hasLoggedIn
          ? <div>
            <p>{JSON.stringify(databaseData)}</p>
            <button onClick={logout}>Try again</button>
          </div>
          : <form onSubmit={login}>
            <input
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>log in</button>
          </form>
      }
    </div>
  );
}

export default App;
