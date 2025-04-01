import { useState } from 'react';
import PostList from './components/PostList';
import CategorySlider from './components/CategorySlider';
import './App.css';

function App() {

  return (
    <>
      <h1 className='bg-red-600 text-center'>Vite+React+Tailwindcss</h1>
      <CategorySlider category='4z0e0xwcLp8C3QGc7vrtAI' />
      <PostList />
    </>
  )
};

export default App;
