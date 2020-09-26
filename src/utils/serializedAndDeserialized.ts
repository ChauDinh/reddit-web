import { Node, Text } from "slate";
import escapeHTML from "escape-html";

// serialized function will takes a value and returns a string
export const serialized = (node: Node) => {
  if (Text.isText(node)) {
    if (node.code === true) {
      return `
								<pre style="white-space:pre-line;">
									<code>${node.text}</code>
								</pre>
						`;
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
    case "paragraph":
      return `<p style="margin-top: 5px; margin-bottom: 5px">${children}</p>`;
    case "heading":
      return `<h1 style="font-size:20px; font-weight:700; margin-top:20px">${children}</h1>`;
    case "numbered-list":
      return `<ol style="margin-left:2em; margin-bottom:5px">${children}</ol>`;
    case "list-item":
      return `<li style="margin-bottom:5px">${children}</li>`;
    case "bulleted-list":
      return `<ul style="margin-left:2em; margin-bottom:5px">${children}</ul>`;
    default:
      return children;
  }
};

// serialized function return text snippet
export const serializedSnippet = (nodes: Node[]) => {
  let result = nodes.map((node) => Node.string(node)).join("\n");
  return result.length < 100 ? result : result.slice(0, 100) + "...";
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
