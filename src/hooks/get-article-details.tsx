import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loadingState } from "../recoil/atom/filterAtom";
import { ICard } from "../interfaces/interface";
import CircularProgress from '@mui/material/CircularProgress';

const useArticleDetails = (api: string) => {
  const [detailArticle, setDetailArticle] = useState<ICard>();
  const [loading, setLoading] = useRecoilState<boolean>(loadingState);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      const response = await fetch(api);
      const data = await response.json();
      setDetailArticle(data);
      setLoading(false);
    };

    loadArticles();
  }, [api, setLoading]);

  if(loading) {
    <CircularProgress  variant="determinate" value={25}/> 
  }

  return { detailArticle };
};

export default useArticleDetails;
