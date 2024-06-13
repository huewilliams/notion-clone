import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import {useState} from "react";

const Picker = dynamic(
    () => {
        return import('emoji-picker-react');
    },
    {ssr: false}
)

export default function EmojiPicker() {
    const [pickerOpened, setPickerOpened] = useState(false);

    return (
        <>
            <EmojiButton onClick={() => setPickerOpened(!pickerOpened)}>
                📄
                <Picker style={{position: 'absolute', top: '100px'}} open={pickerOpened}/>
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
