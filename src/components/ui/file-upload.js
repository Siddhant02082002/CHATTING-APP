"use client"
import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import "@uploadthing/react/styles.css";
export const FileUpload= ({endpoint,value, onChange}) => {
    const fileType = value?.split(".").pop();
    if(value && fileType !== "pdf"){
        return (
            <div className="relative h-20 w-20">
                <Image fill src={value} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="Upload" className="rounded-full"/>
                <button className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm" onClick={()=>onChange()}><X className="h-4 w-4"/></button>
            </div>
        )
    }
    return (
        <div>
            <UploadDropzone endpoint={endpoint} onClientUploadComplete={(res)=>onChange(res?.[0].url)} onUploadError={(error)=>{
                console.log(error)
            }}></UploadDropzone>
        </div>
    );
}