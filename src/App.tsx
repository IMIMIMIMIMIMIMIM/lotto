import React, { useState } from "react";
import styled from "styled-components";
import Round from "./components/round";
import Number from "./components/number";
import Input from "./components/input";
import Result from "./components/result";
import Data from "./components/data";

interface AppProps {}

const App = (props: AppProps) => {
  const [round, setRound] = useState<number[]>([0]);
  const [lottoNumbers, setLottoNumbers] = useState<number[]>([]);
  const [numbersList, setNumbersList] = useState<number[][]>([]);
  const [timerFinished, setTimerFinished] = useState<boolean>(false);

  const handleRoundChange = (newRound: number) => {
    setRound((prevRounds) => [newRound, ...prevRounds]);
  };

  const handleTimerFinish = () => {
    setTimerFinished(true);
  };

  const handleNumbersChange = (numbers: number[]) => {
    setLottoNumbers(numbers);
    setNumbersList((prevList) => [numbers, ...prevList]);
    setTimerFinished(false);
    if (timerFinished && numbers.length === 0) {
    }
  };
  const lottoResults = numbersList.map((numbers, index) => ({
    round: round[index] - 1,
    numbers: numbers,
  }));
  // console.log(lottoResults);

  return (
    <AppDiv>
      <ConDiv>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            justifyContent: "space-between",
          }}
        >
          <Round
            onRoundChange={handleRoundChange}
            onTimerFinish={handleTimerFinish}
          />
          <Number
            timerFinished={timerFinished}
            onNumbersChange={handleNumbersChange}
          />
        </div>
        <Input lottoResults={lottoResults} />
        <Data lottoNumbers={lottoNumbers} />
      </ConDiv>
      <Result lottoResults={lottoResults} />
    </AppDiv>
  );
};

export default App;

const AppDiv = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;
  overflow: hidden;
`;

const ConDiv = styled.div`
  width: 45%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
