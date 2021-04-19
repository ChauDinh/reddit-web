import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  postsByCreatorId?: Maybe<PaginatedPosts>;
  postsInFollowingPublications?: Maybe<PaginatedPosts>;
  postsByPublicationId?: Maybe<PaginatedPosts>;
  me?: Maybe<User>;
  getUserById?: Maybe<User>;
  subscribed?: Maybe<Array<Scalars['Float']>>;
  subscriber?: Maybe<Array<Scalars['Float']>>;
  comments?: Maybe<CommentResults>;
  categories?: Maybe<Array<Category>>;
  categoriesByCreatorId?: Maybe<Array<Category>>;
  category?: Maybe<Category>;
  sentMessages?: Maybe<Array<DirectMessage>>;
  receivedMessages?: Maybe<Array<DirectMessage>>;
  postCategories?: Maybe<Array<PostCategory>>;
  postCategoriesByPostId?: Maybe<Array<PostCategory>>;
  postCategoriesByCategoryId?: Maybe<Array<PostCategory>>;
  search?: Maybe<Array<PostCategory>>;
  publications: Array<Publication>;
  publicationById: CreatePublicationResponse;
  members: Array<Member>;
  meProfile?: Maybe<UserProfile>;
  profileById?: Maybe<UserProfile>;
  notificationByPostId: Array<PostNotification>;
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsByCreatorIdArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  creatorId: Scalars['Int'];
};


export type QueryPostsInFollowingPublicationsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostsByPublicationIdArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  publicationId: Scalars['Int'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int'];
};


export type QuerySubscribedArgs = {
  subscriberId: Scalars['Int'];
};


export type QuerySubscriberArgs = {
  subscribedId: Scalars['Int'];
};


export type QueryCommentsArgs = {
  postId: Scalars['Float'];
};


export type QueryCategoriesByCreatorIdArgs = {
  id: Scalars['Float'];
};


export type QueryCategoryArgs = {
  id: Scalars['Float'];
};


export type QueryPostCategoriesByPostIdArgs = {
  postId: Scalars['Float'];
};


export type QueryPostCategoriesByCategoryIdArgs = {
  categoryId: Scalars['Float'];
};


export type QuerySearchArgs = {
  tokens: Scalars['String'];
};


export type QueryPublicationByIdArgs = {
  publicationId: Scalars['Float'];
};


export type QueryMembersArgs = {
  publicationId: Scalars['Float'];
};


export type QueryProfileByIdArgs = {
  userId: Scalars['Float'];
};


