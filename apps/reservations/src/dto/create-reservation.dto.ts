import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}
