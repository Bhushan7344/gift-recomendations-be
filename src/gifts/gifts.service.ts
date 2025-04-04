import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gift } from './gift.entity';
import { CreateGiftDto } from './gifts.dto';

@Injectable()
export class GiftsService {
  constructor(
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
  ) {}

  create(createGiftDto: CreateGiftDto): Promise<Gift> {
    const gift = this.giftRepository.create(createGiftDto);
    return this.giftRepository.save(gift);
  }

  findAll(): Promise<Gift[]> {
    return this.giftRepository.find();
  }

  findOne(id: string): Promise<Gift | null> {
    return this.giftRepository.findOne({ where: { id } });
  }

  remove(id: string): Promise<void> {
    return this.giftRepository.delete(id).then(() => undefined);
  }
}
