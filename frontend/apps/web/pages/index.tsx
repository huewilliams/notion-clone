import styled from "@emotion/styled";
import {PageList} from "../components";

export default function List() {
  return (
    <>
      <Banner src={"/images/wood.jpg"}/>
      <ListWrapper>
        <Header>📓 Notion Clone</Header>
        <CreateNewPageButton>create new page</CreateNewPageButton>
        <HorizontalDivider/>
        <PageList/>
      </ListWrapper>
    </>
  );
}

const Banner = styled.img`
  height: 200px;
  width: 100%;
`;

const ListWrapper = styled.div`
  padding: 40px 200px;
`;

const Header = styled.h1`
  font-size: 56px;
  font-weight: 600;
`;

const HorizontalDivider = styled.div`
  margin: 20px 0;

  border-bottom: 1px solid #B4B4B4;
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
