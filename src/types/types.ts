/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-10-12 01:32:21
 * @LastEditTime: 2023-10-12 21:44:42
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \note-taking-app\src\types\types.ts
 * 
 */
export type noteId = String | Number
export type title = String
export type updated = string | number | Date
export type body = any
export interface note {
  id: noteId
  body: body
  title: title
  updated?: updated
}
export type notes = Array<note>

export interface handlers {
  onNoteAdd: Function
  onNoteSelect: Function
  onNoteDelete: Function
  onNoteEdit: Function
  onNoteUnactive: Function
}