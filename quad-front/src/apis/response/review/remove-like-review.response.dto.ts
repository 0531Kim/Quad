import ResponseDto from "../Response.dto";

export default interface RemoveLikeReviewResponseDto extends ResponseDto {
    updatedLikeCount: number;
}