import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface DataProps {
  lottoNumbers: number[];
}

const Data = ({ lottoNumbers }: DataProps) => {
  const [numberCountMap, setNumberCountMap] = useState<{
    [key: number]: number;
  }>({});
  const allNumbers = Array.from({ length: 45 }, (_, index) => index + 1);

  useEffect(() => {
    // 각 숫자의 출현 횟수를 세는 로직
    const updatedCountMap: { [key: number]: number } = { ...numberCountMap };
    lottoNumbers.forEach((number) => {
      if (updatedCountMap[number]) {
        updatedCountMap[number]++;
      } else {
        updatedCountMap[number] = 1;
      }
    });

    allNumbers.forEach((number) => {
      if (!updatedCountMap[number]) {
        updatedCountMap[number] = 0;
      }
    });

    setNumberCountMap(updatedCountMap);
  }, [lottoNumbers]);

  const sortedNumbers: number[] = Object.keys(numberCountMap)
    .map(Number)
    .sort((a, b) => numberCountMap[b] - numberCountMap[a]);

  const topFiveNumbers = sortedNumbers.slice(0, 5);
  const bottomFiveNumbers = sortedNumbers.slice(-5).reverse();

  const getBackgroundColor = (number: number) => {
    if (number <= 10) {
      return "#fbc400";
    } else if (number <= 20) {
      return "#69c8f2";
    } else if (number <= 30) {
      return "#ff7272";
    } else if (number <= 40) {
      return "#aaa";
    } else {
      return "#b0d840";
    }
  };

  return (
    <Container>
      <TopDiv>
        <Title>가장 많이 나온 숫자:</Title>
        <NumbersContainer>
          {topFiveNumbers.map((number, index) => (
            <NumberItem key={index}>
              <RankDiv>{index + 1}.</RankDiv>
              <NumberDiv
                style={{ backgroundColor: getBackgroundColor(Number(number)) }}
              >
                {number}
              </NumberDiv>
              <CountDiv>{numberCountMap[Number(number)]}번</CountDiv>
            </NumberItem>
          ))}
        </NumbersContainer>
      </TopDiv>
      <BottomDiv>
        <Title>가장 적게 나온 숫자:</Title>
        <NumbersContainer>
          {bottomFiveNumbers.map((number, index) => (
            <NumberItem key={index}>
              <RankDiv>{index + 1}.</RankDiv>
              <NumberDiv
                style={{ backgroundColor: getBackgroundColor(Number(number)) }}
              >
                {number}
              </NumberDiv>
              <CountDiv>{numberCountMap[Number(number)]}번</CountDiv>
            </NumberItem>
          ))}
        </NumbersContainer>
      </BottomDiv>
    </Container>
  );
};

export default Data;

const Container = styled.div`
  margin: 1rem;
  display: flex;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const NumbersContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NumberItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const RankDiv = styled.div`
  margin-right: 0.5rem;
`;

const NumberDiv = styled.div`
  margin-right: 0.5rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  text-align: center;
  color: white;
  justify-content: center;
  align-items: center;
  display: flex;
  text-shadow: 0px 0px 3px rgba(0, 49, 70, 0.8);
`;

const CountDiv = styled.div``;

const TopDiv = styled.div`
  margin-right: 5rem;
`;

const BottomDiv = styled.div``;
