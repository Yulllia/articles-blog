import React from "react";
import useArticle from "../../hooks/get-article-list";
import Card from "../cardPage/CardPage";
import { ICard } from "../../interfaces/interface";
import Filter from "../filter/Filter";
import { useRecoilValue } from "recoil";
import { filterListState, loadingState } from "../../recoil/atom/filterAtom";
import styles from "./list.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

function ArticleList() {
  const { articleInfo } = useArticle(`${process.env.REACT_APP_API_URL}`);
  const filteredList = useRecoilValue(filterListState);
  const loading = useRecoilValue(loadingState);
  return (
    <div className={styles.articleList}>
      {loading ? (
        <CircularProgress variant="determinate" value={100} />
      ) : (
        <>
          <Filter cardsData={articleInfo} />
          <ul className={styles.cardContainer}>
            {filteredList.length > 0 ? (
              filteredList?.map((article: ICard) => {
                return <Card key={article.id} article={article} />;
              })
            ) : (
              <div>No matches found!</div>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default ArticleList;
