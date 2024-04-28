import styled from "@emotion/styled";
import {PlusSvg} from "../../assets/svgs";
import {PageListItem} from "../index";
import {DocumentCollection} from "../../firebase/collections/documentCollection";

interface Props {
  documents: DocumentCollection[];
  onCreateNewPage: () => void;
}

export default function PageList({documents, onCreateNewPage}: Props) {
  return (
    <Wrapper>
      {documents.map(document => (
        <PageListItem page={{title: document.title, id: document.id}}/>
      ))}
      <CreateNewPageButton onClick={onCreateNewPage}>
        <PlusSvg width={20}/>
        <ButtonText>create new page</ButtonText>
      </CreateNewPageButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CreateNewPageButton = styled.button`
  display: flex;
  width: 100%;
  line-height: 20px;
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

const ButtonText = styled.div`
  margin-left: 6px;
`;
