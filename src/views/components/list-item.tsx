import React, { useRef, useState } from "react";
import type { note, handlers, title} from "@/types/types";
import "./list-item.less"
interface NotesItemProps {
  handlers: handlers
  note: note
  active?: Boolean
}
export default function NotesItem({
  note, handlers, active
}: NotesItemProps) {
  const { id, title: defTitle, body: defBody, updated } = note
  const { onNoteSelect, onNoteDelete, onNoteEdit, onNoteUnactive } = handlers
  const [title, setTitle] = useState<title>(defTitle)
  const [body, setBody] = useState<title>(defBody)
  const itemRef = useRef<any>(null);
  const editNote = () => {
    return <div className="notes__preview">
      <input className="notes__title" type="text" defaultValue={`${title}` || "新笔记..."}
        onChange={(e) => {
          setTitle(e.target.value)
        }} />
      <textarea className="notes__body" defaultValue={`${body}` || "编辑笔记..."}
        onChange={(e) => {
          setBody(e.target.value)
        }}
      ></textarea>
      <button className="notes__add" type="button" onClick={() => {
        if (!active) {
          return
        }
        const doSave = confirm("确认要保存该笔记吗?");
        if (!doSave) {
          setTitle(defTitle)
          setBody(defBody)
          setTimeout(() => {
            onNoteUnactive()
          }, 0);
          return
        }
        const updatedTitle = title.trim();
        const updatedBody = body.trim();
        onNoteEdit(updatedTitle, updatedBody);
        setTimeout(() => {
          onNoteUnactive()
        }, 0);

      }}>保存</button>
    </div>
  }
  const previewNote = () => {
    return <div>
      <div className="notes__small-title">
        {title}
      </div>
      <div className="notes__small-body">
        {body}
      </div>
      {updated ? <div className="notes__small-updated">
        {updated.toLocaleString(undefined, {
          // dateStyle: "full",
          // timeStyle: "short",
        })}
      </div> : []}
    </div>
  }

  return (
    <div className={`notes__list-item ${active ? "notes__list-item--selected" : ""}`} ref={itemRef} data-note-id={id}
      onClick={() => {
        onNoteSelect(id)
      }}
      onDoubleClick={() => {
        const doDelete = confirm("确认要删除该笔记吗?");
        if (doDelete) {
          onNoteDelete(id);
        }
      }}
    >
      {active ? editNote() : previewNote()}
    </div>
  )
}