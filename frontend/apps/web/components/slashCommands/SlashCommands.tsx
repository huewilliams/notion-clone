import styled from "@emotion/styled";
import {InsertNodeCommand} from "editor";
import {useCallback, useEffect, useRef} from "react";

interface Props {
  show: boolean;
  rect: DOMRect | null;
  isSingle: boolean;
  insertNodeCommand?: (command: InsertNodeCommand) => void;
  close: () => void;
}

export default function SlashCommands({show, rect, isSingle, insertNodeCommand, close}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(() => {
    if (show) close();
  }, [close, show]);

  const handleCommand = (command: InsertNodeCommand) => {
    return () => {
      insertNodeCommand?.(command);
      close();
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', close);
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', close);
    }
  }, [close, handleClickOutside]);

  if (!show) return null;

  return (
    <Wrapper ref={ref} style={{top: rect?.top, left: (rect?.left ?? 0) - (isSingle ? 100 : 0)}}>
      <Button onClick={handleCommand('h1')}>
        <Title>Heading 1</Title>
        <Description>Big section heading.</Description>
      </Button>
      <Button onClick={handleCommand('h2')}>
        <Title>Heading 2</Title>
        <Description>Medium section heading.</Description>
      </Button>
      <Button onClick={handleCommand('h3')}>
        <Title>Heading 3</Title>
        <Description>Small section heading.</Description>
      </Button>
      <Button onClick={handleCommand('bulletedList')}>
        <Title>BulletedList</Title>
        <Description>Create a simple bulleted list.</Description>
      </Button>
      <Button onClick={handleCommand('numberedList')}>
        <Title>NumberedList</Title>
        <Description>Create a list with numbering.</Description>
      </Button>
      <Button onClick={handleCommand('divider')}>
        <Title>Divider</Title>
        <Description>Visually divide blocks.</Description>
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 2px;

  border: 1px solid #B4B4B4;
  border-radius: 4px;
  background: white;
`

const Button = styled.button`
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  
  &:hover {
   background: #EBEBEB; 
  }
`;

const Title = styled.p`
  font-size: 14px;
`;

const Description = styled.p`
  font-size: 12px;
  color: gray;
`;
