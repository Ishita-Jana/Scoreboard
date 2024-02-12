import React, { useState, useEffect,useRef } from 'react';
import './ScoreInput.css'


const ScoreInput = ({teamDetails, handleSubmit}) => {
    
  const categories = [
    "Appreciation and application of facts",
    "Application of legal principles",
    "Use of authorities and precedents",
    "Presentation skills",
    "Clarity of thoughts and structure of arguments",
    "Poise and demeanour",
    "Court Mannerism",
    "Strategy & Time Management",
    "Knowledge of laws",
    "Response to Forum questions",
  ];

  const shortCat = ["c1","c2","c3","c4","c5","c6","c7","c8","c9","c10"]
  const [scores, setScores] = useState(() => {
    const initialScores = {};

    shortCat.forEach((cat) => {
      initialScores[cat] = {
        Speaker1: '',
        Speaker2: '',
      };
    });
    return initialScores;
  });
  const [validationErrors, setValidationErrors] = useState([]);
  const inputRefs = useRef({});
  

  
  
  const handleScoreChange = (category,speaker, value) => {

    if(value <= 10){
      console.log(value, " ",category, " ", speaker )
      setScores(prevScores => ({
        
        ...prevScores,
        [category]: {
          ...(prevScores[category] || {}),
              [speaker]: value,
        },
      }));
    }

    else{
      console.log("Please enter a value between 0 and 10");
    }
   
  };

  const handleData=()=>{
    // const isAnyScoreEmpty = Object.values(scores).some((categoryScores) =>
    // Object.values(categoryScores).some((score) => score === undefined || score === ''));
    // // console.log(isAnyScoreEmpty);
       
    const errors = shortCat.reduce((acc, cat) => {
      ['Speaker1', 'Speaker2'].forEach((speaker) => {
        if (!scores[cat]?.[speaker]) {
          acc[cat] = acc[cat] || {};
          acc[cat][speaker] = true;
        }
      });
      return acc;
    }, {});

    // If any score is empty, set the validation errors
    setValidationErrors(errors);




    // If all scores are filled, submit the data
    if (Object.keys(errors).length === 0) {
      handleSubmit(scores);
    } 
    
    
    else {
      const firstErrorField = inputRefs.current[Object.keys(errors)[0]].Speaker1;
      if (firstErrorField.current) {
        firstErrorField.current.focus();
      }
    }

  }




  useEffect(()=>{
    console.log(scores);
  },[scores])

  

  return (
    <div className="score-table-container">
        <div>
            <table>
                <thead className='table-heading'>
                <tr>
                    <th className='head-j'>Categories</th>
                    <th className='head-j'>Speaker1</th>
                    <th className='head-j'>Speaker2</th> 
                </tr>
                </thead>
                <tbody className='cat-score-judge'>
                 {shortCat.map((cat, index) => (
              <tr key={cat}>
                <td className='category-box'>{`${index + 1}. ${categories[index]}`}</td>
                <td
                  key={`${cat}-Speaker1`}
                  className={`${validationErrors[cat]?.Speaker1 ? 'error' : ''} score-input-container`}>
                  <input
                    type="number"
                    ref={(el) => (inputRefs.current[cat] = { ...inputRefs.current[cat], Speaker1: el })}
                    onChange={(e) => handleScoreChange(cat, 'Speaker1', e.target.value)}
                    value={scores[cat]?.Speaker1}
                    required
                  />
                </td>
                <td key={`${cat}-Speaker2`} className={`${validationErrors[cat]?.Speaker2 ? 'error' : ''} score-input-container`}>
                  <input
                    type="number"
                    ref={(el) => (inputRefs.current[cat] = { ...inputRefs.current[cat], Speaker2: el })}
                    onChange={(e) => handleScoreChange(cat, 'Speaker2', e.target.value)}
                    value={scores[cat]?.Speaker2}
                    required
                  />
                </td>
              </tr>
            ))}
          </tbody>
            </table>
        </div>
        <div className='score-input-submit'> <button onClick={handleData}>Submit</button></div>
    </div>
  );
};

export default ScoreInput;
