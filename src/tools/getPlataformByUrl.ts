import type { TIcon } from "@/interfaces/types";

const platformIcons: { [key: string]: TIcon } = {
  "twitter.com": "twitter",
  "/x.com": "twitter",
  "discord.com": "discord",
  "discord.gg": "discord",
  "instagram.com": "instagram",
  "t.me": "telegram",
  "telegram.org": "telegram",
  "facebook.com": "facebook",
  "reddit.com": "reddit",
  "medium.com": "medium",
  "youtube.com": "youtube",
  whitepaper: "whitepaper",
  "coinmarketcap.com": "coinmarketcap",
};

function getPlataformByUrl(url: string): TIcon {
  let choicePlataform: TIcon = "globe";
  Object.keys(platformIcons).forEach((platformIcon) => {
    if (url.includes(platformIcon)) {
      choicePlataform = platformIcons[platformIcon] as TIcon;
    }
  });
  return choicePlataform;
}

export default getPlataformByUrl;
