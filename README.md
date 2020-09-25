# Reddit Web App 📘

The web app is built by React and Next.JS with Chakra-UI library.

### Agenda

### Server-side rendering with Next.js

me -> browse http://localhost:3000
-> next.js server
-> request graphql server (node.js) localhost:4000/graphql
-> next.js builds the HTML
-> next.js sends back to the client (your browser)

### How we create, save and render HTML of Rich Text Editor

In this project, we use Slate.JS, a tool allows us customize rich text editor.
It supports very good for React and TypeScript, you can check their official
docs to read the example code (using React hooks, TypeScript).

Back to our stacks, we use PostgreSQL as database. When people type in the
`Editable` box, we update the state (slate node) and convert the state into json
string. We store the JSON string into database.

When we need to display the content of the post, which has the rich text
content, we send a request (GET) to the server and receive the JSON string. We
parse the string and serialize them into HTML object (check for docs on
Slate.js). To render these HTML objects, we pass them into the
`dangerouslySetInnerHTML` attribute, you can also do with `react-html-parser` library.
