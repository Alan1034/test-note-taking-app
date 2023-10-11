import React from "react";
import type { note, noteId, title, updated, body } from "@/types/types";

interface NotesItemProps {
  id: noteId
  title: title
  body: body
  updated: updated
}
const MAX_BODY_LENGTH = 60;
export default function NotesItem({
  id, title, body, updated
}: NotesItemProps) {
  return (
    <div className="notes__list-item" data-note-id={id}>
      <div className="notes__small-title">{title}</div>
      <div className="notes__small-body">
        {body.substring(0, MAX_BODY_LENGTH)}
        {body.length > MAX_BODY_LENGTH ? "..." : ""}
      </div>
      <div className="notes__small-updated">
        {updated.toLocaleString(undefined, {
          // dateStyle: "full",
          // timeStyle: "short",
        })}
      </div>
    </div>
  )
}