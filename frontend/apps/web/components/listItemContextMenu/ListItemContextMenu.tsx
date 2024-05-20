import styled from "@emotion/styled";
import {DeleteSvg, LinkSvg} from "../../assets/svgs";

interface Props {
  opened: boolean;
  x: number;
  y: number;
}

export default function ListItemContextMenu({opened, x, y}: Props) {
  if (!opened) return null;

  return (
    <Wrapper style={{left: x, top: y}}>
      <Button isWarning><DeleteSvg/>delete</Button>
      <Button><LinkSvg/>copy link</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: absolute;
  border-radius: 6px;
  border: 1px solid #B4B4B4;
  background-color: white;
  padding: 4px;
  font-size: 1.5rem;
`;

interface ButtonProps {
  isWarning?: boolean;
}

const Button = styled.button<ButtonProps>`
  display: flex;
  text-align: left;
  outline: none;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 200px;
  padding: 2px;

  &:hover {
    background: #EBEBEB;
    color: ${(props) => props.isWarning ? '#FD493F' : 'black'};

    > svg {
      fill: ${(props) => props.isWarning ? '#FD493F' : 'none'};
    }
  }
`;
