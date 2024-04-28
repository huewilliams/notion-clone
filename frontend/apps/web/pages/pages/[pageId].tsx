import styled from "@emotion/styled";
import {useRouter} from "next/router";
import Image from "next/image";
import {GetServerSideProps} from "next";
import React, {useEffect, useRef} from "react";
import {Editor, EditorRef} from "editor";
import {SlashCommands} from "../../components";
import {useSlashCommand} from "../../hooks";
import {DocumentCollection, saveDocument} from "../../firebase/collections/documentCollection";
import axios from "axios";
import useDocumentStore from "../../store/documentStore";

interface Props {
  data: DocumentCollection | null;
}

export default function Page({data}: Props) {
  const ref = useRef<EditorRef | null>(null);
  const {handleSlashCommand, showSlashCommands, rect, isSingle, setShowSlashCommands} = useSlashCommand();
  const router = useRouter();
  const {title, setTitle} = useDocumentStore((state) => state);

  const handleDocumentSave = () => {
    saveDocument({
      id: router.query.pageId as string,
      title: title,
      data: ref.current?.getData() ?? {}
    });
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  useEffect(() => {
    setTitle(data?.title ?? "Untitled");
  }, [data?.title, setTitle]);

  return (
    <>
      <Banner>
        <Image src={"/images/santorini.jpg"} alt={"santorini banner"} fill style={{objectFit: "cover"}}/>
      </Banner>
      <Wrapper>
        <Emoji>📄</Emoji>
        <Button onClick={handleDocumentSave}>save</Button>
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
  outline: none;
`;
