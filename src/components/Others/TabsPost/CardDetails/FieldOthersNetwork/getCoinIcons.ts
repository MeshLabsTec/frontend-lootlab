export const staticIconUrls: Record<string, string> = {
  BTC: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
  ETH: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
  SOL: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png",
  BNB: "https://assets.coingecko.com/coins/images/825/thumb/bnb-icon2_2x.png",
  MATIC:
    "https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png",
  AVAX: "https://assets.coingecko.com/coins/images/12559/thumb/Avalanche_Circle_RedWhite_Trans.png",
  ADA: "https://assets.coingecko.com/coins/images/975/thumb/cardano.png",
  DOT: "https://assets.coingecko.com/coins/images/12171/thumb/polkadot.png",
  ARB: "https://assets.coingecko.com/coins/images/16547/thumb/photo_2023-03-29_21.47.00.jpeg",
  IMX: "https://assets.coingecko.com/coins/images/17233/thumb/immutableX-symbol-BLK-RGB.png",
  PoP: "https://assets.coingecko.com/coins/images/13080/thumb/pop_network.png",
};

export async function getCoinIcons() {
  try {
    return staticIconUrls;
  } catch (error) {
    console.error("Erro ao obter ícones:", error);
    return staticIconUrls;
  }
}

export default getCoinIcons;
