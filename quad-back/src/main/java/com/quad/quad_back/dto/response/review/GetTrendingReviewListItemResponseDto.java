// package com.quad.quad_back.dto.response.review;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;

// import com.quad.quad_back.common.ResponseCode;
// import com.quad.quad_back.common.ResponseMessage;
// import com.quad.quad_back.dto.object.HighLightReviewListItem;
// import com.quad.quad_back.dto.response.ResponseDto;

// public class GetTrendingReviewListItemResponseDto extends ResponseDto{

//     private List<HighLightReviewListItem> 

//     private GetTrendingReviewListItemResponseDto(List<HighLightReviewListItem> ){
//         super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
//     }

//     public static ResponseEntity<GetTrendingReviewListItemResponseDto> success(){
//         GetHighlightReviewListItemResponseDto result = new GetHighlightReviewListItemResponseDto();
//         return ResponseEntity.status(HttpStatus.OK).body(result);
//     }
// }
