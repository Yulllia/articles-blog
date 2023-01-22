import { Article } from "../../interfaces/interface";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useRecoilValue } from "recoil";
import { wordInputState } from "../../recoil/atom/filterAtom";
import styles from "./card.module.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import moment from "moment"
import { ReactComponent as Calendar } from "../../assets/calendar.svg";

function CardPage({ article }: Article) {
  const summaryToShow = article.summary.substring(0, 100) + "...";
  const titleToShow = article.title.substring(0, 50) + "...";
  const wordInput = useRecoilValue(wordInputState);

  function getHighlightedText(text: string, textToMatch: string) {
    const wordSearch = textToMatch.split(" ");
    const matchRegex = RegExp(wordSearch.join("|"), "ig");
    const matches = Array.from(text.matchAll(matchRegex));
    return text.split(matchRegex).map((nonHighlightedText, index, arr) => (
      <span key={index}>
        {nonHighlightedText}
        {index + 1 !== arr.length && (
          <span style={{ backgroundColor: "yellow" }}>{matches[index]}</span>
        )}
      </span>
    ));
  }

  return (
    <li className={styles.card}>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          sx={{ height: 217 }}
          image={article.imageUrl}
          title={article.imageUrl}
        />
        <CardContent className={styles.content}>
          <p className={styles.date}><span><Calendar/></span>{moment(article.publishedAt).format("MMMM Do, YYYY")}</p>
          <h4 className={styles.title}>
            {getHighlightedText(titleToShow, wordInput)}
          </h4>
          <p className={styles.description}>
            {getHighlightedText(summaryToShow, wordInput)}
          </p>
          <Link className={styles.link} to={`card/${article.id}`}>
            Read more
            <span>
              <ArrowForwardIcon />
            </span>
          </Link>
        </CardContent>
      </Card>
    </li>
  );
}

export default CardPage;
