import styled from "@emotion/styled";
import {DeleteSvg, LinkSvg} from "../../assets/svgs";
import {useCallback} from "react";
import {deleteDocument} from "../../firebase/collections/documentCollection";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  opened: boolean;
  x: number;
  y: number;
  documentId: string;
}

export default function ListItemContextMenu({opened, x, y, documentId}: Props) {
  const router = useRouter();

  const handleDelete = useCallback(async () => {
    await deleteDocument(documentId);
    router.replace(router.asPath);
  }, [documentId, router]);

  const handleCopyLink = useCallback(() => {
    const pageLink = window.location.href + `pages/${documentId}`;
    navigator.clipboard.writeText(pageLink)
      .then(() => {
        toast('link copied!', {
          hideProgressBar: true,
          autoClose: 3000,
          closeButton: false,
          position: "bottom-center",
          style: {
            fontSize: '1.5rem',
            width: 'fit-content',
            margin: '0 auto'
          },
          theme: "dark"
        });
      });
  }, [documentId]);

  if (!opened) return null;

  return (
    <Wrapper style={{left: x, top: y + window.scrollY}}>
      <Button isWarning onClick={handleDelete}><DeleteSvg/>delete</Button>
      <Button onClick={handleCopyLink}><LinkSvg/>copy link</Button>
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
  box-shadow: 0 1px 2px rgba(0,0,0,0.07),
  0 2px 4px rgba(0,0,0,0.07),
  0 4px 8px rgba(0,0,0,0.07),
  0 8px 16px rgba(0,0,0,0.07),
  0 16px 32px rgba(0,0,0,0.07),
  0 32px 64px rgba(0,0,0,0.07);
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
