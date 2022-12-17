import styled from "@emotion/styled";

export default function PageList() {
  return (
    <div>
      <CreateNewPageButton>create new page</CreateNewPageButton>
    </div>
  )
}

const CreateNewPageButton = styled.button`
  display: flex;
  width: 100%;
  padding: 5px 4px;

  color: dodgerblue;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #D1E5F7;
  }
`;
