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

### Yêu cầu hệ thống

#### 1.1 Yêu cầu bắt buộc

- Cho phép người dùng đăng nhập, đăng ký
- Cho phép người dùng đọc tất cả các bài viết của các thành viên khác
- Có tính năng theo dõi (subscribe/follow) và vote các bài viết
- Hệ thống có thể hiển thị nội dung (đã thu gọn) các bài viết tại trang chủ
- Cho phép người đăng nhập tạo bài viết mới
- Sử dụng session cookie để xác thực request ở client tới server
- Khung soạn thảo phải là một Rich Text Editor (WYSIWYG) - Sử dụng Slate.js
- Khung soạn thảo phải cho phép người dùng upload hình ảnh (cả dạng url và
  .png/.jpg...)
- updating...

#### 1.2 Yêu cầu không bắt buộc (Optional)

- Một news feed nhỏ dạng slider như Instagram cho phép người dùng tạo image và
  một đoạn status ngắn.
- Chỉ hiển thị những news feed từ những người dùng bạn đang theo dõi
-

#### Lưu trữ