export type QueryNotificationByPostIdArgs = {
  postId: Scalars['Float'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
  points: Scalars['Float'];
  creatorId: Scalars['Float'];
  publicationId?: Maybe<Scalars['String']>;
  creator: User;
  voteStatus?: Maybe<Scalars['Int']>;
  postCategories?: Maybe<Array<PostCategory>>;
  comments: Comment;
  isPublic: Scalars['Boolean'];
  viewed: Scalars['Float'];
  min: Scalars['Float'];
  publication: Publication;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type PostCategory = {
  __typename?: 'PostCategory';
  categoryId: Scalars['Float'];
  postId: Scalars['Float'];
  category: Category;
  post: Post;
  postTitle: Scalars['String'];
  categoryTitle: Scalars['String'];
  categories: Category;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  creatorId: Scalars['Float'];
  point: Scalars['Float'];
  viewed?: Maybe<Scalars['Float']>;
  creator: User;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  text: Scalars['String'];
  points: Scalars['Float'];
  creatorId: Scalars['Float'];
  postId: Scalars['Float'];
  commentCreator: User;
  commentPost: Post;
};

export type Publication = {
  __typename?: 'Publication';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  creatorId: Scalars['Float'];
  isPrivate?: Maybe<Scalars['Boolean']>;
  creator: User;
  posts: Array<Post>;
};

export type CommentResults = {
  __typename?: 'CommentResults';
  comments: Array<Comment>;
};

export type DirectMessage = {
  __typename?: 'DirectMessage';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  text: Scalars['String'];
  senderId: Scalars['Float'];
  receiverId: Scalars['Float'];
  viewed: Scalars['Float'];
  sender: User;
  receiver: User;
};

export type CreatePublicationResponse = {
  __typename?: 'CreatePublicationResponse';
  errors?: Maybe<Array<CreatePublicationFieldError>>;
  publication?: Maybe<Publication>;
};

export type CreatePublicationFieldError = {
  __typename?: 'CreatePublicationFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Member = {
  __typename?: 'Member';
  userId: Scalars['Float'];
  publicationId: Scalars['Float'];
  publication: Publication;
  user: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type UserProfile = {
  __typename?: 'UserProfile';
  id: Scalars['Float'];
  userId: Scalars['Float'];
  status?: Maybe<Scalars['String']>;
  nation?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
  viewed?: Maybe<Scalars['Float']>;
  isPremium: Scalars['Boolean'];
  avatarUrl?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  user: User;
};

export type PostNotification = {
  __typename?: 'PostNotification';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  message: Scalars['String'];
  isRead: Scalars['Boolean'];
  postId: Scalars['Float'];
  userId: Scalars['Float'];
  post: Post;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: CreatePostResponse;
  updatePost: CreatePostResponse;
  deletePost: Scalars['Boolean'];
  vote: Scalars['Boolean'];
  register: UserResponse;
  login?: Maybe<UserResponse>;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  subscribe: Scalars['Boolean'];
  createComment: Comment;
  deleteComment: Scalars['Boolean'];
  createCategory: Category;
  deleteCategory: Scalars['Boolean'];
  createMessage: DirectMessage;
  deleteMessage: Scalars['Boolean'];
  createPostCategory: Scalars['Boolean'];
  createStory: Story;
  deleteStory: Scalars['Boolean'];
  createPublication: CreatePublicationResponse;
  createMember: Scalars['Boolean'];
  createUserCategory: Scalars['Boolean'];
  updateProfile: Scalars['Boolean'];
  uploadAvatar: Scalars['Boolean'];
  createNotification: PostNotification;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationUpdatePostArgs = {
  text: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSubscribeArgs = {
  subscribedId: Scalars['Int'];
};


export type MutationCreateCommentArgs = {
  input: CommentInput;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['Float'];
};


export type MutationCreateCategoryArgs = {
  title: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['Float'];
};


export type MutationCreateMessageArgs = {
  text: Scalars['String'];
  receiverId: Scalars['Float'];
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['Float'];
};


export type MutationCreatePostCategoryArgs = {
  creator: Scalars['String'];
  categoryTitle: Scalars['String'];
  postTitle: Scalars['String'];
  categoryId: Scalars['Float'];
  postId: Scalars['Float'];
};


export type MutationCreateStoryArgs = {
  url?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};


export type MutationDeleteStoryArgs = {
  storyId: Scalars['Float'];
};


export type MutationCreatePublicationArgs = {
  isPrivate?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
};


export type MutationCreateMemberArgs = {
  publicationId: Scalars['Float'];
};


export type MutationCreateUserCategoryArgs = {
  categoryId: Scalars['Float'];
};


export type MutationUpdateProfileArgs = {
  options: UserProfileInput;
};


export type MutationUploadAvatarArgs = {
  picture: Scalars['Upload'];
};


export type MutationCreateNotificationArgs = {
  postId: Scalars['Float'];
  message: Scalars['String'];
};

export type CreatePostResponse = {
  __typename?: 'CreatePostResponse';
  errors?: Maybe<Array<CreatePostFieldError>>;
  post?: Maybe<Post>;
};

export type CreatePostFieldError = {
  __typename?: 'CreatePostFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type PostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
  publicationId?: Maybe<Scalars['Float']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<RegisterFieldError>>;
  user?: Maybe<User>;
};

export type RegisterFieldError = {
  __typename?: 'RegisterFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type LoginInput = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type CommentInput = {
  text: Scalars['String'];
  postId: Scalars['Float'];
};

export type Story = {
  __typename?: 'Story';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  creatorId: Scalars['Float'];
  creator: User;
};

export type UserProfileInput = {
  status?: Maybe<Scalars['String']>;
  nation?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
};


export type PostSnippetFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'text' | 'points' | 'creatorId' | 'voteStatus' | 'isPublic' | 'viewed'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type PublicationSnippetFragment = (
  { __typename?: 'Publication' }
  & Pick<Publication, 'id' | 'title' | 'creatorId' | 'createdAt' | 'updatedAt' | 'isPrivate'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'username'>
  ) }
);

export type RegularCreatePostFieldErrorFragment = (
  { __typename?: 'CreatePostFieldError' }
  & Pick<CreatePostFieldError, 'field' | 'message'>
);

export type RegularCreatePostResponseFragment = (
  { __typename?: 'CreatePostResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'CreatePostFieldError' }
    & RegularCreatePostFieldErrorFragment
  )>>, post?: Maybe<(
    { __typename?: 'Post' }
    & PostSnippetFragment
  )> }
);

export type RegularRegisterFieldErrorFragment = (
  { __typename?: 'RegisterFieldError' }
  & Pick<RegisterFieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'RegisterFieldError' }
    & RegularRegisterFieldErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type SinglePostSnippetFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'text' | 'points' | 'creatorId' | 'voteStatus' | 'isPublic' | 'viewed'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreateCategoryMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createCategory: (
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'title' | 'createdAt' | 'updatedAt'>
  ) }
);

export type CreateCommentMutationVariables = Exact<{
  input: CommentInput;
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'createdAt' | 'updatedAt' | 'text' | 'points' | 'creatorId'>
    & { commentCreator: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  ) }
);

export type CreateMemberMutationVariables = Exact<{
  publicationId: Scalars['Float'];
}>;


export type CreateMemberMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createMember'>
);

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'CreatePostResponse' }
    & RegularCreatePostResponseFragment
  ) }
);

export type CreatePostCategoryMutationVariables = Exact<{
  postId: Scalars['Float'];
  categoryId: Scalars['Float'];
  postTitle: Scalars['String'];
  categoryTitle: Scalars['String'];
  creator: Scalars['String'];
}>;


export type CreatePostCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createPostCategory'>
);

