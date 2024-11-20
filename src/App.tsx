import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './constants/routes';

const App = () => {
  return <RouterProvider router={router} /> ;
};

export default App;