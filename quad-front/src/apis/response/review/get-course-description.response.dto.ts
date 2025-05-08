import ResponseDto from "../Response.dto";
import CourseDescription from "types/interface/course-description.interface";

export default interface getCourseReviewResponseDto extends ResponseDto{ 
    courseDescription: CourseDescription;
}