export type CreatePublicationMutationVariables = Exact<{
  title: Scalars['String'];
  isPrivate?: Maybe<Scalars['Boolean']>;
}>;


export type CreatePublicationMutation = (
  { __typename?: 'Mutation' }
  & { createPublication: (
    { __typename?: 'CreatePublicationResponse' }
    & { publication?: Maybe<(
      { __typename?: 'Publication' }
      & Pick<Publication, 'id' | 'title' | 'createdAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>, errors?: Maybe<Array<(
      { __typename?: 'CreatePublicationFieldError' }
      & Pick<CreatePublicationFieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type SubscribeMutationVariables = Exact<{
  subscribedId: Scalars['Int'];
}>;


export type SubscribeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'subscribe'>
);

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  text: Scalars['String'];
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost: (
    { __typename?: 'CreatePostResponse' }
    & RegularCreatePostResponseFragment
  ) }
);

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vote'>
);

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { categories?: Maybe<Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'title' | 'createdAt' | 'updatedAt' | 'viewed' | 'point'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )>> }
);

export type CategoryQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type CategoryQuery = (
  { __typename?: 'Query' }
  & { category?: Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'title'>
  )> }
);

export type CommentQueryVariables = Exact<{
  postId: Scalars['Float'];
}>;


export type CommentQuery = (
  { __typename?: 'Query' }
  & { comments?: Maybe<(
    { __typename?: 'CommentResults' }
    & { comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'createdAt' | 'text' | 'creatorId'>
      & { commentCreator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )> }
  )> }
);

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserByIdQuery = (
  { __typename?: 'Query' }
  & { getUserById?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'createdAt' | 'updatedAt'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type MembersQueryVariables = Exact<{
  publicationId: Scalars['Float'];
}>;


export type MembersQuery = (
  { __typename?: 'Query' }
  & { members: Array<(
    { __typename?: 'Member' }
    & Pick<Member, 'userId' | 'createdAt' | 'updatedAt' | 'publicationId'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )> }
);

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & SinglePostSnippetFragment
  )> }
);

export type PostCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type PostCategoriesQuery = (
  { __typename?: 'Query' }
  & { postCategories?: Maybe<Array<(
    { __typename?: 'PostCategory' }
    & Pick<PostCategory, 'postId' | 'categoryId'>
    & { post: (
      { __typename?: 'Post' }
      & Pick<Post, 'title' | 'viewed' | 'points'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    ), category: (
      { __typename?: 'Category' }
      & Pick<Category, 'title'>
    ) }
  )>> }
);

export type PostCategoriesByCategoryIdQueryVariables = Exact<{
  categoryId: Scalars['Float'];
}>;


export type PostCategoriesByCategoryIdQuery = (
  { __typename?: 'Query' }
  & { postCategoriesByCategoryId?: Maybe<Array<(
    { __typename?: 'PostCategory' }
    & { post: (
      { __typename?: 'Post' }
      & PostSnippetFragment
    ) }
  )>> }
);

export type PostCategoriesByPostIdQueryVariables = Exact<{
  postId: Scalars['Float'];
}>;


export type PostCategoriesByPostIdQuery = (
  { __typename?: 'Query' }
  & { postCategoriesByPostId?: Maybe<Array<(
    { __typename?: 'PostCategory' }
    & { categories: (
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'title'>
    ) }
  )>> }
);

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & PostSnippetFragment
    )> }
  ) }
);

export type GetPostsByCreatorIdQueryVariables = Exact<{
  creatorId: Scalars['Int'];
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetPostsByCreatorIdQuery = (
  { __typename?: 'Query' }
  & { postsByCreatorId?: Maybe<(
    { __typename?: 'PaginatedPosts' }
    & { posts: Array<(
      { __typename?: 'Post' }
      & PostSnippetFragment
    )> }
  )> }
);

export type PostsByPublicationIdQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  publicationId: Scalars['Int'];
}>;


export type PostsByPublicationIdQuery = (
  { __typename?: 'Query' }
  & { postsByPublicationId?: Maybe<(
    { __typename?: 'PaginatedPosts' }
    & { posts: Array<(
      { __typename?: 'Post' }
      & PostSnippetFragment
    )> }
  )> }
);

export type PostsInFollowingPublicationsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsInFollowingPublicationsQuery = (
  { __typename?: 'Query' }
  & { postsInFollowingPublications?: Maybe<(
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & PostSnippetFragment
    )> }
  )> }
);

export type PublicationByIdQueryVariables = Exact<{
  publicationId: Scalars['Float'];
}>;


