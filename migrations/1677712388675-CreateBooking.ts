import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBooking1677712388675 implements MigrationInterface {
    name = 'CreateBooking1677712388675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "booking" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "numberOfPeople" integer NOT NULL, "date" TIMESTAMP NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "comment" character varying NOT NULL, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "booking"`);
    }

}
