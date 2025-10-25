import { List } from "@mui/material";
import React from "react";
import { PdfListItem } from "./PdfListItem";

interface PdfFile {
  name: string;
  path: string;
  size: number;
  sizeFormatted: string;
  createdAt: string;
  modifiedAt: string;
}

interface PdfListProps {
  files: PdfFile[];
  onView: (file: PdfFile) => void;
  onDownload: (file: PdfFile) => void;
}

export const PdfList: React.FC<PdfListProps> = ({
  files,
  onView,
  onDownload,
}) => {
  return (
    <List disablePadding>
      {files.map((file, index) => (
        <PdfListItem
          key={`${file.name}-${index}`}
          file={file}
          onView={onView}
          onDownload={onDownload}
        />
      ))}
    </List>
  );
};
