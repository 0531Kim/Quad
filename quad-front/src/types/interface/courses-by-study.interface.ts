import courseItem from "./course-item.interface";

export default interface coursesByStudy{
    [studyCode: string]: courseItem[];
}