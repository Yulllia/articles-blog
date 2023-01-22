export interface ICard {
	id: number;
	imageUrl: string;
	publishedAt: string;
	title: string;
	summary: string;
};
export type Article = {
    article: ICard
}
export type ArticleList = {
    cardsData: Array<ICard>
}