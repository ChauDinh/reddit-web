import { Node, Text } from "slate";
import escapeHTML from "escape-html";

// serialized function will takes a value and returns a string
export const serialized = (node: Node) => {
  if (Text.isText(node)) {
    return escapeHTML(node.text);
  }

  const children: any = node.children.map((n) => serialized(n)).join("");

  switch (node.type) {
    case "paragraph":
      return `<p>${children}</p>`;
    case "heading":
      return `<h1 style="font-size:20px; font-weight:700">${children}</h1>`;
    case "numbered-list":
      return `<ol style="margin-left:2em">${children}</ol>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "bulleted-list":
      return `<ul style="margin-left:2em">${children}</ul>`;
    default:
      return children;
  }
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
