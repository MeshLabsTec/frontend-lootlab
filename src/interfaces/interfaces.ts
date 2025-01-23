/**
 * Interface genérica utilizada para definir a estrutura de informações de um card.
 *
 * @template T - O tipo genérico que representa o schema a ser utilizado para inferencia de tipos
 *
 * @property {string} title - O título exibido para o dado no card.
 * @property {keyof T} pathRegister - A chave do schema genérico `T` que será usada como referência para os dados
 *
 * @example
 * const FormSchema = z.object({
 *  title: z.string().min(1, "O título é obrigatório"),
 *  score: z.number().optional(),
 *  network: z.string().min(1, "A rede é obrigatória"),
 *  ...
 * })
 *
 * type FormData = z.infer<typeof FormSchema>;
 *
 * interface IInfosCard<T> {
 *  title: string;
 *  pathRegister: keyof T;
 * }
 *
 * const basicInfos: IInfosCard<FormData>[] = [
 *   { title: "Nome do Jogo", pathRegister: "title" },
 *   { title: "Nota", pathRegister: "score" },
 *   { title: "Rede", pathRegister: "network" },
 * ];
 */
export interface IInfosCard<T> {
  type?: "text" | "number";
  title: string;
  pathRegister: keyof T;
}

export interface IDataCreatePost {
  data: {
    postData: string; // JSON.stringify dos dados do post
    file: File; // O arquivo a ser enviado
  };
  authorizationToken: string;
  authorId: string;
}

export interface IDataUpdatePost {
  data: {
    postData?: string; // JSON.stringify dos dados do post
    file?: File; // O arquivo a ser enviado
  };
  authorizationToken: string;
  imageUrl?: string;
  authorId: string;
  postId: string;
}

export interface ILink {
  url: string;
}

export interface IProjectFeature {
  title: string;
  isFeature: boolean;
}

export interface ILaunchInfo {
  launchDate: string;
  marketCap: number;
  currentSupply: string;
  totalSupply: string;
  privateSale: number;
  publicSale: number;
}

export interface IPartnership {
  type?: string;
  link_url: string;
}

interface Author {
  id: string;
  name: string;
  email: string;
  password: string; // Hash string
  createdAt: string; // DateTime ISO String
  updatedAt: string; // DateTime ISO String
  role: "ADMIN" | "WRITER" | "USER";
}

export interface IPost {
  id: string;
  title: string;
  category: "NFT Jogos" | "NFT Artes";
  market_link: string;
  score: number;
  investment: string;
  token: string;
  network: string;
  comment_author: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  links: ILink[];
  projectFeatures: IProjectFeature[];
  launchInfo: ILaunchInfo;
  partnerships: IPartnership[];
  images: string[];
  genres: string[];
  author: Author;
}

export interface IPostCategories {
  category: "NFT Jogos" | "NFT Artes" | "Crypto";
}
