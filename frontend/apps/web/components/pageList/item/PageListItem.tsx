import styled from "@emotion/styled";
import {Icon} from "../../index";

interface Page {
  title: string;
}

interface Props {
  page: Page;
}

export default function PageListItem({page: {title}}: Props) {
  return (
    <Wrapper>
      <Icon iconName={"document"} width={20} height={20}/>
      <Title>{title}</Title>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  padding: 6px;

  border: 1px solid #B4B4B4;
  border-radius: 6px;
  cursor: pointer;
  
  &:hover {
    background: #EBEBEB;
  }
`;

const Title = styled.div`
  margin-left: 6px;
`;
