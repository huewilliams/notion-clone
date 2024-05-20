import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import {Icon} from "../../index";
import ListItemContextMenu from "../../listItemContextMenu/ListItemContextMenu";

interface Page {
  title: string;
  id: string;
}

interface Props {
  page: Page;
}

export default function PageListItem({page: {title, id}}: Props) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [contextMenuOpened, setContextMenuOpened] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0)

  const handleMouseDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    window.oncontextmenu = () => false;
    const isRightClick = e.button === 2;
    if (isRightClick) {
      e.preventDefault();
      divRef.current?.click();
      setContextMenuOpened(true);
      setClientX(e.clientX);
      setClientY(e.clientY);
    }
    setTimeout(() => window.oncontextmenu = () => true, 1000);
  }

  useEffect(() => {
    window.addEventListener('click', () => setContextMenuOpened(false));
  }, []);

  return (
    <div ref={divRef}>
      <Link href={`/pages/${id}`} onMouseDown={handleMouseDown}>
        <Wrapper>
          <Icon iconName={"document"} width={20} height={20}/>
          <Title>{title}</Title>
        </Wrapper>
      </Link>
      <ListItemContextMenu opened={contextMenuOpened} x={clientX} y={clientY}/>
    </div>
  )
}

const Wrapper = styled.div`
  display: flex;
  padding: 6px;

  border: 1px solid #B4B4B4;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.5rem;
  
  &:hover {
    background: #EBEBEB;
  }
`;

const Title = styled.div`
  margin-left: 6px;
`;
