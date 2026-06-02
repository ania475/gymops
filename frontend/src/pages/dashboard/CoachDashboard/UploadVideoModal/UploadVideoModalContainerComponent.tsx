import { useRef, useState } from "react";
import type { VideoContent } from "@/types";
import { DEFAULT_VISIBILITY, type Visibility } from "./constants";
import { createVideoContent } from "./utils";
import { UploadVideoModalPresentational } from "./UploadVideoModalPresentationalComponent";

type Props = {
  open: boolean;
  onClose: () => void;
  onUpload: (video: VideoContent) => void;
};

export function UploadVideoModalContainer({ open, onClose, onUpload }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(DEFAULT_VISIBILITY);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function reset() {
    setTitle("");
    setCategory("");
    setVisibility(DEFAULT_VISIBILITY);
    setFile(null);
    setError("");
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return setError("Title is required.");
    if (!category) return setError("Please select a category.");
    if (!file) return setError("Please select a video file.");
    onUpload(createVideoContent(title, category, visibility, file));
    reset();
    onClose();
  }

  return (
    <UploadVideoModalPresentational
      open={open}
      title={title}
      category={category}
      visibility={visibility}
      file={file}
      error={error}
      fileRef={fileRef}
      onTitleChange={setTitle}
      onCategoryChange={setCategory}
      onVisibilityChange={setVisibility}
      onFileChange={setFile}
      onClose={handleClose}
      onSubmit={handleSubmit}
      onFilePickerClick={() => fileRef.current?.click()}
    />
  );
}
