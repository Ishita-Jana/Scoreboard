import React from 'react';

const data = [
  // Your data goes here
  // Format: { teamCode, speaker1, speaker2, judges: [{ judgeName, scores: [/* scores for c1, c2, ..., c10 */] }] }
];

const PrelimsScoreTable = () => {
  const categories = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'];

  const getJudgeColumns = (team) => {
    let judgeColumns = [];
    team.judges.forEach((judge, judgeIndex) => {
      judge.scores.forEach((score, scoreIndex) => {
        judgeColumns.push(
          <React.Fragment key={`${team.teamCode}-${judgeIndex}-${scoreIndex}`}>
            <td>{score}</td>
            <td>{judge.judgeName}</td>
          </React.Fragment>
        );
      });
    });
    return judgeColumns;
  };

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th rowSpan="2">Teams</th>
            <th colSpan="2">Speakers</th>
            <th colSpan={categories.length * 2}>Judges</th>
          </tr>
          <tr>
            <th>Speaker1</th>
            <th>Speaker2</th>
            {categories.map((category, index) => (
              <React.Fragment key={index}>
                <th>{category}</th>
                <th>Judge Name</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((team) => (
            <tr key={team.teamCode}>
              <td>{team.teamCode}</td>
              <td>{team.speaker1}</td>
              <td>{team.speaker2}</td>
              {getJudgeColumns(team)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrelimsScoreTable;
