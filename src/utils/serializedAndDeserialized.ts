import { Node, Text } from "slate";
import escapeHTML from "escape-html";
import { css } from "emotion";

const classNameCodeBlock = (leaf: any) => css`
  font-family: monospace;
  background: hsla(0, 0%, 100%, 0.5);
  white-space: pre-wrap;
  ${leaf.comment &&
  css`
    color: slategray;
  `}
  ${(leaf.operator || leaf.url) &&
  css`
    color: #9a6e3a;
  `}
  ${leaf.keyword &&
  css`
    color: #07a;
  `}
  ${(leaf.variable || leaf.regex) &&
  css`
    color: #e90;
  `}
  ${(leaf.number ||
    leaf.boolean ||
    leaf.tag ||
    leaf.constant ||
    leaf.symbol ||
    leaf.attr ||
    leaf.selector) &&
  css`
    color: #905;
  `}
  ${leaf.punctuation &&
  css`
    color: #999;
  `}
  ${(leaf.string || leaf.char) &&
  css`
    color: #690;
  `}
  ${(leaf.function || leaf.class) &&
  css`
    color: #dd4a68;
  `}
`;

// serialized function will takes a value and returns a string
export const serialized = (node: Node) => {
  if (Text.isText(node)) {
    if (node.code === true && node.text.length !== 0) {
      return `<span class=${classNameCodeBlock(node)}>${node.text}</span>`;
    }
    if (node.bold === true && node.italic === true && node.underline === true) {
      return `<strong><em style="text-decoration:underline">${node.text}</em></strong>`;
    }
    if (node.bold === true && node.italic === true) {
      return `<strong><em>${node.text}</em></strong>`;
    }
    if (node.bold === true && node.underline === true) {
      return `<strong style="text-decoration:underline">${node.text}</strong>`;
    }
    if (node.underline === true && node.italic === true) {
      return `<em style="text-decoration:underline">${node.text}</em>`;
    }
    if (node.bold === true) {
      return `<strong>${node.text}</strong>`;
    }
    if (node.italic === true) {
      return `<em>${node.text}</em>`;
    }
    if (node.underline === true) {
      return `<p style="text-decoration:underline">${node.text}</p>`;
    }
    return escapeHTML(node.text);
  }

  const children: any = node.children.map((n) => serialized(n)).join("");

  switch (node.type) {
    case "image": {
      console.log(node.url);
      return `<img style="width: 100%; margin-bottom: 20px; margin-top: 20px" src=${node.url} /> <div style="clear: both"></div>`;
    }
    case "link":
      return `<a style="text-decoration:underline; color:blue" target="__blank" href=${node.url}>${children}</a>`;
    case "paragraph":
      return `<p style="margin-top: 20px; margin-bottom: 20px">${children}</p>`;
    case "heading":
      return `<h1 style="font-size:22px; font-weight:700; margin-top:40px; margin-bottom:20px">${children}</h1>`;
    case "numbered-list":
      return `<ol style="margin-left:2em; margin-bottom:20px">${children}</ol>`;
    case "list-item": {
      console.log("List Item", children);
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
    text: result.length < 46 ? result : result.slice(0, 46) + "...",
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
