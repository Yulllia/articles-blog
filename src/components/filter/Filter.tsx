import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { ArticleList, ICard } from "../../interfaces/interface";
import { useRecoilState } from "recoil";
import { filterListState, wordInputState } from "../../recoil/atom/filterAtom";
import styles from "./filter.module.scss";

function Filter({ cardsData }: ArticleList) {
  const [filteredData, setFilteredData] =
    useRecoilState<ICard[]>(filterListState);
  const [inputText, setInputText] = useRecoilState<string>(wordInputState);

  const handleFilter = (event: { target: { value: string } }) => {
    const textToFind = event.target.value.toLowerCase();
    setInputText(textToFind);

    if (textToFind === "") {
      setFilteredData(cardsData);
      return;
    }
    const keywords = textToFind.split(" ").filter((card) => card.length > 0);
    const title = [] as ICard[];
    const description = [] as ICard[];
    cardsData.filter((card) => {
      return (
        (keywords.some((word) =>
          card.title.substring(0, 50).toLowerCase().includes(word)
        ) &&
          title.push(card)) ||
        (keywords.some((word) =>
          card.summary.substring(0, 100).toLowerCase().includes(word)
        ) &&
          description.push(card))
      );
    });
    setFilteredData([...title, ...description]);
  };

  const clearInput = () => {
    setFilteredData(cardsData);
    setInputText("");
  };

  return (
    <div className={styles.container}>
      <FormControl className={styles.filter} variant="standard" fullWidth>
        <label className={styles.label} htmlFor="input-with-icon-adornment">
          Filter by keywords
        </label>
        <Input
          id="input-with-icon-adornment"
          placeholder="Enter Article Name or Description"
          className={styles.input}
          value={inputText}
          sx={{
            fontSize: "16px",
            lineHeight: "24px",
            color: "#575757",
            fontFamily: "Montserrat sans-serif",
            backgroundColor: "white",
            "&::before": {
              borderBottom: "unset",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "unset",
            },
          }}
          onChange={handleFilter}
          startAdornment={
            <InputAdornment position="start">
              {inputText.length === 0 ? (
                <SearchIcon />
              ) : (
                <CloseIcon onClick={clearInput} />
              )}
            </InputAdornment>
          }
        />
      </FormControl>
      <div className={styles.result}>Results: {filteredData.length}</div>
      <div className={styles.border} />
    </div>
  );
}

export default Filter;
