import React, { useEffect, useState } from 'react'
import Top8 from '../../components/Top8/Top8'
import usePrelimsData from '../../hooks/usePrelimData'
import './TopScorer.css'
import Header from '../../components/Header/Header'
const TopScorer = (props) => {

    const {getPrelimdata} = usePrelimsData();
    const [top8, setTop8] = useState();
    const [teams, setTeams] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    
    


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const handleClick = () => {
        setCurrentIndex(prevIndex => prevIndex + 1);
    };

    useEffect(() => {
        if ( top8 && currentIndex < top8.length) {
            console.log("current index",currentIndex);
            setTeams(prevTeams => [...prevTeams, top8[currentIndex]]);
        }
    }, [currentIndex]);
    useEffect(() => {
        document.body.addEventListener('keypress', handleKeyPress);
        return () => {
            document.body.removeEventListener('keypress', handleKeyPress);
        };
    }, [currentIndex]);

    useEffect(()=>{
        try {
            const data = async()=>{
                const resp = await getPrelimdata();
                console.log("getPrelimdata",resp);
                const sortedData = resp.sort((a, b) => parseFloat(b.Total) - parseFloat(a.Total));
                setTop8(sortedData.slice(0,8));
                console.log("sortedData",sortedData);
            }
            data();
        } catch (error) {
            console.log(error);
        }
       
    },[])











    return (
        <div onClick={handleClick}>
            <Header/>
            <div className='top8-head-main horizontal-rotate'>Top 8</div>
            <video className="video" src="/video/bg.mp4" autoPlay muted loop />
            <div className="overlay"></div>
            <div className='top8-container'>
                {teams.length >0 && teams.map((team, index) => {
                    return (
                        <Top8 teamCode={team.teamCode}  total={team.Total} />
                    );
                })}

            </div>
            {/* <button onClick={handleKeyPress}>Press Enter</button> */}
        </div>
    );

}

export default TopScorer
