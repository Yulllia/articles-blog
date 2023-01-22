import React from "react";
import ArticleList from "./components/articleList/ArticleList";
import { Routes, Route } from "react-router-dom";
import DetailArticle from "./components/detailArticlePage/DetailArticle";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<ArticleList />} />
      <Route path="/card/:id" element={<DetailArticle />} />
    </Routes>
  );
}

export default App;
