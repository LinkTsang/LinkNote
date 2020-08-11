import React, { createRef, useState, useEffect } from "react";
import "./editor.css";
import _ from "lodash";
import content from "*.html";

const initialLines = [
  "Hello WennyEditor",
  "Hello LinkNode",
  "Practice makes perfect",
];

const initialLineNumbers = _.range(1, initialLines.length + 1);

export function EditorView() {
  const [lineNumbers, setLineNumbers] = useState(initialLineNumbers);
  const [lines, setLines] = useState(initialLines);
  const contentRef = createRef<HTMLDivElement>();
  const inputTextAreaRef = createRef<HTMLTextAreaElement>();
  const textCursorRef = createRef<HTMLDivElement>();

  const handleLineChange = (event: React.FormEvent<HTMLDivElement>) => {
    console.log("handleLineChange");
    console.log(event.target);
  };

  const handleLineInput = (event: React.FormEvent<HTMLDivElement>) => {
    console.log(`handleLineInput:`);
    console.log(event.target);
  };

  const handleLineKeyUp = (event: React.FormEvent<HTMLDivElement>) => {
    console.log(`handleLineKeyUp:`);
    console.log(event.target);
  };

  const handleLineClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log(`handleLineClick:`);

    // const inputCursor = inputCursorRef.current!;
    // inputCursor.focus();
  };

  const handleLinesSelect = (
    element: React.SyntheticEvent<HTMLDivElement, Event>
  ) => {
    console.log("handleLinesSelect");
  };

  const handleLinesMouseUp = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    onCursorPositionChange(e.currentTarget);
  };

  const handleLinesMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.buttons & 1) {
      onCursorPositionChange(e.currentTarget);
    }
  };

  const handleLinesMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    onCursorPositionChange(e.currentTarget);
  };

  const handleLinesMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    onCursorPositionChange(e.currentTarget);
  };

  const handleLinesBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    onCursorPositionChange(e.currentTarget);
  };

  const onCursorPositionChange = (element: HTMLDivElement) => {
    const cursor = textCursorRef.current!;
    const inputTextArea = inputTextAreaRef.current!;

    const clientRect = element.getBoundingClientRect();
    const selection = window.getSelection();

    if (!selection) {
      return;
    }
    const anchorNode = selection.anchorNode;
    const focusNode = selection.focusNode;
    if (!anchorNode || !focusNode) {
      return;
    }
    const rangeCount = selection.rangeCount;
    const range = selection.getRangeAt(rangeCount - 1);
    const rects = range.getClientRects();

    console.debug(selection);
    console.debug(range);
    console.debug(rects);

    const position = anchorNode.compareDocumentPosition(focusNode);
    const cursorOffsetX =
      (anchorNode === focusNode &&
        selection.anchorOffset < selection.focusOffset) ||
      position & Node.DOCUMENT_POSITION_FOLLOWING
        ? rects[rects.length - 1].x + rects[rects.length - 1].width
        : rects[0].x;

    console.debug([clientRect.x, cursorOffsetX]);

    const focusElement = focusNode.parentElement!;
    const newTop = focusElement.offsetTop;
    const newLeft = cursorOffsetX - clientRect.x;
    cursor.style.top = `${newTop}px`;
    cursor.style.left = `${newLeft}px`;
    inputTextArea.style.top = `${newTop}px`;
    inputTextArea.style.left = `${newLeft}px`;
    inputTextArea.focus();
  };

  const Line = (props: { line: string }) => {
    return (
      <div
        className="editor-line"
        onChange={handleLineChange}
        onKeyUp={handleLineKeyUp}
        onInput={handleLineInput}
        onClick={handleLineClick}
      >
        <span>{props.line}</span>
      </div>
    );
  };

  const handleContentChange = (event: React.FormEvent<HTMLDivElement>) => {
    console.log("handleContentChange");
    console.log(event);

    let currentTarget = event.currentTarget;

    // let newLines: string[] = [];
    // for (let child of target.children) {
    //   const text = child.textContent ?? "";
    //   newLines.push(text);
    // }
    // setLines(newLines);
    const lineCount = Math.max(1, event.currentTarget.children.length);
    setLineNumbers(_.range(1, lineCount + 1));
  };

  const handleContentInput = (event: React.FormEvent<HTMLDivElement>) => {
    console.log(`handleContentInput:`);
    console.log(event);
  };

  const handleContentKeyUp = (event: React.FormEvent<HTMLDivElement>) => {
    console.log(`handleContentKeyUp:`);
    console.log(event);
  };

  const handleContentClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log("handleContentClick:");
  };

  const handleTextAreaInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    console.log(event.currentTarget.value);
    event.currentTarget.value = "";
  };

  useEffect(() => {
    const handler = setInterval(() => {
      const cursor = textCursorRef.current!;
      cursor.style.visibility =
        cursor.style.visibility === "inherit" ? "hidden" : "inherit";
    }, 500);
    return () => {
      clearInterval(handler);
    };
  });

  return (
    <div className="editor-container">
      <div className="editor-line-numbers">
        {lineNumbers.map((value, index) => {
          return (
            <div className="editor-line-number" key={index}>
              {value}
            </div>
          );
        })}
      </div>
      <div className="editor-content">
        <textarea
          ref={inputTextAreaRef}
          onInput={handleTextAreaInput}
          className="editor-input-textarea"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          role="textbox"
          wrap="off"
        />
        <div
          className="editor-lines"
          ref={contentRef}
          onChange={handleContentChange}
          onKeyUp={handleContentKeyUp}
          onInput={handleContentInput}
          onClick={handleContentClick}
          onMouseDown={handleLinesMouseDown}
          onMouseMove={handleLinesMouseMove}
          onMouseUp={handleLinesMouseUp}
          onMouseLeave={handleLinesMouseLeave}
          onBlur={handleLinesBlur}
          onSelect={handleLinesSelect}
        >
          {lines.map((value, index) => {
            return <Line key={lineNumbers[index]} line={value} />;
          })}
        </div>
        <div className="editor-cursor" ref={textCursorRef}></div>
      </div>
    </div>
  );
}