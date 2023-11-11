import {PropsWithChildren} from "react";
import styled from "@emotion/styled";
import Link from "next/link";

export default function Layout({children}: PropsWithChildren) {
  return (
    <>
      <Header>
        <Link href={`/`}>
          <LinkButton>
            📓 Notion Clone
          </LinkButton>
        </Link>
      </Header>
      <main>{children}</main>
    </>
  )
}

const Header = styled.div`
  padding: 16px;

  background: white;
`;

const LinkButton = styled.button`
  padding: 4px 6px;

  background: none;
  border: none;
  outline: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #EBEBEB;
  }
`;
