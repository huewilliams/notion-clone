import styled from "@emotion/styled";
import {useRouter} from "next/router";
import Image from "next/image";
import {useRef} from "react";
import {Editor, EditorRef} from "editor";
import {SlashCommands} from "../../components";
import {useSlashCommand} from "../../hooks";
import {saveDocument} from "../../firebase/collections/documentCollection";

export default function Page() {
  const ref = useRef<EditorRef | null>(null);
  const {handleSlashCommand, showSlashCommands, rect, isSingle, setShowSlashCommands} = useSlashCommand();
  const router = useRouter();

  const handleSaveDocument = () => {
    saveDocument({
      id: router.query.pageId as string,
      title: 'Initial Page',
      data: ref.current?.getData() ?? {}
    });
  }

  return (
    <>
      <Banner>
        <Image src={"/images/santorini.jpg"} alt={"santorini banner"} fill style={{objectFit: "cover"}}/>
      </Banner>
      <Wrapper>
        <Emoji>📄</Emoji>
        <Button onClick={handleSaveDocument}>save</Button>
        <Title>Initial Page</Title>
        <EditorWrapper>
          <Editor
            placeholder={"Input Anything!"}
            ref={ref}
            slashCommand={handleSlashCommand}
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

const Title = styled.h1`
  font-size: 5rem;
  font-weight: 600;
`;

const EditorWrapper = styled.div`
  font-size: 1.5rem;
`;

const Button = styled.button`
  outline: none;
`;
