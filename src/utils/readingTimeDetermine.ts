/**
 * The function returns how long (minutes, hours, ...) to read the entire post (text)
 */

export const readingTimeDetermine = (text: string): number => {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return readTime;
};
