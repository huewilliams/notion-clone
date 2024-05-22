import styled from "@emotion/styled";

export default function ChangeBannerImageModal() {
  return (
    <Wrapper>
      <Button>upload file</Button>
      <GuideText>Images wider than 1500 pixels work best.</GuideText>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  position: absolute;
  right: 124px;
  box-sizing: border-box;
  width: 400px;
  padding: 10px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0,0,0,0.11),
  0 2px 2px rgba(0,0,0,0.11),
  0 4px 4px rgba(0,0,0,0.11),
  0 8px 8px rgba(0,0,0,0.11),
  0 16px 16px rgba(0,0,0,0.11),
  0 32px 32px rgba(0,0,0,0.11);
`;

const Button = styled.button`
  width: 100%;
  padding: 4px 0;
  color: #4E4E4E;
  background: white;
  border: 1px solid #B4B4B4;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  &:hover {
    background: #EBEBEB;
  }
`;

const GuideText = styled.div`
  color: #6C6C6C;
  text-align: center;
`;
