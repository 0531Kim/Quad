import ReviewListItem from "types/interface/review-list-item.interface";
import ResponseDto from "../Response.dto";

export default interface getCourseReviewResponseDto extends ResponseDto{ 
    reviewList: ReviewListItem[];
}