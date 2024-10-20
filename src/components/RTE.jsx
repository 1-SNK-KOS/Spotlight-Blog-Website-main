import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import credentials from '../conf/config'


export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Controller
        name={name || "content"}
        content_css={(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "")}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            apiKey={credentials.tinyMCEApiKey}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: window.matchMedia("(prefers-color-scheme: dark)").matches ? "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; background-color: black; }" : "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; }",
              skin: window.matchMedia("(prefers-color-scheme: dark)").matches ? "oxide-dark" : "",
              content_css: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "",
            }}
            onEditorChange={onChange}
          />
        )}
      />

    </div>
  )
}
