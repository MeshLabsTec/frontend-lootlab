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
  RON: "https://assets.coingecko.com/coins/images/20009/thumb/ronin.png",
  PoP: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x5D858bcd53E085920620549214a8b27CE2f04670/logo.png",
};

export async function getCoinIcons() {
  try {
    // Retorna os ícones estáticos que já temos
    return staticIconUrls;
  } catch (error) {
    console.error("Erro ao obter ícones:", error);
    return staticIconUrls;
  }
}

export default getCoinIcons;
