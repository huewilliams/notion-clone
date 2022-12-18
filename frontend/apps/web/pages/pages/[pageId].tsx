import styled from "@emotion/styled";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <Banner>
        <Image src={"/images/city.jpg"} alt={"city"} fill style={{objectFit: "cover"}}/>
      </Banner>
    </>
  )
}

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  object-fit: cover;
`;
