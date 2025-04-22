import StudiesByFaculty from "types/interface/studies-by-faculty-item.interface";
import ResponseDto from "../Response.dto";

export default interface getStudiesByFacultyResponseDto extends ResponseDto{
    studyList: StudiesByFaculty;
}