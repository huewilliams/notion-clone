import styled from "@emotion/styled";
import Link from "next/link";
import {Icon} from "../../index";

interface Page {
  title: string;
  id: string;
}

interface Props {
  page: Page;
}

export default function PageListItem({page: {title, id}}: Props) {
  return (
    <Link href={`/pages/${id}`}>
      <Wrapper>
        <Icon iconName={"document"} width={20} height={20}/>
        <Title>{title}</Title>
      </Wrapper>
    </Link>
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
