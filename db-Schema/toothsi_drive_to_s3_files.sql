CREATE TABLE IF NOT EXISTS public.toothsi_drive_to_s3_files
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    drivelink character varying COLLATE pg_catalog."default" NOT NULL,
    s3link character varying COLLATE pg_catalog."default" NOT NULL,
    creation_time character varying COLLATE pg_catalog."default" NOT NULL,
    start_time character varying COLLATE pg_catalog."default" NOT NULL,
    end_time character varying COLLATE pg_catalog."default" NOT NULL,
    state toothsi_drive_to_s3_files_state_enum NOT NULL DEFAULT 'INSERTED'::toothsi_drive_to_s3_files_state_enum,
    "Active" toothsi_drive_to_s3_files_active_enum NOT NULL,
    CONSTRAINT "PK_bdb7471202d8988d7cf26f846b7" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.toothsi_drive_to_s3_files
    OWNER to postgres;