-- 1. Hapus data (URUTAN PENTING)
DELETE FROM "Transaction";
DELETE FROM "Member";

-- 2. Reset ID
ALTER SEQUENCE "Member_id_seq" RESTART WITH 1;
ALTER SEQUENCE "Transaction_id_seq" RESTART WITH 1;