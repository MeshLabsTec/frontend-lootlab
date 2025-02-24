import usePostStore from "@/stores/post.store";
import CardInfo from "../CardInfo";
import MarketInfo from "../MarketInfo";
import { formatCurrency } from "@/tools/formatCurrency";

function MarketInfoGrid() {
  const { post } = usePostStore();
  const launchInfo = post?.launchInfo;

  // Função auxiliar para converter valores com segurança
  const safeNumber = (value: any) => {
    if (value === undefined || value === null || value === "") return 0;
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  // Função para formatar o supply atual com base na categoria
  // const formatSupply = (value: any, category: string) => {
  //   const supply = safeNumber(value);
  //   if (supply === 0) return "";

  //   return category === "NFT Artes"
  //     ? formatCurrency(supply, category, true)
  //     : String(supply);
  // };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <CardInfo title="INFORMAÇÕES DE MERCADO">
        <div className="space-y-1">
          <MarketInfo title="Launch">
            <span>
              {launchInfo?.launchDate
                ? String(new Date(launchInfo.launchDate).getFullYear())
                : ""}
            </span>
          </MarketInfo>

          <MarketInfo title="Supply Atual">
            {launchInfo?.currentSupply}
          </MarketInfo>

          {post?.category === "NFT Jogos" && (
            <>
              <MarketInfo title="Market Cap">
                {formatCurrency(
                  safeNumber(launchInfo?.marketCap),
                  post.category,
                )}
              </MarketInfo>

              <MarketInfo title="Supply Total">
                {formatCurrency(
                  safeNumber(launchInfo?.totalSupply),
                  post.category,
                )}
              </MarketInfo>
            </>
          )}
        </div>
      </CardInfo>

      <CardInfo title="INFORMAÇÕES DE VENDA">
        <div className="space-y-1">
          <MarketInfo title="Private Sale">
            {formatCurrency(
              safeNumber(launchInfo?.privateSale),
              post?.category || "",
              true,
            )}
          </MarketInfo>

          <MarketInfo title="Public Sale">
            {formatCurrency(
              safeNumber(launchInfo?.publicSale),
              post?.category || "",
              true,
            )}
          </MarketInfo>
        </div>
      </CardInfo>
    </div>
  );
}

export default MarketInfoGrid;
