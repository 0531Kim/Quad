export default interface PostReviewRequestDto {
    courseName: string;
    score: number;
    semester: number;
    quality: number;
    enjoyable: number;
    difficulty: number;
    workload: number;
    exam: number;
    content: string;
}