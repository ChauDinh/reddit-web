const defaultUrl = "https://www.redditstatic.com/avatars/avatar_default";
const colors = [
  "A5A4A4",
  "545452",
  "A06A42",
  "C18D42",
  "FF4500",
  "FF8717",
  "FFB000",
  "FFD635",
  "DDBD37",
  "D4E815",
  "94E044",
  "46A508",
  "46D160",
  "0DD3BB",
  "25B79F",
  "008985",
  "24A0ED",
  "0079D3",
  "7193FF",
  "4856A3",
  "7E53C1",
  "FF66AC",
  "DB0064",
  "EA0027",
  "FF585B",
];

export const avatarUrlGenerator = (id: number) => {
  const style = (id % 20) + 1;
  const hex = (id % 25) + 1;
  return defaultUrl + `_${style > 9 ? style : "0" + style}_${colors[hex]}.png`;
};
