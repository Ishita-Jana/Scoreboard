import React, { useEffect,useState } from 'react'
import './Top8.css'

const Top8 = (props) => {
    const {teamCode,total}= props;
    console.log(teamCode,total);
    // 
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Set isVisible to true after a delay to trigger the animation
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 200); // Adjust the delay as needed

        // Clear timeout on component unmount to prevent memory leaks
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div  className={`card-con ${isVisible ? 'show' : ''}`}>
            <div className={`card ${isVisible ? 'show' : ''}`}>
                <div className={`card-img ${isVisible ? 'show' : ''}`}>
                    <img src="img/rect.svg" alt="" />
                </div>
                <div className={`card-header ${isVisible ? 'show' : ''}`}>
                    <div className='team-code'>{teamCode}</div>
                </div>
                <div className={`card-body ${isVisible ? 'show' : ''}`}>
                    <div className='marks'>{total}</div>
                </div>
            </div>
        </div>
    );
}

export default Top8
