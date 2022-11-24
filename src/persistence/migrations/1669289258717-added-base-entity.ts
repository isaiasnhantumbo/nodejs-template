import { MigrationInterface, QueryRunner } from "typeorm";

export class addedBaseEntity1669289258717 implements MigrationInterface {
    name = 'addedBaseEntity1669289258717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ADD "date_created" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "students" ADD "date_updated" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "students" ADD "address" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "date_updated"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "date_created"`);
    }

}
