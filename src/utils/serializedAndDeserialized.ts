import { Node, Text } from "slate";
import escapeHTML from "escape-html";
import Prism from "prismjs";

// serialized function will takes a value and returns a string
export const serialized = (node: Node) => {
  if (Text.isText(node)) {
    if (node.code === true && node.text.length !== 0) {
      const highlightedCode = Prism.highlight(
        node.text,
        Prism.languages.javascript,
        "javascript"
      );
      return `<pre style="white-space:pre-wrap; background-color: rgba(26, 32, 44, 1); color: rgba(84, 152, 209, 1); font-family: monospace; overflow-x: scroll; max-width: 600px; scrollbar-width: none; font-size: 18px; font-weight: 600; padding: 0 10px; line-height: 30px">${highlightedCode}</pre>`;
    }
    if (node.bold === true && node.italic === true && node.underline === true) {
      return `<strong style="font-weight: 800; display: inline-block;"><em style="text-decoration:underline">${node.text}</em></strong>`;
    }
    if (node.bold === true && node.italic === true) {
      return `<strong style="font-weight: 800;"><em>${node.text}</em></strong>`;
    }
    if (node.bold === true && node.underline === true) {
      return `<strong style="text-decoration:underline; font-weight: 800; font-family: 'IBM Plex Serif'; display: inline-block;">${node.text}</strong>`;
    }
    if (node.underline === true && node.italic === true) {
      return `<em style="text-decoration:underline; display: inline-block;">${node.text}</em>`;
    }
    if (node.bold === true) {
      return `<strong style="font-weight: 800; font-size: 18px; margin-top: 10px; margin-bottom: 10px;">${node.text}</strong>`;
    }
    if (node.italic === true) {
      return `<em>${node.text}</em>`;
    }
    if (node.underline === true) {
      return `<p style="display: inline-block !important; text-decoration:underline">${node.text}</p>`;
    }
    return escapeHTML(node.text);
  }

  const children: any = node.children.map((n) => serialized(n)).join("");

  switch (node.type) {
    case "image": {
      return `<img style="width: 100%; margin-bottom: 20px; margin-top: 20px" src=${node.url} /> <div style="clear: both"></div>`;
    }
    case "link":
      return `<a style="text-decoration:underline; color:blue; word-break: break-word;" target="__blank" href=${node.url}>${children}</a>`;
    case "paragraph":
      return `<p style="text-align: justify; line-height: 36px">${children}</p>`;
    case "heading":
      return `<h1 style="font-size:22px; font-weight:800; margin-top:40px; margin-bottom:20px">${children}</h1>`;
    case "numbered-list":
      return `<ol style="margin-left:2em; margin-bottom:20px">${children}</ol>`;
    case "list-item": {
      return `<li style="margin-bottom:20px">${children}</li>`;
    }
    case "bulleted-list":
      return `<ul style="margin-left:2em; margin-bottom:20px">${children}</ul>`;
    default:
      return children;
  }
};

// serialized function return text snippet
export const serializedSnippet = (nodes: Node[]) => {
  let imgUrl: null | string = null;
  let result = nodes
    .map((node) => {
      if (imgUrl === null && node.type === "image") {
        imgUrl = node.url as string;
      }
      return Node.string(node);
    })
    .join("\n");
  return {
    text: result.length < 46 ? result : result.slice(0, 100) + "...",
    imgUrl,
  };
};

// deSerialized function will takes a string and returns a value
export const deSerialized = (str: string) => {
  // returns a value array of children
  return str.split("\n").map((line) => {
    return {
      children: [{ text: line }],
    };
  });
};