export type PublicationByIdQuery = (
  { __typename?: 'Query' }
  & { publicationById: (
    { __typename?: 'CreatePublicationResponse' }
    & { publication?: Maybe<(
      { __typename?: 'Publication' }
      & PublicationSnippetFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'CreatePublicationFieldError' }
      & Pick<CreatePublicationFieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type PublicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicationsQuery = (
  { __typename?: 'Query' }
  & { publications: Array<(
    { __typename?: 'Publication' }
    & PublicationSnippetFragment
  )> }
);

export type SearchQueryVariables = Exact<{
  tokens: Scalars['String'];
}>;


export type SearchQuery = (
  { __typename?: 'Query' }
  & { search?: Maybe<Array<(
    { __typename?: 'PostCategory' }
    & Pick<PostCategory, 'postId' | 'categoryId'>
    & { post: (
      { __typename?: 'Post' }
      & PostSnippetFragment
    ), category: (
      { __typename?: 'Category' }
      & Pick<Category, 'title'>
    ) }
  )>> }
);

export type SubscribedQueryVariables = Exact<{
  subscriberId: Scalars['Int'];
}>;


export type SubscribedQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'subscribed'>
);

export type SubscriberQueryVariables = Exact<{
  subscribedId: Scalars['Int'];
}>;


export type SubscriberQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'subscriber'>
);

export const PublicationSnippetFragmentDoc = gql`
    fragment PublicationSnippet on Publication {
  id
  title
  creatorId
  creator {
    username
  }
  createdAt
  updatedAt
  isPrivate
}
    `;
export const RegularCreatePostFieldErrorFragmentDoc = gql`
    fragment RegularCreatePostFieldError on CreatePostFieldError {
  field
  message
}
    `;
export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  createdAt
  updatedAt
  title
  text
  points
  creatorId
  creator {
    id
    username
  }
  voteStatus
  isPublic
  viewed
}
    `;
export const RegularCreatePostResponseFragmentDoc = gql`
    fragment RegularCreatePostResponse on CreatePostResponse {
  errors {
    ...RegularCreatePostFieldError
  }
  post {
    ...PostSnippet
  }
}
    ${RegularCreatePostFieldErrorFragmentDoc}
${PostSnippetFragmentDoc}`;
export const RegularRegisterFieldErrorFragmentDoc = gql`
    fragment RegularRegisterFieldError on RegisterFieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularRegisterFieldError
  }
  user {
    ...RegularUser
  }
}
    ${RegularRegisterFieldErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const SinglePostSnippetFragmentDoc = gql`
    fragment SinglePostSnippet on Post {
  id
  createdAt
  updatedAt
  title
  text
  points
  creatorId
  creator {
    id
    username
  }
  voteStatus
  isPublic
  viewed
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($title: String!) {
  createCategory(title: $title) {
    id
    title
    createdAt
    updatedAt
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, baseOptions);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($input: CommentInput!) {
  createComment(input: $input) {
    id
    createdAt
    updatedAt
    text
    points
    creatorId
    commentCreator {
      username
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, baseOptions);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateMemberDocument = gql`
    mutation CreateMember($publicationId: Float!) {
  createMember(publicationId: $publicationId)
}
    `;
export type CreateMemberMutationFn = Apollo.MutationFunction<CreateMemberMutation, CreateMemberMutationVariables>;

/**
 * __useCreateMemberMutation__
 *
 * To run a mutation, you first call `useCreateMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMemberMutation, { data, loading, error }] = useCreateMemberMutation({
 *   variables: {
 *      publicationId: // value for 'publicationId'
 *   },
 * });
 */
export function useCreateMemberMutation(baseOptions?: Apollo.MutationHookOptions<CreateMemberMutation, CreateMemberMutationVariables>) {
        return Apollo.useMutation<CreateMemberMutation, CreateMemberMutationVariables>(CreateMemberDocument, baseOptions);
      }
export type CreateMemberMutationHookResult = ReturnType<typeof useCreateMemberMutation>;
export type CreateMemberMutationResult = Apollo.MutationResult<CreateMemberMutation>;
export type CreateMemberMutationOptions = Apollo.BaseMutationOptions<CreateMemberMutation, CreateMemberMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    ...RegularCreatePostResponse
  }
}
    ${RegularCreatePostResponseFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreatePostCategoryDocument = gql`
    mutation CreatePostCategory($postId: Float!, $categoryId: Float!, $postTitle: String!, $categoryTitle: String!, $creator: String!) {
  createPostCategory(postId: $postId, categoryId: $categoryId, postTitle: $postTitle, categoryTitle: $categoryTitle, creator: $creator)
}
    `;
export type CreatePostCategoryMutationFn = Apollo.MutationFunction<CreatePostCategoryMutation, CreatePostCategoryMutationVariables>;

/**
 * __useCreatePostCategoryMutation__
 *
 * To run a mutation, you first call `useCreatePostCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostCategoryMutation, { data, loading, error }] = useCreatePostCategoryMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      categoryId: // value for 'categoryId'
 *      postTitle: // value for 'postTitle'
 *      categoryTitle: // value for 'categoryTitle'
 *      creator: // value for 'creator'
 *   },
 * });
 */
export function useCreatePostCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostCategoryMutation, CreatePostCategoryMutationVariables>) {
        return Apollo.useMutation<CreatePostCategoryMutation, CreatePostCategoryMutationVariables>(CreatePostCategoryDocument, baseOptions);
      }
