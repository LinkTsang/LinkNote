import "./index.css";
import { DrawBoard } from "./drawing/DrawBoard";
import { WennyEditor } from "./editor/editor";
console.log("Hello");

window.onload = () => {
  let drawBoard: DrawBoard;
  let editor: WennyEditor;

  const drawboardButton = document.getElementById("sidebar-drawboard")!;
  const editorButton = document.getElementById("sidebar-editor")!;

  const drawboardPage = document.getElementById("content-drawboard")!;
  const editorPage = document.getElementById("content-editor")!;

  const pageList = [drawboardPage, editorPage];

  let activatePage = (page: HTMLElement) => {
    for (let p of pageList) {
      p.style.display = "none";
    }
    page.style.display = "block";
  };

  drawboardButton.onclick = (ev) => {
    activatePage(drawboardPage);
    if (!drawBoard) {
      drawBoard = new DrawBoard(drawboardPage);
    }
  };

  editorButton.onclick = (ev) => {
    activatePage(editorPage);
    if (!editor) {
      editor = new WennyEditor(editorPage);
    }
  };

  drawboardButton.click();

  const sidebar = document.getElementsByClassName("sidebar")[0] as HTMLElement;
  const container = document.getElementsByClassName("container")[0] as HTMLDivElement;
};

