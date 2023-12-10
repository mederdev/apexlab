import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty({
    type: Number,
    description: 'Кол-во записей',
  })
  count: number;

  @ApiProperty({
    description: 'Массив данных',
  })
  data: T[];
}
