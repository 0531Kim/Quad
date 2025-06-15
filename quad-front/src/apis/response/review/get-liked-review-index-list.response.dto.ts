import LikedReviewIndexList from "types/interface/liked-review-index-list.interface";
import ResponseDto from "../Response.dto";

export default interface GetLikedReviewIndexListResponseDto extends ResponseDto {
    likedReviewIndexList: number[];
}