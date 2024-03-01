import React, { useEffect } from 'react';
import Home from './src/screen/Home';
import SplashScreen from 'react-native-splash-screen';





const App = () => {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 5000);
  }, []);




  return (
    <Home />
  )
}

export default App