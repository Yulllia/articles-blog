import { Link, useParams } from "react-router-dom";
import styles from "./details.module.scss";
import Box from "@mui/material/Box";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import useArticleDetails from "../../hooks/ger-article-details";

function DetailArticle() {
  const { id } = useParams();

  const { detailArticle } = useArticleDetails(
    `${process.env.REACT_APP_API_URL}/${id}`
  );

  return (
    <div className={styles.detailContainer}>
      {detailArticle && (
        <>
          <Box
            component="img"
            sx={{
              height: 245,
              width: "100%",
            }}
            alt="card"
            className={styles.image}
            src={detailArticle.imageUrl}
          />
          <div className={styles.description}>
            <h4 className={styles.title}>{detailArticle.title}</h4>
            <p className={styles.text}>{detailArticle.summary}</p>
          </div>
          <div className={styles.linkContainer}>
            <Link className={styles.link} to={`/`}>
              {" "}
              <span>
                <KeyboardBackspaceIcon />
              </span>
              Back to homepage
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default DetailArticle;
