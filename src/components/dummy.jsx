import React, { useState } from "react";

const Dummy = () => {
  const [userSelectedNumbers, setUserSelectedNumbers] = useState([]);
  const [resultArray, setResultArray] = useState([]);

  // 10개의 배열들
  const arrayOfArrays = [
    [5, 23, 10, 17, 35, 42],
    [8, 19, 30, 11, 25, 3],
    // 나머지 배열들도 동일한 형태로 생성
  ];

  const handleInputChange = (event, index) => {
    const { value } = event.target;
    const newSelectedNumbers = [...userSelectedNumbers];
    newSelectedNumbers[index] = parseInt(value, 10);
    setUserSelectedNumbers(newSelectedNumbers);
  };

  const compareArrays = () => {
    const counts = arrayOfArrays.map((array) => {
      let count = 0;
      array.forEach((number) => {
        if (userSelectedNumbers.includes(number)) {
          count++;
        }
      });
      return count;
    });

    // 가장 높은 카운트를 가진 배열 순서대로 정렬
    const sortedIndexes = counts
      .map((count, index) => ({ count, index }))
      .sort((a, b) => b.count - a.count)
      .map((item) => item.index);

    // 가장 높은 카운트의 5개 배열을 추출
    const top5Arrays = sortedIndexes
      .slice(0, 5)
      .map((index) => arrayOfArrays[index]);

    setResultArray(top5Arrays);
  };

  return (
    <div>
      {/* 사용자가 숫자를 입력하는 폼 */}
      <form>
        {userSelectedNumbers.map((number, index) => (
          <div key={index}>
            <label>{`숫자 ${index + 1}: `}</label>
            <input
              type="number"
              value={number || ""}
              onChange={(e) => handleInputChange(e, index)}
            />
          </div>
        ))}
      </form>

      {/* 비교 결과 출력 */}
      <button onClick={compareArrays}>비교하기</button>
      <div>
        <h3>가장 높은 카운트의 5개 배열:</h3>
        <ul>
          {resultArray.map((array, index) => (
            <li key={index}>{JSON.stringify(array)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dummy;
