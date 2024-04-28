import styled from "@emotion/styled";
import Image from "next/image";
import axios from "axios";
import {useCallback} from "react";
import {DocumentCollection} from "../firebase/collections/documentCollection";
import {PageList} from "../components";
import {useRouter} from "next/router";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  documents: DocumentCollection[];
}

export default function List(props: Props) {
  const {documents} = props;
  const router = useRouter();

  const handleCreateNewPage = useCallback(async () => {
    const res = await axios.post('/documents');
    await router.push(`/pages/${res.data.id}`);
  }, [router]);

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
        <CreateNewPageButton onClick={handleCreateNewPage}>create new page</CreateNewPageButton>
        <HorizontalDivider/>
        {documents ? <PageList documents={documents} onCreateNewPage={handleCreateNewPage}/> : null}
      </ListWrapper>
    </>
  );
}

export async function getServerSideProps() {
  const res = await axios.get<{data: DocumentCollection[]}>('/documents');

  return {
    props: {
      documents: res.data
    }
  }
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
