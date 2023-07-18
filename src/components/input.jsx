import React, { useState } from "react";
import styled from "styled-components";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Input = ({ round, numbersList }) => {
  const [numbers, setNumbers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [resultList, setResultList] = useState([]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    const updatedNumbers = [...numbers];
    updatedNumbers[index] = parseInt(value);
    setNumbers(updatedNumbers);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleSave = () => {
    const choose = numbers.slice(0, 6);
    const uniqueNumbers = [...new Set(choose)]; // 중복 제거

    if (uniqueNumbers.length !== choose.length) {
      setErrorMessage("중복된 숫자를 뽑을 수 없습니다.");
      setModal(false);
    } else if (choose.some((number) => number > 45)) {
      setErrorMessage("45보다 큰 숫자를 뽑을 수 없습니다.");
      setModal(false);
    } else if (choose.length < 6) {
      setErrorMessage("빈 칸을 채워주세요.");
      setModal(false);
    } else {
      setErrorMessage("");
      setModal(true); // 조건을 모두 만족할 경우 모달을 표시
    }
  };

  const total = numbers.reduce((acc, cur) => acc + cur, 0);
  const oddCount = numbers.filter((number) => number % 2 !== 0).length;
  const evenCount = numbers.filter((number) => number % 2 === 0).length;
  const highCount = numbers.filter((number) => number >= 23).length;
  const lowCount = numbers.filter((number) => number <= 22).length;

  const calculateACValue = () => {
    const acValues = [];

    for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        const minus = Math.abs(numbers[j] - numbers[i]);
        acValues.push(minus);
      }
    }

    const uniqueAcValues = [...new Set(acValues)];
    return uniqueAcValues.length - 5;
  };

  const acValue = calculateACValue();

  const onesDigit = numbers
    .map((number) => number % 10)
    .reduce((acc, cur) => acc + cur, 0);

  const compareNumber = () => {
    const counts = numbersList.map(
      (list) => list.filter((number) => numbers.includes(number)).length
    );
    const sortedList = counts
      .map((count, i) => ({ count, i }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map((item) => item.i);

    const top5List = sortedList.map((i) => numbersList[i]);
    console.log(round, top5List);
    setResultList(top5List);
  };

  const getBackgroundColor = (number) => {
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

  const getTotalColor = (total) => {
    if (total >= 100 && total <= 175) {
      return "#b0d840";
    } else if (total >= 60 && total <= 215) {
      return "#fbc400";
    } else {
      return "#ff7272";
    }
  };

  const TotalTooltip = () => (
    <>
      번호 6개를 합친 값입니다.
      <br />
      총합이 100미만이거나 170이상인 경우
      <br />
      역대 1등 당첨번호 통계상 출현 확률은 10% 이내입니다.
      <br />
      100 ~ 175 사이의 구간을 추천합니다.
    </>
  );
  const AcTooltip = () => (
    <>
      AC값이란 조합번호 6개를 산술적으로 계산한 값을 말하며 0 ~ 10으로
      분류합니다.
      <br />
      AC값이 7이상으로 나오는 경우가 역대 1등 당첨번호 통계상 80%에 해당하기에
      <br />
      AC값을 7이상으로 조합하는것을 추천합니다.
    </>
  );
  const OddEvenTooltip = () => (
    <>
      조합번호 6개에 대한 홀,짝 개수를 말합니다.
      <br />
      조합번호를 모두 홀과 짝으로 하는 경우, 역대 1등 당첨번호 통계상 나올
      확률이 2% 미만이기에
      <br />
      조합을 모두 '홀'이나 '짝'으로 선택하는 것은 추천하지 않습니다.
    </>
  );
  const HighLowTooltip = () => (
    <>
      조합번호 6개중 23을 기준으로 23미만 (1~22) 저비율, 23이상(23~45)
      고비율이라고 합니다.
      <br />
      AC값이 7이상으로 나오는 경우가 역대 1등 당첨번호 통계상 80%에 해당하기에
      <br />
      조합번호를 모두 '고' 혹은 '저' 비율로 조합하는 경우
      <br />
      역대 1등 당첨번호 통계상 나올 확률이 3% 미만이기에
      <br />
      조합을 모두 '고' 혹은 '저' 비율로 선택하는 것은 추천하지 않습니다.
    </>
  );
  const OnesDigitTooltip = () => (
    <>
      선택한 번호의 모든 끝자리수의 합을 말합니다.
      <br />
      예를 들어 번호가 15인 경우 5가 해당되며, 한 자리수의 경우는 자신의 수가
      해당됩니다.
      <br />
      끝수 총합구간은 15~35구간이 나오는 확률이 90%이기에 로또타파에서는
      15~35구간을 추천합니다.
    </>
  );

  const tooltipStyle = {
    fontSize: "6px", // 원하는 폰트 크기로 설정
  };

  return (
    <ConDiv>
      <InDiv>
        {Array.from({ length: 6 }, (_, index) => (
          <NumberInput
            key={index}
            type="number"
            value={numbers[index] || ""}
            onChange={(e) => handleChange(e, index)}
          />
        ))}
        <SaveBtn
          onClick={() => {
            handleSave();
            compareNumber();
          }}
        >
          확인
        </SaveBtn>
        {modal ? (
          <ModalContainer onClick={closeModal}>
            <Modal onClick={(e) => e.stopPropagation()}>
              <LeftDiv>
                <ChooseDiv>
                  {numbers.slice(0, 6).map((number, i) => (
                    <NumDiv bgColor={getBackgroundColor(number)}>
                      {number}
                    </NumDiv>
                  ))}
                </ChooseDiv>
                <DataDiv>
                  <Table>
                    <tbody>
                      <tr>
                        <td style={{ position: "relative" }}>
                          총합
                          <TooltipBtn id="1">?</TooltipBtn>
                          <ReactTooltip
                            anchorId="1"
                            place="top"
                            style={tooltipStyle}
                          >
                            <TotalTooltip />
                          </ReactTooltip>
                        </td>
                        <td>
                          <TotalSpan color={getTotalColor(total)}>
                            {total}
                          </TotalSpan>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ position: "relative" }}>
                          AC값
                          <TooltipBtn id="2">?</TooltipBtn>
                          <ReactTooltip
                            anchorId="2"
                            place="top"
                            style={tooltipStyle}
                          >
                            <AcTooltip />
                          </ReactTooltip>
                        </td>
                        <td>{acValue}</td>
                      </tr>
                      <tr>
                        <td style={{ position: "relative" }}>
                          홀짝 비율<TooltipBtn id="3">?</TooltipBtn>
                          <ReactTooltip
                            anchorId="3"
                            place="top"
                            style={tooltipStyle}
                          >
                            <OddEvenTooltip />
                          </ReactTooltip>
                        </td>
                        <td>
                          {oddCount} : {evenCount}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ position: "relative" }}>
                          고저 비율<TooltipBtn id="4">?</TooltipBtn>
                          <ReactTooltip
                            anchorId="4"
                            place="top"
                            style={tooltipStyle}
                          >
                            <HighLowTooltip />
                          </ReactTooltip>
                        </td>
                        <td>
                          {highCount} : {lowCount}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ position: "relative" }}>
                          끝수 총합<TooltipBtn id="5">?</TooltipBtn>
                          <ReactTooltip
                            anchorId="5"
                            place="top"
                            style={tooltipStyle}
                          >
                            <OnesDigitTooltip />
                          </ReactTooltip>
                        </td>
                        <td>{onesDigit}</td>
                      </tr>
                    </tbody>
                  </Table>
                </DataDiv>
              </LeftDiv>
              <CompareDiv>
                <table>
                  <thead>
                    <tr>
                      <th>회차</th>
                      <th>번호</th>
                      <th>맞은 개수</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultList.map((array, i) => (
                      <tr key={i}>
                        <td>회차 {array.i}</td>
                        <NumTd>
                          {array.map((number, index) => (
                            <Num2Div
                              bgColor={
                                numbers.includes(number)
                                  ? getBackgroundColor(number)
                                  : ""
                              }
                              color={
                                numbers.includes(number) ? "white" : "gray"
                              }
                              textShadow={
                                numbers.includes(number)
                                  ? "0px 0px 3px rgba(0, 49, 70, 0.8)"
                                  : ""
                              }
                              key={index}
                            >
                              {number}
                            </Num2Div>
                          ))}
                        </NumTd>
                        {/* <td>{sortedList[i].matchedCount}개</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CompareDiv>
              <ModalBtn
                onClick={() => {
                  closeModal();
                  setNumbers([]); // 확인 버튼을 눌렀을 때 숫자 초기화
                }}
              >
                확인
              </ModalBtn>
            </Modal>
          </ModalContainer>
        ) : null}
      </InDiv>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </ConDiv>
  );
};

export default Input;

const ConDiv = styled.div`
  height: 300px;
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  background-color: gray;
  border-radius: 10px;

  h2 {
    margin-bottom: 1rem;
  }

  input {
    margin-right: 0.5rem;
    width: 50px;

    appearance: none;
    -webkit-appearance: none;
  }

  input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    background-color: #f0f0f0;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 0.5rem;
`;

const InDiv = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-around;
`;

const NumberInput = styled.input`
  width: 5rem !important;
  margin: 0 !important;
  padding: 0;
  outline: none;
  text-align: center;
`;

const SaveBtn = styled.button`
  height: 1.5rem;
  width: 5rem;
  margin: 0 !important;
  padding: 0 !important;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  padding: 16px;
  background: white;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 0 5px 1px;
`;

const LeftDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ChooseDiv = styled.div`
  /* width: 40%; */
  display: flex;
  justify-content: space-around;
  border: 2px solid gray;
  border-radius: 1rem;
  height: 15%;
  align-items: center;
`;

const NumDiv = styled.div`
  font-size: 1.5rem;
  background-color: ${(props) => props.bgColor};
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 0px 0px 3px rgba(0, 49, 70, 0.8);
`;
const Num2Div = styled.div`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  margin-right: 0.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  text-shadow: ${(props) => props.textShadow};
`;

const NumTd = styled.td`
  display: flex;
`;

const DataDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  border: 2px solid gray;
  border-radius: 1rem;
  display: flex;
  height: 80%;
  font-size: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
    border-top: 0;
    :first-child {
      border-left: 0;
    }
    :last-child {
      border-right: 0;
    }
  }

  th {
    background-color: #f0f0f0;
    font-weight: bold;
  }
`;

const TotalSpan = styled.span`
  color: ${(props) => props.color};
`;

const CompareDiv = styled.div`
  border: 2px solid gray;
  border-radius: 1rem;
  width: 45%;
  height: 85%;
  display: flex;
`;

const ModalBtn = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  font-size: 1.5rem;
  margin: 0 !important;
`;

const TooltipBtn = styled.button`
  color: white;
  background-color: black !important;
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0.5rem;
  right: 5rem;
  width: 1rem;
  border-radius: 50% !important;
  margin: 0 !important;
  padding: 0 !important;
`;
