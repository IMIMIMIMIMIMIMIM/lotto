import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Round = ({ onRoundChange, onTimerFinish }) => {
  const [round, setRound] = useState(1);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(sec) === 0 && parseInt(min) === 0) {
        onTimerFinish();
        clearInterval(countdown);
        setRound((prevRound) => prevRound + 1);
        onRoundChange(round + 1);
        setSec(10);
      } else if (parseInt(sec) > 0) {
        setSec((prevSec) => prevSec - 1);
      } else if (parseInt(sec) === 0) {
        setMin((prevMin) => prevMin - 1);
        setSec(59);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [min, sec, onTimerFinish]); // 타이머 작동 로직

  return (
    <div>
      <div style={{ display: "flex" }}>
        <NDiv>{round}회차</NDiv>
        <TimeDiv>
          &nbsp;&nbsp;{min}:{sec < 10 ? `0${sec}` : sec}
        </TimeDiv>
      </div>
    </div>
  );
};

export default Round;

const NDiv = styled.div`
  margin-left: 5%;
  font-size: 2rem;
  background-color: lightgray;
  margin: 1rem 0 1rem 1rem;
  border-radius: 5px 0 0 5px;
  color: white;
  background-color: #333333;
  padding: 1rem;
  /* border: 2px solid #black;
  border-right: 0px solid white; */
`;

const TimeDiv = styled.div`
  font-size: 2rem;
  background-color: lightgray;
  margin: 1rem 0 1rem 0;
  padding: 1rem;
  color: white;
  background-color: #333333;
  border-radius: 0 5px 5px 0;
  /* border: 2px solid black; */
`;
