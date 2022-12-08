import styled from '@emotion/styled';

export const ModuleComponent = styled.div`
  margin: 10px;
  padding: 10px;
  width: 240px;
  height: 240px;
  border-style: solid;
  border-color: #e8610e;
  border-width: 0px;
  cursor: pointer;
  :hover {
    padding: 8px;
    border-width: 2px;
  }
`;

export const ModuleContent = styled.div`
  background-color: #777777;
  height: 210px;
`;

export const ModuleTitle = styled.div`
  font-size: 24px;
  color: #ffffff;
  text-align: center;
`;
