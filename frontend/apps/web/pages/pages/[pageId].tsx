import styled from "@emotion/styled";
import {useRouter} from "next/router";
import Image from "next/image";
import {GetServerSideProps} from "next";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Editor, EditorRef} from "editor";
import {SlashCommands} from "../../components";
import {useSlashCommand} from "../../hooks";
import {DocumentCollection, saveDocument} from "../../firebase/collections/documentCollection";
import axios from "axios";
import useDocumentStore from "../../store/documentStore";
import {debounce} from "lodash";
import ChangeBannerImageModal from "../../components/changeBannerImageModal/ChangeBannerImageModal";

interface Props {
  data: DocumentCollection | null;
}

export default function Page({data}: Props) {
  const ref = useRef<EditorRef | null>(null);
  const {handleSlashCommand, showSlashCommands, rect, isSingle, setShowSlashCommands} = useSlashCommand();
  const router = useRouter();
  const {document, updateTitle, setDocument} = useDocumentStore((state) => state);
  const {title, bannerUrl} = document;
  const [changeBannerImageModalOpened, setChangeBannerImageModalOpened] = useState(false);

  const handleDocumentSave = useCallback(() => {
    saveDocument({
      id: router.query.pageId as string,
      title,
      data: ref.current?.getData() ?? {},
      bannerUrl,
    });
  }, [bannerUrl, router.query.pageId, title]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTitle(e.target.value);
  }

  useEffect(() => {
    updateTitle(data?.title ?? "Untitled");
  }, [data?.title, updateTitle]);

  useEffect(() => {
    if (data) {
      setDocument(data);
    }
  }, [data, setDocument]);

  useEffect(() => {
    const handler = debounce(handleDocumentSave, 300);
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    }
  }, [handleDocumentSave]);

  return (
    <>
      <Banner>
        <Image
          src={document.bannerUrl}
          alt={"santorini banner"}
          width={0}
          height={0}
          sizes={'100vw'}
          style={{width: '100%', minHeight: '200px'}}
        />
        <ChangeCoverButton
          onClick={() => setChangeBannerImageModalOpened(!changeBannerImageModalOpened)}
        >
          Change Cover
        </ChangeCoverButton>
        <ChangePositionButton>Change Position</ChangePositionButton>
      </Banner>
      {changeBannerImageModalOpened && <ChangeBannerImageModal/>}
      <Wrapper>
        <Emoji>📄</Emoji>
        <Title placeholder={"Untitled"} value={title} onChange={handleTitleChange}/>
        <EditorWrapper>
          <Editor
            placeholder={"Input Anything!"}
            ref={ref}
            slashCommand={handleSlashCommand}
            defaultState={data?.data}
          />
        </EditorWrapper>
      </Wrapper>
      <SlashCommands
        show={showSlashCommands}
        rect={rect}
        isSingle={isSingle}
        insertNodeCommand={ref.current?.insertNode}
        close={() => setShowSlashCommands(false)}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {pageId} = context.query;
  const res = await axios.get<{data: DocumentCollection}>(`/documents/${pageId}`);

  return {
    props: {
      data: res.status === 200 ? res.data : null
    }
  };
}

const Banner = styled.div`
  position: relative;
  overflow: hidden;
  user-select: none;
  width: 100%;
  height: 200px;
`;

const Wrapper = styled.div`
  padding: 60px 15%;
`;

const Emoji = styled.div`
  position: absolute;
  user-select: none;
  top: 160px;

  font-size: 56px;
`;

const Title = styled.input`
  font-size: 5rem;
  font-weight: 600;
  outline: none;
  border: none;
`;

const EditorWrapper = styled.div`
  font-size: 1.5rem;
`;

const Button = styled.button`
  position: absolute;
  padding: 4px;
  outline: none;
  border: none;
  background: white;
  z-index: 100;
  bottom: 10px;
  cursor: pointer;
  color: #B4B4B4;

  &:hover {
    background: #EBEBEB;
  }
`;

const ChangeCoverButton = styled(Button)`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  right: 124px;
`;

const ChangePositionButton = styled(Button)`
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  right: 20px;
`;
