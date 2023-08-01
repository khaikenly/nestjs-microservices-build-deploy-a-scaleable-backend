import { IsNotEmpty, IsString } from 'class-validator';

export class CardDto {
  @IsString()
  @IsNotEmpty()
  type: string;
}
