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
        <img src="img/ximlogo-1.png" alt='ximlogo' className='logo logo-xim' style={{marginRight:"10px"}}/>
        <div className='content'>
            <div className='head-text'>{statementArray[0]}</div>
            <div className='subHead1'>{statementArray[1]}</div>   
            <div className='image-container'>
               
                <img src="img/ccoi-final.png" id='ccoi'  alt="" />
            </div>
        </div>
        <img src="img/mcclogo.jpg" alt='ximlogo' className='logo logo-mcc' style={{marginLeft:"10px"}}/>
       </div>
    );
};

export default Header;
