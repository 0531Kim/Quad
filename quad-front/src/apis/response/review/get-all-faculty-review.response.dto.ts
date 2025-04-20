import ReviewListItem from "types/interface/review-list-item.interface";
import ResponseDto from "../Response.dto";

export default interface getAllFacultyReviewResponseDto extends ResponseDto{
    allFacultyReview: {
        [faculty: string]: ReviewListItem[];
    };
}