export type CreatePostCategoryMutationHookResult = ReturnType<typeof useCreatePostCategoryMutation>;
export type CreatePostCategoryMutationResult = Apollo.MutationResult<CreatePostCategoryMutation>;
export type CreatePostCategoryMutationOptions = Apollo.BaseMutationOptions<CreatePostCategoryMutation, CreatePostCategoryMutationVariables>;
export const CreatePublicationDocument = gql`
    mutation CreatePublication($title: String!, $isPrivate: Boolean) {
  createPublication(title: $title, isPrivate: $isPrivate) {
    publication {
      id
      title
      creator {
        username
      }
      createdAt
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreatePublicationMutationFn = Apollo.MutationFunction<CreatePublicationMutation, CreatePublicationMutationVariables>;

/**
 * __useCreatePublicationMutation__
 *
 * To run a mutation, you first call `useCreatePublicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePublicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPublicationMutation, { data, loading, error }] = useCreatePublicationMutation({
 *   variables: {
 *      title: // value for 'title'
 *      isPrivate: // value for 'isPrivate'
 *   },
 * });
 */
export function useCreatePublicationMutation(baseOptions?: Apollo.MutationHookOptions<CreatePublicationMutation, CreatePublicationMutationVariables>) {
        return Apollo.useMutation<CreatePublicationMutation, CreatePublicationMutationVariables>(CreatePublicationDocument, baseOptions);
      }
export type CreatePublicationMutationHookResult = ReturnType<typeof useCreatePublicationMutation>;
export type CreatePublicationMutationResult = Apollo.MutationResult<CreatePublicationMutation>;
export type CreatePublicationMutationOptions = Apollo.BaseMutationOptions<CreatePublicationMutation, CreatePublicationMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
  deletePost(id: $id)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(options: {usernameOrEmail: $usernameOrEmail, password: $password}) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(options: {username: $username, email: $email, password: $password}) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SubscribeDocument = gql`
    mutation Subscribe($subscribedId: Int!) {
  subscribe(subscribedId: $subscribedId)
}
    `;
export type SubscribeMutationFn = Apollo.MutationFunction<SubscribeMutation, SubscribeMutationVariables>;

/**
 * __useSubscribeMutation__
 *
 * To run a mutation, you first call `useSubscribeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeMutation, { data, loading, error }] = useSubscribeMutation({
 *   variables: {
 *      subscribedId: // value for 'subscribedId'
 *   },
 * });
 */
export function useSubscribeMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeMutation, SubscribeMutationVariables>) {
        return Apollo.useMutation<SubscribeMutation, SubscribeMutationVariables>(SubscribeDocument, baseOptions);
      }
