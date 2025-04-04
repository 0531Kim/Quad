export default interface HighlightReviewListItem{
    username : string;
    title : string;
    content : string;
    boardTitleImage : string | null;
    favoriteCount : number;
    commentCount : number;
    viewCount : number;
    writeDatetime : string;
    writerNickname : string;
    writerProfileImage : string | null;
}