import styled from "@emotion/styled";
import Image from "next/image";
import {Editor, EditorRef} from "editor";
import {useRef} from "react";

export default function Page() {
  const ref = useRef<EditorRef | null>(null);

  return (
    <>
      <Banner>
        <Image src={"/images/santorini.jpg"} alt={"santorini banner"} fill style={{objectFit: "cover"}}/>
      </Banner>
      <Wrapper>
        <Emoji>📄</Emoji>
        <Title onClick={() => {
          ref.current?.insertDivide()
        }}>Initial Page</Title>
        <EditorWrapper>
          <Editor placeholder={"Input Anything!"} ref={ref}/>
        </EditorWrapper>
      </Wrapper>
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
