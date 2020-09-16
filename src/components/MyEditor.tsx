import React, { useMemo, useState } from "react";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor } from "slate";

interface Props {}

export const MyEditor: React.FC<Props> = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [
        {
          text: "A line of text in a paragraph.",
        },
      ],
    },
  ]);
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue as any)}
    >
      <Editable />
    </Slate>
  );
};
