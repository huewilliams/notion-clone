import styled from "@emotion/styled";

export default function List() {
  return (
    <>
      <Banner src={"/images/wood.jpg"}/>
      <ListWrapper>
        <Header>📓 Notion Clone</Header>
        <CreateNewPageButton>create new page</CreateNewPageButton>
      </ListWrapper>
    </>
  );
}

const Banner = styled.img`
  height: 200px;
  width: 100%;
`;

const ListWrapper = styled.div`
  padding: 40px 100px;
`;

const Header = styled.h1`
  font-size: 56px;
  font-weight: 600;
`;

const CreateNewPageButton = styled.button`
  margin-top: 20px;
  padding: 8px;

  color: white;
  background: dodgerblue;
  border: royalblue solid 1px;
  border-radius: 6px;
  cursor: pointer;
  
  &:hover {
    background: #1F70F0;
  }
`;
