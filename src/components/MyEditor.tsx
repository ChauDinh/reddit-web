import React, { useState, useMemo, useCallback } from "react";
import { Text, Editor, Node, createEditor, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { FaBold, FaCode, FaItalic, FaUnderline } from "react-icons/fa";
import { Button, Flex } from "@chakra-ui/core";

import { initialValue } from "../utils/slateInitialValue";
import { CustomSlateEditor } from "../utils/customSlateEditor";

const CodeElement = props => {
	return (
		<pre>
			<code
				style={{
					fontSize: "14px",
					backgroundColor: "#d9d9d9"
				}}
			>
				{props.children}
			</code>
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

const ItalicLeaf = props => {
	return <em {...props.attributes}>{props.children}</em>;
};

const Leaf = ({ attributes, children, leaf }) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}
	if (leaf.code) {
		children = <code>{children}</code>;
	}
	if (leaf.italic) {
		children = <em>{children}</em>;
	}
	if (leaf.underline) {
		children = <u>{children}</u>;
	}
	return <span {...attributes}>{children}</span>;
};

const DefaultElement = props => {
	return <p {...props.attributes}>{props.children}</p>;
};

export const MyEditor = () => {
	const [value, setValue] = useState<Node[]>(initialValue);
	const editor = useMemo(() => withReact(createEditor()), []);

	const renderLeaf = useCallback(props => {
		return <Leaf {...props} />;
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
			<Flex
				flexDirection="column"
				style={{
					width: "100%",
					minHeight: "350px"
				}}
			>
				<Flex
					style={{
						backgroundColor: "#fff",
						padding: "15px",
						borderBottom:
							"1px solid rgba(0, 0, 0, 0.1)",
						borderRadius: "3px 3px 0 0"
					}}
				>
					<Button
						variant="solid"
						variantColor="blue"
						size="xs"
						onMouseDown={event => {
							event.preventDefault();
							CustomSlateEditor.toggleBoldMark(
								editor
							);
						}}
						mr={2}
					>
						<FaBold />
					</Button>

					<Button
						variant="solid"
						variantColor="teal"
						size="xs"
						onMouseDown={event => {
							event.preventDefault();
							CustomSlateEditor.toggleCodeBlock(
								editor
							);
						}}
						mr={2}
					>
						<FaCode />
					</Button>

					<Button
						variant="solid"
						variantColor="teal"
						size="xs"
						onMouseDown={event => {
							event.preventDefault();
							CustomSlateEditor.toggleItalicMark(
								editor
							);
						}}
						mr={2}
					>
						<FaItalic />
					</Button>

					<Button
						variant="solid"
						variantColor="teal"
						size="xs"
						onMouseDown={event => {
							event.preventDefault();
							CustomSlateEditor.toggleUnderlineMark(
								editor
							);
						}}
						mr={2}
					>
						<FaUnderline />
					</Button>
				</Flex>
				<Editable
					renderLeaf={renderLeaf}
					placeholder="Enter some plain text..."
					renderElement={renderElement}
					style={{
						backgroundColor: "#fff",
						width: "100%",
						height: "100%",
						padding: "15px",
						borderRadius: "0px 0px 3px 3px"
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
			</Flex>
		</Slate>
	);
};
