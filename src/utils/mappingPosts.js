/**
 * This function will receive array of postCategories as input
 * and returns a new array with categories are grouped by postId
 */

export const mappingPosts = (inputs = []) => {
  if (inputs.length === 0) return inputs;

  let posts = new Map();

  for (let i = 0; i < inputs.length; i++) {
    if (posts.has(inputs[i].postId)) {
      posts.get(inputs[i].postId).categories.push(inputs[i].category.title);
    } else {
      posts.set(inputs[i].postId, {
        postTitle: inputs[i].post.title,
        viewed: inputs[i].post.viewed,
        points: inputs[i].post.points,
        creator: inputs[i].post.creator.username,
        categories: [inputs[i].category.title],
      });
    }
  }

  let results = [];

  for (let [key, value] of posts) {
    results.push({
      postId: key,
      postTitle: value.postTitle,
      viewed: value.viewed,
      points: value.points,
      creator: value.creator,
      categories: value.categories,
    });
  }

  return results;
};
