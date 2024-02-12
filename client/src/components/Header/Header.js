import React from 'react';
import './Header.css'



const statementArray = [
    'National Moot Court Competition 2024',
    'in collaboration with',
    'Competition Commission of India',
    '16th - 18th February 2024'
]

const Header = (props) => {



    return (
       <div  className='header-container'>
        <div className='logo-container a'><img src="img/ximlogo-1.png" alt='ximlogo' className='logo logo-xim' style={{marginRight:"10px"}}/></div>
        <div className='content a'>
            <div className='head-text c'>{statementArray[0]}</div>
            <div className='subHead1 c' >{statementArray[1]}</div>   
            <div className='image-container c'>
               <img src="img/ccoi2.png" id='ccoi'  alt="" />
            </div>
        </div>
        <div className='logo-container a'><img src="img/mcclogo.jpg" alt='ximlogo' className='logo logo-mcc' style={{marginLeft:"10px"}}/></div>
       </div>
    );
};

export default Header;
