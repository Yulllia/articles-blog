import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { allListState, loadingState } from "../recoil/atom/filterAtom";
import { ICard } from "../interfaces/interface";
import CircularProgress from '@mui/material/CircularProgress';

const useArticle = (api: string) => {
  const [articleInfo, setArticleInfo] =
    useRecoilState<Array<ICard>>(allListState);
  const [loading, setLoading] = useRecoilState<boolean>(loadingState);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      const response = await fetch(api);
      const data = await response.json();
      setArticleInfo(data);
      setLoading(false);
    };

    loadArticles();
  }, [api, setArticleInfo, setLoading]);

  if(loading) {
    <CircularProgress  variant="determinate" value={25}/> 
  }

  return { articleInfo, setArticleInfo };
};

export default useArticle;
