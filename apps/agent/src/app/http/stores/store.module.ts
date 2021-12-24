import { Module } from '@nestjs/common';
import { CoreStoreModule } from 'libs/core/stores/src/core-store.module';
import { StoreController } from './store.controller';

@Module({
  imports: [CoreStoreModule],
  controllers: [StoreController],
})
export class StoreModule {}
