// create-gift-history.dto.ts
export class CreateGiftHistoryDto {
  readonly user_id: string;
  readonly relationship_id: string;
  readonly gift_id: string;
  purchase_date: Date;
}
