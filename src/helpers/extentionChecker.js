import React from "react";

import XLSicon from "../img/fileIcons/xls.png";
import PDFicon from "../img/fileIcons/pdf.png";
import IMGicon from "../img/fileIcons/img.png";
import DOCicon from "../img/fileIcons/doc.png";
import PPTicon from "../img/fileIcons/ppt.png";
import ZIPicon from '../img/fileIcons/zip.png';

export default function checkFile(file) {
  let downloadFile = file.filename.split(".").pop();
  // console.log(downloadFile);

  const checkFileExtention = (extention, fileIcon) => {
    // console.log("extention", extention);
    return downloadFile === extention ? (
      // <div style={{ marginTop: "15px" }}>
      <img src={fileIcon} alt="" />
    ) : (
      //   <span style={{ color: "#000", marginLeft: "15px" }}>
      //     {file.display_name !== ""
      //       ? file.display_name
      //       : file.title}
      //   </span>
      // </div>
      ""
    );
  };

  switch (downloadFile) {
    case "xls":
      return checkFileExtention("xls", XLSicon);
    case "xlsx":
      return checkFileExtention("xlsx", XLSicon);
    case "pdf":
      return checkFileExtention("pdf", PDFicon);
    case "png":
      return checkFileExtention("png", IMGicon);
    case "jpg":
      return checkFileExtention("jpg", IMGicon);
    case "jpeg":
      return checkFileExtention("jpeg", IMGicon);
    case "doc":
      return checkFileExtention("doc", DOCicon);
    case "docx":
      return checkFileExtention("docx", DOCicon);
    case "ppt":
      return checkFileExtention("ppt", PPTicon);
    case "pptx":
      return checkFileExtention("pptx", PPTicon);
      case "zip":
      return checkFileExtention("zip", ZIPicon);
      case "gzip":
      return checkFileExtention("gzip", ZIPicon);
    default:
      return;
  }
}
