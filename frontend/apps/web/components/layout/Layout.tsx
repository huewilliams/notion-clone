import {PropsWithChildren} from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import {useRouter} from "next/router";

export default function Layout({children}: PropsWithChildren) {
  const {pathname, asPath} = useRouter();
  const isInitialPage = pathname === "/pages/[pageId]";

  return (
    <>
      <Header>
        <Link href={`/`}>
          <LinkButton>
            📓 Notion Clone
          </LinkButton>
        </Link>
        {isInitialPage && (
          <>
            <Divider>/</Divider>
            <Link href={asPath}>
              <LinkButton>
                📄 Initial Page
              </LinkButton>
            </Link>
          </>
        )}
      </Header>
      <main>{children}</main>
    </>
  )
}

const Header = styled.div`
  display: flex;
  align-items: center;
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

const Divider = styled.div`
  padding: 0 4px;
`;
