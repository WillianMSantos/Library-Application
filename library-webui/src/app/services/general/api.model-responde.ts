interface ApiResponse<T> {
    content: T[];
    size: number;
    totalElements: number;
    totalPages: number;
    page: number;
  }