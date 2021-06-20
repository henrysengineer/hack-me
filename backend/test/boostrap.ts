import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { DatabaseOrmModule } from '../src/database/database.module';

export const boostrapModuleWithInMemoryDatabase = async ({
    entities,
    features,
    providers,
    controllers,
    additionalImportModules
}: {
    entities: EntityClassOrSchema[];
    features: EntityClassOrSchema[];
    additionalImportModules?: any[];
    providers: any[];
    controllers?: any[];
}) => {
    const databaseModule = DatabaseOrmModule({
        database: ':memory',
        entities,
        dropSchema: true
    });

    let imports = [databaseModule, TypeOrmModule.forFeature(features)];

    if (additionalImportModules) {
        imports = [...imports, ...additionalImportModules];
    }

    const module: TestingModule = await Test.createTestingModule({
        imports,
        providers,
        controllers
    }).compile();

    return module;
};
