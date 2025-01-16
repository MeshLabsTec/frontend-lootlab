import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface TwitterFeedProps {
  twitterUrl: string; // O link do perfil do Twitter ou X
}

function TwitterFeed({ twitterUrl }: TwitterFeedProps) {
  useEffect(() => {
    // Adiciona o script do Twitter na página, se ainda não foi adicionado
    const twitterScript = document.getElementById("twitter-wjs");
    if (!twitterScript) {
      const script = document.createElement("script");
      script.id = "twitter-wjs";
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => {
        // Força o carregamento do widget após o script ser carregado
        setTimeout(() => {
          (window as any).twttr?.widgets?.load();
        }, 1000); // Espera 1 segundo antes de tentar carregar novamente
      };
      document.body.appendChild(script);
    } else {
      // Recarrega os widgets do Twitter, caso o script já exista
      setTimeout(() => {
        (window as any).twttr?.widgets?.load();
      }, 1000); // Espera 1 segundo antes de tentar carregar novamente
    }
  }, [twitterUrl]); // Atualiza sempre que a URL mudar

  // Corrige URLs de x.com para twitter.com
  const normalizeUrl = (url: string): string => {
    if (url.includes("x.com")) {
      return url.replace("x.com", "twitter.com");
    }
    return url;
  };

  const normalizedUrl = normalizeUrl(twitterUrl);

  // Valida o URL do Twitter
  const isValidTwitterUrl = (url: string): boolean => {
    return /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/.test(url);
  };

  if (!isValidTwitterUrl(normalizedUrl)) {
    return (
      <h1 className="text-xl text-white">
        URL inválida. Insira um link válido de perfil do Twitter.
      </h1>
    );
  }

  const twitterNamePage = normalizedUrl.split("/")[3];

  return (
    <div className="flex w-full flex-col gap-4">
      <Button className="bg-[#1d9bf0] hover:bg-[#3da6ec] md:w-fit">
        Twitter
      </Button>
      <a
        className="twitter-timeline data-height:h-full data-width:w-full text-xl text-white"
        href={normalizedUrl} // URL normalizada para twitter.com
        data-height="450"
        data-chrome="noheader nofooter noborders"
      >
        Carregando feed do {twitterNamePage}...
      </a>
    </div>
  );
}

export default TwitterFeed;
