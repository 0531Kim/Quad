import HighlightReviewListItem from "types/interface/hightlight-review-list-item.interface";
import ResponseDto from "../Response.dto";

export default interface getLatestReviewResponseDto extends ResponseDto{
    latestReviews: HighlightReviewListItem[];
}