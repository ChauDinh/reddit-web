import { Editor, Transforms, Text } from "slate";

export const CustomSlateEditor = {
	isBoldMarkActive(editor) {
		const [match] = Editor.nodes(editor, {
			match: n => n.bold === true,
			universal: true
		});
		return !!match;
	},

	isCodeBlockActive(editor) {
		const [match] = Editor.nodes(editor, {
			match: n => n.type === "code"
		});
		return !!match;
	},

	toggleBoldMark(editor) {
		const isActive = CustomSlateEditor.isBoldMarkActive(editor);
		Transforms.setNodes(
			editor,
			{ bold: isActive ? null : true },
			{ match: n => Text.isText(n), split: true }
		);
	},

	toggleCodeBlock(editor) {
		const isActive = CustomSlateEditor.isCodeBlockActive(editor);
		Transforms.setNodes(
			editor,
			{ type: isActive ? null : "code" },
			{ match: n => Editor.isBlock(editor, n) }
		);
	}
};
