const defaultUrl = "https://www.redditstatic.com/avatars/avatar_default";
export const colors = [
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

export const backgroundUrl = [
  "https://res.cloudinary.com/dnlthcx1a/image/upload/v1616422016/crayon-waiting-3_xlr4rh.png",
  "https://res.cloudinary.com/dnlthcx1a/image/upload/v1616426043/pale-woman-works-with-computer_ki5dgy.png",
  "https://res.cloudinary.com/dnlthcx1a/image/upload/v1616426262/abstract-watching-animal-planet_c6k8gb.png",
  "https://res.cloudinary.com/dnlthcx1a/image/upload/v1616426101/urban-urban-line_zegmnh.png",
  "https://res.cloudinary.com/dnlthcx1a/image/upload/v1616426198/flame-space-adventures_xjxezf.png",
  "https://res.cloudinary.com/dnlthcx1a/image/upload/v1616426164/marginalia-artificial-intelligence-and-technologies_hh7zws.png",
  "https://res.cloudinary.com/dnlthcx1a/image/upload/v1616426233/crayon-2239_doipus.png",
  "https://res.cloudinary.com/dnlthcx1a/image/upload/v1616426371/pale-computer-technology_klhcos.png",
];

export const avatarUrlGenerator = (id: number) => {
  const style = (id % 20) + 1;
  const hex = id % 24;
  return defaultUrl + `_${style > 9 ? style : "0" + style}_${colors[hex]}.png`;
};
