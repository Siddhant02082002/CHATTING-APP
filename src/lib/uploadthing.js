import { generateComponents } from "@uploadthing/react";
 
import { OurFileRouter } from "@/app/api/uploadthing/core";
  
// import { OurFileRouter } from "~/app/api/uploadthing/core";
export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents(OurFileRouter);

// module.exports = { UploadButton, UploadDropzone, Uploader };
