import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import {useState} from "react";
import {MouseDownEvent} from "emoji-picker-react/src/config/config";

const Picker = dynamic(
    () => {
        return import('emoji-picker-react');
    },
    {ssr: false}
)

interface Props {
    emoji: string;
    onEmojiClick: MouseDownEvent;
}

export default function EmojiPicker({emoji, onEmojiClick}: Props) {
    const [pickerOpened, setPickerOpened] = useState(false);

    return (
        <>
            <EmojiButton onClick={() => setPickerOpened(!pickerOpened)}>
                {emoji}
                <Picker style={{position: 'absolute', top: '100px'}} open={pickerOpened} onEmojiClick={onEmojiClick}/>
            </EmojiButton>
        </>
    )
}

const EmojiButton = styled.button`
  position: absolute;
  user-select: none;
  top: 160px;

  font-size: 56px;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
`;