export type SubscribeMutationHookResult = ReturnType<typeof useSubscribeMutation>;
export type SubscribeMutationResult = Apollo.MutationResult<SubscribeMutation>;
export type SubscribeMutationOptions = Apollo.BaseMutationOptions<SubscribeMutation, SubscribeMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: Int!, $title: String, $text: String!) {
  updatePost(id: $id, title: $title, text: $text) {
    ...RegularCreatePostResponse
  }
}
    ${RegularCreatePostResponseFragmentDoc}`;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, baseOptions);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($value: Int!, $postId: Int!) {
  vote(value: $value, postId: $postId)
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      value: // value for 'value'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, baseOptions);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const CategoriesDocument = gql`
    query Categories {
  categories {
    id
    title
    createdAt
    updatedAt
    creator {
      username
    }
    viewed
    point
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const CategoryDocument = gql`
    query Category($id: Float!) {
  category(id: $id) {
    title
  }
}
    `;

/**
 * __useCategoryQuery__
 *
 * To run a query within a React component, call `useCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCategoryQuery(baseOptions?: Apollo.QueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
        return Apollo.useQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, baseOptions);
      }
export function useCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          return Apollo.useLazyQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, baseOptions);
        }
export type CategoryQueryHookResult = ReturnType<typeof useCategoryQuery>;
export type CategoryLazyQueryHookResult = ReturnType<typeof useCategoryLazyQuery>;
export type CategoryQueryResult = Apollo.QueryResult<CategoryQuery, CategoryQueryVariables>;
export const CommentDocument = gql`
    query Comment($postId: Float!) {
  comments(postId: $postId) {
    comments {
      id
      createdAt
      text
      creatorId
      commentCreator {
        username
      }
    }
  }
}
    `;

/**
 * __useCommentQuery__
 *
 * To run a query within a React component, call `useCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentQuery(baseOptions?: Apollo.QueryHookOptions<CommentQuery, CommentQueryVariables>) {
        return Apollo.useQuery<CommentQuery, CommentQueryVariables>(CommentDocument, baseOptions);
      }
export function useCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentQuery, CommentQueryVariables>) {
          return Apollo.useLazyQuery<CommentQuery, CommentQueryVariables>(CommentDocument, baseOptions);
        }
export type CommentQueryHookResult = ReturnType<typeof useCommentQuery>;
export type CommentLazyQueryHookResult = ReturnType<typeof useCommentLazyQuery>;
export type CommentQueryResult = Apollo.QueryResult<CommentQuery, CommentQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: Int!) {
  getUserById(id: $id) {
    id
    username
    email
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, baseOptions);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, baseOptions);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MembersDocument = gql`
    query Members($publicationId: Float!) {
  members(publicationId: $publicationId) {
    user {
      username
    }
    userId
    createdAt
    updatedAt
    publicationId
  }
}
    `;

/**
 * __useMembersQuery__
 *
 * To run a query within a React component, call `useMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMembersQuery({
 *   variables: {
 *      publicationId: // value for 'publicationId'
 *   },
 * });
 */
export function useMembersQuery(baseOptions?: Apollo.QueryHookOptions<MembersQuery, MembersQueryVariables>) {
        return Apollo.useQuery<MembersQuery, MembersQueryVariables>(MembersDocument, baseOptions);
      }
export function useMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MembersQuery, MembersQueryVariables>) {
          return Apollo.useLazyQuery<MembersQuery, MembersQueryVariables>(MembersDocument, baseOptions);
        }
export type MembersQueryHookResult = ReturnType<typeof useMembersQuery>;
export type MembersLazyQueryHookResult = ReturnType<typeof useMembersLazyQuery>;
export type MembersQueryResult = Apollo.QueryResult<MembersQuery, MembersQueryVariables>;
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    ...SinglePostSnippet
  }
}
    ${SinglePostSnippetFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions?: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostCategoriesDocument = gql`
    query PostCategories {
  postCategories {
    postId
    categoryId
    post {
      title
      creator {
        username
      }
      viewed
      points
    }
    category {
      title
    }
  }
}
    `;

/**
 * __usePostCategoriesQuery__
 *
 * To run a query within a React component, call `usePostCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<PostCategoriesQuery, PostCategoriesQueryVariables>) {
        return Apollo.useQuery<PostCategoriesQuery, PostCategoriesQueryVariables>(PostCategoriesDocument, baseOptions);
      }
export function usePostCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostCategoriesQuery, PostCategoriesQueryVariables>) {
          return Apollo.useLazyQuery<PostCategoriesQuery, PostCategoriesQueryVariables>(PostCategoriesDocument, baseOptions);
        }
export type PostCategoriesQueryHookResult = ReturnType<typeof usePostCategoriesQuery>;
export type PostCategoriesLazyQueryHookResult = ReturnType<typeof usePostCategoriesLazyQuery>;
export type PostCategoriesQueryResult = Apollo.QueryResult<PostCategoriesQuery, PostCategoriesQueryVariables>;
export const PostCategoriesByCategoryIdDocument = gql`
    query PostCategoriesByCategoryId($categoryId: Float!) {
  postCategoriesByCategoryId(categoryId: $categoryId) {
    post {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __usePostCategoriesByCategoryIdQuery__
 *
 * To run a query within a React component, call `usePostCategoriesByCategoryIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostCategoriesByCategoryIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostCategoriesByCategoryIdQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function usePostCategoriesByCategoryIdQuery(baseOptions?: Apollo.QueryHookOptions<PostCategoriesByCategoryIdQuery, PostCategoriesByCategoryIdQueryVariables>) {
        return Apollo.useQuery<PostCategoriesByCategoryIdQuery, PostCategoriesByCategoryIdQueryVariables>(PostCategoriesByCategoryIdDocument, baseOptions);
      }
export function usePostCategoriesByCategoryIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostCategoriesByCategoryIdQuery, PostCategoriesByCategoryIdQueryVariables>) {
          return Apollo.useLazyQuery<PostCategoriesByCategoryIdQuery, PostCategoriesByCategoryIdQueryVariables>(PostCategoriesByCategoryIdDocument, baseOptions);
        }
export type PostCategoriesByCategoryIdQueryHookResult = ReturnType<typeof usePostCategoriesByCategoryIdQuery>;
export type PostCategoriesByCategoryIdLazyQueryHookResult = ReturnType<typeof usePostCategoriesByCategoryIdLazyQuery>;
export type PostCategoriesByCategoryIdQueryResult = Apollo.QueryResult<PostCategoriesByCategoryIdQuery, PostCategoriesByCategoryIdQueryVariables>;
export const PostCategoriesByPostIdDocument = gql`
    query PostCategoriesByPostId($postId: Float!) {
  postCategoriesByPostId(postId: $postId) {
    categories {
      id
      title
    }
  }
}
    `;

/**
 * __usePostCategoriesByPostIdQuery__
 *
 * To run a query within a React component, call `usePostCategoriesByPostIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostCategoriesByPostIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostCategoriesByPostIdQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostCategoriesByPostIdQuery(baseOptions?: Apollo.QueryHookOptions<PostCategoriesByPostIdQuery, PostCategoriesByPostIdQueryVariables>) {
        return Apollo.useQuery<PostCategoriesByPostIdQuery, PostCategoriesByPostIdQueryVariables>(PostCategoriesByPostIdDocument, baseOptions);
      }
export function usePostCategoriesByPostIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostCategoriesByPostIdQuery, PostCategoriesByPostIdQueryVariables>) {
          return Apollo.useLazyQuery<PostCategoriesByPostIdQuery, PostCategoriesByPostIdQueryVariables>(PostCategoriesByPostIdDocument, baseOptions);
        }
export type PostCategoriesByPostIdQueryHookResult = ReturnType<typeof usePostCategoriesByPostIdQuery>;
export type PostCategoriesByPostIdLazyQueryHookResult = ReturnType<typeof usePostCategoriesByPostIdLazyQuery>;
export type PostCategoriesByPostIdQueryResult = Apollo.QueryResult<PostCategoriesByPostIdQuery, PostCategoriesByPostIdQueryVariables>;
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    hasMore
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const GetPostsByCreatorIdDocument = gql`
    query GetPostsByCreatorId($creatorId: Int!, $limit: Int!, $cursor: String) {
  postsByCreatorId(creatorId: $creatorId, limit: $limit, cursor: $cursor) {
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __useGetPostsByCreatorIdQuery__
 *
 * To run a query within a React component, call `useGetPostsByCreatorIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsByCreatorIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsByCreatorIdQuery({
 *   variables: {
 *      creatorId: // value for 'creatorId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetPostsByCreatorIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsByCreatorIdQuery, GetPostsByCreatorIdQueryVariables>) {
        return Apollo.useQuery<GetPostsByCreatorIdQuery, GetPostsByCreatorIdQueryVariables>(GetPostsByCreatorIdDocument, baseOptions);
      }
export function useGetPostsByCreatorIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsByCreatorIdQuery, GetPostsByCreatorIdQueryVariables>) {
          return Apollo.useLazyQuery<GetPostsByCreatorIdQuery, GetPostsByCreatorIdQueryVariables>(GetPostsByCreatorIdDocument, baseOptions);
        }
export type GetPostsByCreatorIdQueryHookResult = ReturnType<typeof useGetPostsByCreatorIdQuery>;
export type GetPostsByCreatorIdLazyQueryHookResult = ReturnType<typeof useGetPostsByCreatorIdLazyQuery>;
export type GetPostsByCreatorIdQueryResult = Apollo.QueryResult<GetPostsByCreatorIdQuery, GetPostsByCreatorIdQueryVariables>;
export const PostsByPublicationIdDocument = gql`
    query PostsByPublicationId($limit: Int!, $cursor: String, $publicationId: Int!) {
  postsByPublicationId(limit: $limit, cursor: $cursor, publicationId: $publicationId) {
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __usePostsByPublicationIdQuery__
 *
 * To run a query within a React component, call `usePostsByPublicationIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsByPublicationIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsByPublicationIdQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      publicationId: // value for 'publicationId'
 *   },
 * });
 */
export function usePostsByPublicationIdQuery(baseOptions?: Apollo.QueryHookOptions<PostsByPublicationIdQuery, PostsByPublicationIdQueryVariables>) {
        return Apollo.useQuery<PostsByPublicationIdQuery, PostsByPublicationIdQueryVariables>(PostsByPublicationIdDocument, baseOptions);
      }
export function usePostsByPublicationIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsByPublicationIdQuery, PostsByPublicationIdQueryVariables>) {
          return Apollo.useLazyQuery<PostsByPublicationIdQuery, PostsByPublicationIdQueryVariables>(PostsByPublicationIdDocument, baseOptions);
        }
