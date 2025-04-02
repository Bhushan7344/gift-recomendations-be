import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GiftHistory } from './gift-history.entity';
import { CreateGiftHistoryDto } from './gift-history.dto';

@Injectable()
export class GiftHistoryService {
  constructor(
    @InjectRepository(GiftHistory)
    private readonly giftRepository: Repository<GiftHistory>,
  ) {}

  create(createGiftDto: CreateGiftHistoryDto): Promise<GiftHistory | null> {
    const gift = this.giftRepository.create(createGiftDto);
    return this.giftRepository.save(gift);
  }

  findAll(): Promise<GiftHistory[]> {
    return this.giftRepository.find();
  }

  findOne(id: string): Promise<GiftHistory | null> {
    return this.giftRepository.findOne({ where: { id } });
  }

  remove(id: string): Promise<void> {
    return this.giftRepository.delete(id).then(() => undefined);
  }
}
