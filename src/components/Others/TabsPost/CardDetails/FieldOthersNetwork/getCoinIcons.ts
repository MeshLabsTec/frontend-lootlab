type IconSource = {
  url: string;
  isLocal?: boolean;
};

export const staticIconUrls: Record<string, IconSource> = {
  BTC: { url: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png" },
  ETH: {
    url: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
  },
  SOL: {
    url: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png",
  },
  BNB: {
    url: "https://assets.coingecko.com/coins/images/825/thumb/bnb-icon2_2x.png",
  },
  MATIC: {
    url: "https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png",
  },
  AVAX: {
    url: "https://assets.coingecko.com/coins/images/12559/thumb/Avalanche_Circle_RedWhite_Trans.png",
  },
  ADA: {
    url: "https://assets.coingecko.com/coins/images/975/thumb/cardano.png",
  },
  DOT: {
    url: "https://assets.coingecko.com/coins/images/12171/thumb/polkadot.png",
  },
  ARB: {
    url: "https://assets.coingecko.com/coins/images/16547/thumb/photo_2023-03-29_21.47.00.jpeg",
  },
  IMX: {
    url: "https://assets.coingecko.com/coins/images/17233/thumb/immutableX-symbol-BLK-RGB.png",
  },
  RON: {
    url: "https://assets.coingecko.com/coins/images/20009/thumb/ronin.png",
  },
  PoP: {
    url: "https://assets.coingecko.com/coins/images/12998/thumb/wemixcoin_color_200.png",
  },
  TREASURE: {
    url: "https://assets.coingecko.com/coins/images/18623/thumb/magic.png",
  },
  WAX: { url: "/wax.webp", isLocal: true },
  TRX: {
    url: "https://assets.coingecko.com/coins/images/1094/thumb/tron-logo.png",
  },
  ENJ: {
    url: "/enjin.png",
    isLocal: true,
  },
  TON: {
    url: "https://assets.coingecko.com/coins/images/17980/thumb/ton_symbol.png",
  },
  APT: {
    url: "https://assets.coingecko.com/coins/images/26455/thumb/aptos_round.png",
  },
  WEMIX: {
    url: "https://assets.coingecko.com/coins/images/12998/thumb/wemixcoin_color_200.png",
  },
  XAYA: {
    url: "/xaya.webp",
    isLocal: true,
  },
  MARBLEX: {
    url: "/marblex.webp",
    isLocal: true,
  },
};

function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || "";
}

export async function getCoinIcons() {
  try {
    const processedIcons: Record<string, string> = {};

    for (const [symbol, source] of Object.entries(staticIconUrls)) {
      processedIcons[symbol] = source.url;
    }

    return processedIcons;
  } catch (error) {
    console.error("Erro ao obter ícones:", error);

    // Em caso de erro, retorna apenas as URLs sem processamento
    const fallbackIcons: Record<string, string> = {};
    for (const [symbol, source] of Object.entries(staticIconUrls)) {
      fallbackIcons[symbol] = source.url;
    }

    return fallbackIcons;
  }
}

export function getIconUrl(symbol: string): string {
  const source = staticIconUrls[symbol];
  if (!source) return "";

  if (source.isLocal) {
    return `${getBasePath()}${source.url}`;
  }

  return source.url;
}

export default getCoinIcons;
