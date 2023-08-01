import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  InternalServerErrorException,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard } from '@app/common/auth';
import {
  CurrentUser,
  ResourceSerialization,
  TransformInterceptor,
} from '@app/common';
import { UserDto } from '@app/common/dto';
import { ReservationDocument } from './models/reservation.schema';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ResourceSerialization())
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @CurrentUser() user: UserDto,
  ) {
    try {
      const data = await this.reservationsService.create(
        createReservationDto,
        user,
      );
      return data;
    } catch (error) {
      // Handle the error here and return an error response or throw a custom exception.
      throw new InternalServerErrorException('Failed to create reservation');
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ResourceSerialization())
  async findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(new ResourceSerialization())
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ResourceSerialization())
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ResourceSerialization())
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
