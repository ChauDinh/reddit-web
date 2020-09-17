import React, { useState, useMemo, useCallback } from "react";
import { Text, Editor, Node, createEditor, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Button } from "@chakra-ui/core";

import { initialValue } from "../utils/slateInitialValue";
import { CustomSlateEditor } from "../utils/customSlateEditor";

const CodeElement = props => {
	return (
		<pre>
			<code>{props.children}</code>
		</pre>
	);
};

const BoldLeaf = props => {
	return (
		<span
			{...props.attributes}
			style={{
				fontWeight: props.leaf.bold ? "bold" : "normal"
			}}
		>
			{props.children}
		</span>
	);
};

const DefaultElement = props => {
	return <p {...props.attributes}>{props.children}</p>;
};

export const MyEditor = () => {
	const [value, setValue] = useState<Node[]>(initialValue);
	const editor = useMemo(() => withReact(createEditor()), []);

	const renderLeaf = useCallback(props => {
		return <BoldLeaf {...props} />;
	}, []);

	const renderElement = useCallback(props => {
		switch (props.element.type) {
			case "code":
				return <CodeElement {...props} />;
			default:
				return <DefaultElement {...props} />;
		}
	}, []);
	return (
		<Slate
			editor={editor}
			value={value}
			onChange={value => setValue(value)}
		>
			<div>
				<Button
					onMouseDown={event => {
						event.preventDefault();
						CustomSlateEditor.toggleBoldMark(
							editor
						);
					}}
				>
					Bold
				</Button>

				<Button
					onMouseDown={event => {
						event.preventDefault();
						CustomSlateEditor.toggleCodeBlock(
							editor
						);
					}}
				>
					Code Block
				</Button>
			</div>
			<Editable
				renderLeaf={renderLeaf}
				placeholder="Enter some plain text..."
				renderElement={renderElement}
				style={{
					backgroundColor: "#EDF2F7",
					width: "100%",
					minHeight: "200px",
					padding: "15px",
					borderRadius: "3px"
				}}
				onKeyDown={event => {
					if (!event.ctrlKey) {
						return;
					}
					switch (event.key) {
						case "`": {
							event.preventDefault();
							CustomSlateEditor.toggleCodeBlock(
								editor
							);
							break;
						}

						case "b": {
							event.preventDefault();
							CustomSlateEditor.toggleBoldMark(
								editor
							);
							break;
						}
					}
				}}
			/>
		</Slate>
	);
};
