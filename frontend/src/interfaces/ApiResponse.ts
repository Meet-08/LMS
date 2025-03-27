export interface ApiResponse<T> {
  data?: T;
  errorResponse?: ErrorResponse;
  success: boolean;
}

export interface ErrorResponse {
  statusCode?: number;
  message: string;
}
