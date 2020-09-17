import React from "react";
import { Button } from "@chakra-ui/core";

import { CustomSlateEditor } from "../utils/customSlateEditor";

export const SlateToolbar = editor => {
	return (
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
	);
};
