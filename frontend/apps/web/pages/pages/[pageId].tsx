import styled from "@emotion/styled";
import {useRouter} from "next/router";
import Image from "next/image";
import {GetServerSideProps} from "next";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Editor, EditorRef} from "editor";
import {SlashCommands, EmojiPicker} from "../../components";
import {useSlashCommand} from "../../hooks";
import {DocumentCollection, saveDocument} from "../../firebase/collections/documentCollection";
import axios from "axios";
import useDocumentStore from "../../store/documentStore";
import {debounce} from "lodash";
import ChangeBannerImageModal from "../../components/changeBannerImageModal/ChangeBannerImageModal";
import {EmojiClickData} from "emoji-picker-react";

interface Props {
  data: DocumentCollection | null;
}

const BANNER_BOX_HEIGHT = 200;

export default function Page({data}: Props) {
  const ref = useRef<EditorRef | null>(null);
  const {handleSlashCommand, showSlashCommands, rect, isSingle, setShowSlashCommands} = useSlashCommand();
  const router = useRouter();
  const {document, updateTitle, setDocument, updateBannerPosition, updateEmoji} = useDocumentStore((state) => state);
  const {title, bannerUrl, bannerPosition, emoji} = document;
  const [changeBannerImageModalOpened, setChangeBannerImageModalOpened] = useState(false);
  const [isRepositionMode, setIsRepositionMode] = useState(false);
  const [bottom, setBottom] = useState(bannerPosition);
  const [y, setY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const bannerRef = useRef<HTMLImageElement | null>(null);
  const [bannerMaxHeight, setBannerMaxHeight] = useState(0);

  const handleDocumentSave = useCallback(() => {
    saveDocument({
      id: router.query.pageId as string,
      title,
      data: ref.current?.getData() ?? {},
      bannerUrl,
      bannerPosition,
      emoji,
    });
  }, [bannerPosition, bannerUrl, emoji, router.query.pageId, title]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTitle(e.target.value);
  }

  const mouseMoveHandler = useCallback((e: MouseEvent) => {
    if (!isDragging || e.clientX === 0) return;
    const dy = e.clientY - y;
    if (bottom + dy > 0 && (bottom + dy + BANNER_BOX_HEIGHT) < bannerMaxHeight) {
      setBottom(bottom + dy);
    }
    setY(e.clientY);
  }, [bannerMaxHeight, bottom, isDragging, y])

  const mouseUpHandler = useCallback((e: MouseEvent) => {
    if (isRepositionMode && isDragging) {
      setIsDragging(false);
    }
  }, [isDragging, isRepositionMode]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setY(e.clientY);
    setBannerMaxHeight(bannerRef.current?.getBoundingClientRect().height ?? 0);
    setIsDragging(true);
  }

  const handleSavePosition = useCallback(() => {
        updateBannerPosition(bottom);
        setIsRepositionMode(false);
      }
  , [bottom, updateBannerPosition]);

  const handleEmojiClick = useCallback((emojiClickDate: EmojiClickData) => {
    updateEmoji(emojiClickDate.emoji);
  }, [updateEmoji]);

  useEffect(() => {
    updateTitle(data?.title ?? "Untitled");
  }, [data?.title, updateTitle]);

  useEffect(() => {
    if (data) {
      setDocument(data);
    }
  }, [data, setDocument]);

  useEffect(() => {
    const handler = debounce(handleDocumentSave, 300);
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    }
  }, [handleDocumentSave]);

  useEffect(() => {
    const handler = debounce(handleDocumentSave, 300);
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    }
  }, [handleDocumentSave]);

  useEffect(() => {
    if (isDragging && isRepositionMode) {
      window.addEventListener('mouseup', mouseUpHandler);
      window.addEventListener('mousemove', mouseMoveHandler);
    } else {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    }
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    }
  }, [isDragging, isRepositionMode, mouseMoveHandler, mouseUpHandler]);

  useEffect(() => {
    setBottom(bannerPosition);
  }, [bannerPosition]);

  return (
      <>
        <Banner>
          <Image
              ref={bannerRef}
              src={document.bannerUrl}
              alt={"santorini banner"}
              width={0}
              height={0}
              sizes={'100vw'}
              style={{position: "absolute", width: '100%', minHeight: '200px', cursor: isRepositionMode ? 'move' : 'default', bottom: -bottom}}
              onMouseDown={handleMouseDown}
              draggable={false}
          />
          {isRepositionMode && (
              <SavePositionButton onClick={handleSavePosition}>
                Save position
              </SavePositionButton>
          )}
          {!isRepositionMode && (
              <ChangeCoverButton
                  onClick={() => setChangeBannerImageModalOpened(!changeBannerImageModalOpened)}
              >
                Change cover
              </ChangeCoverButton>
          )}
          <ChangePositionButton
              onClick={e => {
                e.stopPropagation();
                if (!isRepositionMode) {
                  setIsRepositionMode(true);
                } else {
                  setBottom(bannerPosition);
                  setIsRepositionMode(false);
                }
              }}
          >
            {isRepositionMode ? "Cancel" : "Reposition"}
          </ChangePositionButton>
        </Banner>
        {changeBannerImageModalOpened && <ChangeBannerImageModal/>}
        <Wrapper>
          <EmojiPicker emoji={emoji} onEmojiClick={handleEmojiClick}/>
          <Title placeholder={"Untitled"} value={title} onChange={handleTitleChange}/>
          <EditorWrapper>
            <Editor
                placeholder={"Input Anything!"}
                ref={ref}
                slashCommand={handleSlashCommand}
                defaultState={data?.data}
            />
          </EditorWrapper>
        </Wrapper>
        <SlashCommands
            show={showSlashCommands}
            rect={rect}
            isSingle={isSingle}
            insertNodeCommand={ref.current?.insertNode}
            close={() => setShowSlashCommands(false)}
        />
      </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {pageId} = context.query;
  const res = await axios.get<{data: DocumentCollection}>(`/documents/${pageId}`);

  return {
    props: {
      data: res.status === 200 ? res.data : null
    }
  };
}

const Banner = styled.div`
  position: relative;
  overflow: hidden;
  user-select: none;
  width: 100%;
  height: 200px;
`;

const Wrapper = styled.div`
  padding: 60px 15%;
`;

const Title = styled.input`
  font-size: 5rem;
  font-weight: 600;
  outline: none;
  border: none;
`;

const EditorWrapper = styled.div`
  font-size: 1.5rem;
`;

const Button = styled.button`
  position: absolute;
  padding: 4px;
  outline: none;
  border: none;
  background: white;
  z-index: 100;
  bottom: 10px;
  cursor: pointer;
  color: #B4B4B4;

  &:hover {
    background: #EBEBEB;
  }
`;

const ChangeCoverButton = styled(Button)`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  right: 91px;
`;

const ChangePositionButton = styled(Button)`
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  right: 20px;
`;

const SavePositionButton = styled(Button)`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  right: 69px;
`;
