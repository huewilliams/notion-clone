import styled from "@emotion/styled";
import { Button } from "ui";

const StyledWrap = styled.div`
  color: red;
  background-color: red;
`;

export default function Web() {
  return (
    <StyledWrap>
      <h1>Web</h1>
      <Button />
    </StyledWrap>
  );
}
