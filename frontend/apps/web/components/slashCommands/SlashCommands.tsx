import styled from "@emotion/styled";
import {InsertNodeCommand} from "editor";
import React, {useCallback, useEffect, useRef, useState} from "react";

interface Props {
  show: boolean;
  rect: DOMRect | null;
  isSingle: boolean;
  insertNodeCommand?: (command: InsertNodeCommand) => void;
  close: () => void;
}

const COMMAND_ORDER: InsertNodeCommand[] = ['h1', 'h2', 'h3', 'bulletedList', 'numberedList', 'divider'];

const getNextCommand = (currentCommand: InsertNodeCommand) => {
  let index = COMMAND_ORDER.findIndex(command => command === currentCommand) + 1;
  if (index === COMMAND_ORDER.length) {
    index = 0;
  }
  return COMMAND_ORDER[index];
}

const getPrevCommand = (currentCommand: InsertNodeCommand) => {
  let index = COMMAND_ORDER.findIndex(command => command === currentCommand) - 1;
  if (index < 0) {
    index = COMMAND_ORDER.length - 1;
  }
  return COMMAND_ORDER[index];
}

export default function SlashCommands({show, rect, isSingle, insertNodeCommand, close}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [currentCommand, setCurrentCommand] = useState<InsertNodeCommand>('h1');

  const handleClickOutside = useCallback(() => {
    if (show) close();
  }, [close, show]);

  const handleCommand = useCallback((command: InsertNodeCommand) => {
      return () => {
          insertNodeCommand?.(command);
          close();
      }
  }, [close, insertNodeCommand]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!show) return;
    e.preventDefault();
    if (e.key === 'ArrowDown') {
      setCurrentCommand(getNextCommand(currentCommand));
      return;
    }
    if (e.key === 'ArrowUp') {
      setCurrentCommand(getPrevCommand(currentCommand));
      return;
    }
    if (e.key === 'Enter') {
      console.log('enter : ', currentCommand);
      handleCommand(currentCommand)();
      return;
    }
    close();
  }, [close, currentCommand, handleCommand, show]);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [close, handleClickOutside, handleKeyDown]);

  if (!show) return null;

  return (
    <Wrapper ref={ref} style={{top: rect?.top, left: (rect?.left ?? 0) - (isSingle ? 100 : 0)}}>
      <Button selected={currentCommand === 'h1'} onClick={handleCommand('h1')}>
        <Title>Heading 1</Title>
        <Description>Big section heading.</Description>
      </Button>
      <Button selected={currentCommand === 'h2'} onClick={handleCommand('h2')}>
        <Title>Heading 2</Title>
        <Description>Medium section heading.</Description>
      </Button>
      <Button selected={currentCommand === 'h3'} onClick={handleCommand('h3')}>
        <Title>Heading 3</Title>
        <Description>Small section heading.</Description>
      </Button>
      <Button selected={currentCommand === 'bulletedList'} onClick={handleCommand('bulletedList')}>
        <Title>BulletedList</Title>
        <Description>Create a simple bulleted list.</Description>
      </Button>
      <Button selected={currentCommand === 'numberedList'} onClick={handleCommand('numberedList')}>
        <Title>NumberedList</Title>
        <Description>Create a list with numbering.</Description>
      </Button>
      <Button selected={currentCommand === 'divider'} onClick={handleCommand('divider')}>
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

interface ButtonProps {
  selected: boolean;
}

const Button = styled.button<ButtonProps>`
  border: none;
  outline: none;
  background: ${(props) => props.selected ? '#EBEBEB' : 'none'};
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
