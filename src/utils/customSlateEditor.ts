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

	isItalicMarkActive(editor) {
		const [match] = Editor.nodes(editor, {
			match: n => n.italic === true,
			universal: true
		});
		return !!match;
	},

	isUnderlineActive(editor) {
		const [match] = Editor.nodes(editor, {
			match: n => n.underline === true,
			universal: true
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
	},

	toggleItalicMark(editor) {
		const isActive = CustomSlateEditor.isItalicMarkActive(editor);
		Transforms.setNodes(
			editor,
			{ italic: isActive ? null : true },
			{ match: n => Text.isText(n), split: true }
		);
	},

	toggleUnderlineMark(editor) {
		const isActive = CustomSlateEditor.isUnderlineActive(editor);
		Transforms.setNodes(
			editor,
			{ underline: isActive ? null : true },
			{ match: n => Text.isText(n), split: true }
		);
	}
};
