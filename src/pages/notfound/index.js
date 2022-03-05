import React from 'react';
import './index.css';
import Avatar from './404.png';

const NotFound = () => (
  <div className='not-found'>
    <div className='not-found__container'>
      <img src={Avatar}/>
      <div className='not-found__text'>当前页面不存在</div>
    </div>
  </div>
);

export default NotFound;