export type PostsByPublicationIdQueryHookResult = ReturnType<typeof usePostsByPublicationIdQuery>;
export type PostsByPublicationIdLazyQueryHookResult = ReturnType<typeof usePostsByPublicationIdLazyQuery>;
export type PostsByPublicationIdQueryResult = Apollo.QueryResult<PostsByPublicationIdQuery, PostsByPublicationIdQueryVariables>;
export const PostsInFollowingPublicationsDocument = gql`
    query PostsInFollowingPublications($limit: Int!, $cursor: String) {
  postsInFollowingPublications(limit: $limit, cursor: $cursor) {
    hasMore
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __usePostsInFollowingPublicationsQuery__
 *
 * To run a query within a React component, call `usePostsInFollowingPublicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsInFollowingPublicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsInFollowingPublicationsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsInFollowingPublicationsQuery(baseOptions?: Apollo.QueryHookOptions<PostsInFollowingPublicationsQuery, PostsInFollowingPublicationsQueryVariables>) {
        return Apollo.useQuery<PostsInFollowingPublicationsQuery, PostsInFollowingPublicationsQueryVariables>(PostsInFollowingPublicationsDocument, baseOptions);
      }
export function usePostsInFollowingPublicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsInFollowingPublicationsQuery, PostsInFollowingPublicationsQueryVariables>) {
          return Apollo.useLazyQuery<PostsInFollowingPublicationsQuery, PostsInFollowingPublicationsQueryVariables>(PostsInFollowingPublicationsDocument, baseOptions);
        }
export type PostsInFollowingPublicationsQueryHookResult = ReturnType<typeof usePostsInFollowingPublicationsQuery>;
export type PostsInFollowingPublicationsLazyQueryHookResult = ReturnType<typeof usePostsInFollowingPublicationsLazyQuery>;
export type PostsInFollowingPublicationsQueryResult = Apollo.QueryResult<PostsInFollowingPublicationsQuery, PostsInFollowingPublicationsQueryVariables>;
export const PublicationByIdDocument = gql`
    query PublicationById($publicationId: Float!) {
  publicationById(publicationId: $publicationId) {
    publication {
      ...PublicationSnippet
    }
    errors {
      field
      message
    }
  }
}
    ${PublicationSnippetFragmentDoc}`;

