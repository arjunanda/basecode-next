export interface CoreResponseApi {
    valid: boolean;
  }
  
//   export type PaginateResponse = {
//     limit: number;
//     page: number;
//     sort: string;
//     total_rows: number;
//     total_pages: number;
//   };

  export interface paginate<T> {
    rows?: T;
    limit: number;
    page: number;
    sort: string;
    total_rows: number;
    total_pages: number;
    FilterValue: Array<any> | null;
  }
  
  
  export type DataResponse =
    | {
        [k: string]: any;
      }
    | Array<{ [k: string]: any }>;
  
  export interface HttpResponse<T> extends CoreResponseApi {
    data: T;
    details: {
      path: string;
      query: string;
      status_code: number;
      method: string;
      status: string;
    };
    errors: {
      [key: string]: [string];
    } | null;
    message: string;
  }
  
  export interface HttpResponsePaginate<T> extends CoreResponseApi {
    meta: {
      route: string;
      method: string;
      query: string;
      code: number;
      status: string;
    };
    details: {
      path: string;
      query: string;
      status_code: number;
      method: string;
      status: string;
    };
    errors: {
      [key: string]: [string];
    } | null;
    message: string;
    data: paginate<T>;
  }
  
  export interface ResponseUseCase<T> {
    valid: boolean;
    message: string;
    status_code?: number;
    data?: T | null;
  }
  
  export interface ResponseUseCasePaginate<T> {
    valid: boolean;
    message: string;
    status_code?: number;
    data?: paginate<T>;
  }
  

  