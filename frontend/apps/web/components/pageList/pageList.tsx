import styled from "@emotion/styled";
import {PlusSvg} from "../../assets/svgs";
import {PageListItem} from "../index";
import {DocumentCollection} from "../../firebase/collections/documentCollection";
import {useCallback, useState} from "react";

interface Props {
  documents: DocumentCollection[];
  onCreateNewPage: () => void;
}

export default function PageList({documents, onCreateNewPage}: Props) {
  const [disabled, setDisabled] = useState(false);

  const handleCreateNewPage = useCallback(() => {
    if (disabled) return;
    setDisabled(true);
    onCreateNewPage();
  }, [disabled, onCreateNewPage]);

  return (
    <Wrapper>
      {documents.map(document => (
        <PageListItem page={{title: document.title, id: document.id, emoji: document.emoji}}/>
      ))}
      <CreateNewPageButton onClick={handleCreateNewPage}>
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
