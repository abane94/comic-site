import { Module } from '@nestjs/common';
import { buildDataProviders } from './data-provider-builder';
import configProvider from '../config-provider';
import * as constants from '../constants';

@Module({
    providers: [configProvider, ...buildDataProviders()],
    exports: [...constants.collections, 'ALL_COLLECTIONS'] // TODO: add to constants
})
export class DataModule {}
