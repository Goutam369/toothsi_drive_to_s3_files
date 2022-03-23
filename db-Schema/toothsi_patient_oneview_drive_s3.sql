CREATE TABLE IF NOT EXISTS public.toothsi_patient_oneview_drive_s3
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    category toothsi_patient_oneview_drive_s3_category_enum NOT NULL,
    "subCategory" toothsi_patient_oneview_drive_s3_subcategory_enum NOT NULL,
    category_id character varying COLLATE pg_catalog."default" NOT NULL,
    "toothsiDriveToS3Id" uuid,
    CONSTRAINT "PK_7751b18c12196c9e6d689a6ca90" PRIMARY KEY (id),
    CONSTRAINT "REL_eb9fdd1c0b36f81652f17630e2" UNIQUE ("toothsiDriveToS3Id"),
    CONSTRAINT "FK_eb9fdd1c0b36f81652f17630e23" FOREIGN KEY ("toothsiDriveToS3Id")
        REFERENCES public.toothsi_drive_to_s3_files (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.toothsi_patient_oneview_drive_s3
    OWNER to postgres;