export enum ResponseTone {
  GRATEFUL = 'Grateful',
  PROFESSIONAL = 'Professional',
  DIPLOMATIC = 'Diplomatic Apology',
  CLARIFICATION = 'Clarification',
}

export interface GenerationRequest {
  reviewText: string;
  tone: ResponseTone;
}

export interface GenerationResponse {
  responseText: string;
}
