/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-10-11 22:58:57
 * @LastEditTime: 2023-10-13 00:36:43
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \note-taking-app\src\views\view.tsx
 * 
 */
import React from "react";
import NotesItem from "./components/list-item";
import type { note, notes, handlers } from "@/types/types";
import NotesAPI from "@/api";
import "./view.less";
import { ExcelUtils } from 'excel-utils-bt'
interface NotesViewProps {
  handlers: handlers
  notes: notes
  activeNote?: note
}
export default function NotesView({ handlers, notes, activeNote }: NotesViewProps) {
  const { onNoteAdd } = handlers
  return (
    <div className="notes" style={{ height: window.innerHeight }}>
      <div className="notes__sidebar">
        <button className="notes__add" type="button" onClick={
          () => onNoteAdd()
        }>添加新的笔记 📒</button>
        <button className="notes__add" type="button" onClick={
          () => {
            // 1、新建一个 实例
            let el = new ExcelUtils('采购-拣货单')
            // 2、调用实例函数，向实例添加表和数据
            const notes = NotesAPI.getAllNotes();
            console.log(notes)
            const data: any[] = [...notes]
            el.addJsonToSheet('采购-拣货单', data)
            // 3、调用导出函数
            //  exportExcel()函数为异步调用，可用 el.exportExcel().then(res => {}).catch(err => {})
            el.exportExcel()
          }
        }>导出 📒</button>
        导入需要用到nodejs的XLSX插件，我实现过，可以提供源码，因为涉及到服务端不方便展示
      </div>
      <div className="notes__list" >
        {
          notes.length > 0 ? notes.map((item: note) =>
            <NotesItem key={`${item.id}`} active={activeNote && (activeNote.id === item.id)}
              note={item} handlers={handlers} />) : []
        }
      </div>


    </div>
  );
}
