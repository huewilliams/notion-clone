import styled from "@emotion/styled";
import {PageList} from "../components";
import Image from "next/image";

export default function List() {
  return (
    <>
      <Banner>
        <Image
          src={"/images/library.jpg"}
          alt={"library banner"}
          fill
          style={{objectFit: "cover", objectPosition: "center center"}}
        />
      </Banner>
      <ListWrapper>
        <Header>📓 Notion Clone</Header>
        <CreateNewPageButton>create new page</CreateNewPageButton>
        <HorizontalDivider/>
        <PageList/>
      </ListWrapper>
    </>
  );
}

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

const ListWrapper = styled.div`
  padding: 40px 15%;
`;

const Header = styled.h1`
  font-size: 5rem;
  font-weight: 600;
  
  @media (max-width: 520px) {
    font-size: 3rem;
  }
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
