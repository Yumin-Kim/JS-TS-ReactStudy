import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
  @ApiProperty({
    example: 'dbals0@naver.com',
    description: 'Email',
    required: true,
  })
  public email: string;

  @ApiProperty({
    example: 'dbals',
    description: 'nickname',
    required: true,
  })
  public nickname: string;

  @ApiProperty({
    example: 'qweqwe',
    description: 'Password',
    required: true,
  })
  public password: string;
}
