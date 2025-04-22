import ResponseDto from "../Response.dto";
import coursesByStudy from "types/interface/courses-by-study.interface";

export default interface getCoursesByStudyResponseDto extends ResponseDto{
    courses: coursesByStudy;
}