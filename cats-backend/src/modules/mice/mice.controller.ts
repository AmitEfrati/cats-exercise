import { Controller, Delete, Param } from '@nestjs/common';
import { MiceService } from './mice.service';

@Controller('mice')
export class MiceController {
  constructor(private readonly miceService: MiceService) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.miceService.deleteMouse(Number(id));
  }
}
