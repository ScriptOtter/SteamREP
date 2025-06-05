import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  Strikethrough,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Editor } from "@tiptap/react";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      preesed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
    },
  ];

  return (
    <div className="border rounded-md p-1 mb-1 bg-slate-50 space-x-2 z-50">
      {Options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.preesed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
}

// import React, { useRef, useState } from "react";

// const TextEditor: React.FC = () => {
//   const [content, setContent] = useState<string>("");
//   const editorRef = useRef<HTMLDivElement | null>(null);
//   const lineBreakCount = useRef<number>(0);
//   const [textColor, setTextColor] = useState<string>("#ffffff");

//   const applyStyle = (style: string, value?: string) => {
//     if (editorRef.current) {
//       document.execCommand(style, false, value);
//       editorRef.current.focus();
//     }
//   };

//   const handleInput = () => {
//     if (editorRef.current) {
//       setContent(editorRef.current.innerHTML);
//     }
//   };

//   const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const color = event.target.value;
//     setTextColor(color);
//     applyStyle("foreColor", color);
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
//     if (event.key === "Enter") {
//       event.preventDefault(); // Предотвращаем стандартное поведение

//       console.log("ENTER - ", lineBreakCount.current);
//       if (lineBreakCount.current > 3) {
//         console.log();
//         alert("Достигнуто максимальное количество переходов на новую строку."); // Выводим сообщение
//       } else {
//         lineBreakCount.current += 1; // Увеличиваем счетчик на 1
//         document.execCommand("insertHTML", true, "<div><br>\n</div>"); // Вставляем новую строку
//       }
//     } else if (event.key === "Backspace") {
//       const currentContent = editorRef.current?.innerHTML || " ";
//       console.log(currentContent);
//       if (currentContent.includes("<div><br></div>")) {
//         lineBreakCount.current -= 1; // Уменьшаем счетчик при удалении пустой строки
//         console.log("BACKSPACE - ", lineBreakCount.current);
//       }
//     }
//   };

//   const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
//     const pastedData = event.clipboardData.getData("text/plain");
//     const pastedLineBreaks = (pastedData.match(/\n/g) || []).length;

//     if (lineBreakCount.current + pastedLineBreaks > 3) {
//       event.preventDefault(); // Предотвращаем вставку
//       alert("Нельзя вставлять текст с более чем 3 переносами строк."); // Выводим сообщение
//     } else {
//       lineBreakCount.current += pastedLineBreaks; // Обновляем счетчик переносов строк
//       console.log("PASTE - ", lineBreakCount.current);
//     }
//   };

//   return (
//     <div className="bg-gray-900 text-white p-4 rounded-lg">
//       <div className="flex space-x-2 mb-2">
//         <button
//           onClick={() => applyStyle("bold")}
//           className="p-2 bg-gray-700 rounded hover:bg-gray-600"
//         >
//           B
//         </button>
//         <button
//           onClick={() => applyStyle("italic")}
//           className="p-2 bg-gray-700 rounded hover:bg-gray-600"
//         >
//           I
//         </button>
//         <button
//           onClick={() => applyStyle("underline")}
//           className="p-2 bg-gray-700 rounded hover:bg-gray-600"
//         >
//           U
//         </button>

//         <select
//           value={textColor}
//           onChange={handleColorChange}
//           className="p-2 bg-gray-700 rounded hover:bg-gray-600"
//         >
//           <option value="#ffffff">Белый</option>
//           <option value="#FF0000">Красный</option>
//           <option value="#00FF00">Зеленый</option>
//           <option value="#0000FF">Синий</option>
//           <option value="#FFFF00">Желтый</option>
//           <option value="#800080">Фиолетовый</option>
//           <option value="#FFA500">Оранжевый</option>
//           <option value="#A52A2A">Коричневый</option>
//           <option value="#000000">Черный</option>
//         </select>
//       </div>
//       <div
//         ref={editorRef}
//         contentEditable
//         onInput={handleInput}
//         onKeyDown={handleKeyDown}
//         onPaste={handlePaste}
//         className="border border-gray-600 p-4 rounded-lg min-h-[200px] focus:outline-none"
//         style={{ backgroundColor: "#1f2937" }}
//       >
//         <h1 className="">Начните вводить текст...</h1>
//       </div>
//       <div className="bg-gray-900 text-white p-4 rounded-lg">
//         <div
//           className="content"
//           dangerouslySetInnerHTML={{ __html: content }}
//         />
//       </div>
//     </div>
//   );
// };

// export default TextEditor;
