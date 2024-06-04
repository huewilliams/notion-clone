import styled from "@emotion/styled";
import React from "react";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from "../../firebase";
import useDocumentStore from "../../store/documentStore";
import {saveDocument} from "../../firebase/collections/documentCollection";

export default function ChangeBannerImageModal() {
  const {document, updateBannerUrl} = useDocumentStore((state) => state);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    updateBannerUrl(url);
    saveDocument({...document, bannerUrl: url});
  }

  return (
    <Wrapper>
      <FileUploadLabel htmlFor="file">upload file</FileUploadLabel>
      <input onChange={handleFileChange} id={"file"} style={{width: 0, height: 0}} type={"file"}/>
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

const FileUploadLabel = styled.label`
  width: 100%;
  padding: 4px 0;
  color: #4E4E4E;
  background: white;
  border: 1px solid #B4B4B4;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: #EBEBEB;
  }
`;

const GuideText = styled.div`
  color: #6C6C6C;
  text-align: center;
`;