/**
 * __usePublicationByIdQuery__
 *
 * To run a query within a React component, call `usePublicationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicationByIdQuery({
 *   variables: {
 *      publicationId: // value for 'publicationId'
 *   },
 * });
 */
export function usePublicationByIdQuery(baseOptions?: Apollo.QueryHookOptions<PublicationByIdQuery, PublicationByIdQueryVariables>) {
        return Apollo.useQuery<PublicationByIdQuery, PublicationByIdQueryVariables>(PublicationByIdDocument, baseOptions);
      }
export function usePublicationByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicationByIdQuery, PublicationByIdQueryVariables>) {
          return Apollo.useLazyQuery<PublicationByIdQuery, PublicationByIdQueryVariables>(PublicationByIdDocument, baseOptions);
        }
export type PublicationByIdQueryHookResult = ReturnType<typeof usePublicationByIdQuery>;
export type PublicationByIdLazyQueryHookResult = ReturnType<typeof usePublicationByIdLazyQuery>;
export type PublicationByIdQueryResult = Apollo.QueryResult<PublicationByIdQuery, PublicationByIdQueryVariables>;
export const PublicationsDocument = gql`
    query Publications {
  publications {
    ...PublicationSnippet
  }
}
    ${PublicationSnippetFragmentDoc}`;

/**
 * __usePublicationsQuery__
 *
 * To run a query within a React component, call `usePublicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicationsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePublicationsQuery(baseOptions?: Apollo.QueryHookOptions<PublicationsQuery, PublicationsQueryVariables>) {
        return Apollo.useQuery<PublicationsQuery, PublicationsQueryVariables>(PublicationsDocument, baseOptions);
      }
export function usePublicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicationsQuery, PublicationsQueryVariables>) {
          return Apollo.useLazyQuery<PublicationsQuery, PublicationsQueryVariables>(PublicationsDocument, baseOptions);
        }
export type PublicationsQueryHookResult = ReturnType<typeof usePublicationsQuery>;
export type PublicationsLazyQueryHookResult = ReturnType<typeof usePublicationsLazyQuery>;
export type PublicationsQueryResult = Apollo.QueryResult<PublicationsQuery, PublicationsQueryVariables>;
export const SearchDocument = gql`
    query Search($tokens: String!) {
  search(tokens: $tokens) {
    postId
    categoryId
    post {
      ...PostSnippet
    }
    category {
      title
    }
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      tokens: // value for 'tokens'
 *   },
 * });
 */
export function useSearchQuery(baseOptions?: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, baseOptions);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, baseOptions);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
export const SubscribedDocument = gql`
    query Subscribed($subscriberId: Int!) {
  subscribed(subscriberId: $subscriberId)
}
    `;

/**
 * __useSubscribedQuery__
 *
 * To run a query within a React component, call `useSubscribedQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubscribedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribedQuery({
 *   variables: {
 *      subscriberId: // value for 'subscriberId'
 *   },
 * });
 */
export function useSubscribedQuery(baseOptions?: Apollo.QueryHookOptions<SubscribedQuery, SubscribedQueryVariables>) {
        return Apollo.useQuery<SubscribedQuery, SubscribedQueryVariables>(SubscribedDocument, baseOptions);
      }
export function useSubscribedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubscribedQuery, SubscribedQueryVariables>) {
          return Apollo.useLazyQuery<SubscribedQuery, SubscribedQueryVariables>(SubscribedDocument, baseOptions);
        }
export type SubscribedQueryHookResult = ReturnType<typeof useSubscribedQuery>;
export type SubscribedLazyQueryHookResult = ReturnType<typeof useSubscribedLazyQuery>;
export type SubscribedQueryResult = Apollo.QueryResult<SubscribedQuery, SubscribedQueryVariables>;
export const SubscriberDocument = gql`
    query Subscriber($subscribedId: Int!) {
  subscriber(subscribedId: $subscribedId)
}
    `;

/**
 * __useSubscriberQuery__
 *
 * To run a query within a React component, call `useSubscriberQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubscriberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscriberQuery({
 *   variables: {
 *      subscribedId: // value for 'subscribedId'
 *   },
 * });
 */
export function useSubscriberQuery(baseOptions?: Apollo.QueryHookOptions<SubscriberQuery, SubscriberQueryVariables>) {
        return Apollo.useQuery<SubscriberQuery, SubscriberQueryVariables>(SubscriberDocument, baseOptions);
      }
export function useSubscriberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubscriberQuery, SubscriberQueryVariables>) {
          return Apollo.useLazyQuery<SubscriberQuery, SubscriberQueryVariables>(SubscriberDocument, baseOptions);
        }
export type SubscriberQueryHookResult = ReturnType<typeof useSubscriberQuery>;
export type SubscriberLazyQueryHookResult = ReturnType<typeof useSubscriberLazyQuery>;
export type SubscriberQueryResult = Apollo.QueryResult<SubscriberQuery, SubscriberQueryVariables>;