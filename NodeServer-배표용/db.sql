CREATE TABLE users (
                       id NUMBER PRIMARY KEY,  -- PK
                       userid VARCHAR2(100),  -- UserID 또는 User 닉네임
                       password VARCHAR2(100),  -- 패스워드
                       nickname VARCHAR2(100),   -- 닉네임
                       realname VARCHAR2(100)      -- 실제 사용자 이름
                       mileage NUMBER -- 마일리지 6/3 추가
);

 -- 원하시는대로 밑에 내용은 변경하세요.
INSERT INTO users (id, userid, password, nickname, realname) VALUES (1, 'dusqo', '123456', '연배', '강연배');
INSERT INTO users (id, userid, password, nickname, realname) VALUES (2, 'wldn', '1234', '지우지우', '이지우');

CREATE SEQUENCE RECYCLING_CENTER_ID_SEQ START WITH 1 INCREMENT BY 1;


CREATE TABLE recyclingcenters (
                                  ID NUMBER PRIMARY KEY,
                                  NAME VARCHAR2(255),
                                  OPERATIONTYPE VARCHAR2(100),
                                  ADDRESS VARCHAR2(255),
                                  ADDRESSOLD VARCHAR2(255),
                                  LATITUDE NUMBER,
                                  LONGITUDE NUMBER,
                                  AREA NUMBER,
                                  ESTABLISHEDDATE VARCHAR2(255),
                                  VEHICLECOUNT NUMBER,
                                  MAINTIMES VARCHAR2(255),
                                  OPERATINGORGANIZATION VARCHAR2(255),
                                  PHONE VARCHAR2(100),
                                  REPRESENTATIVE VARCHAR2(100),
                                  WEEKDAYSTART VARCHAR2(10),
                                  WEEKDAYEND VARCHAR2(10),
                                  HOLIDAYSTART VARCHAR2(10),
                                  HOLIDAYEND VARCHAR2(10),
                                  OFFDAYINFO VARCHAR2(255),
                                  AFTERSERVICEINFO VARCHAR2(255),
                                  WEBSITE VARCHAR2(255),
                                  MANAGEMENTPHONE VARCHAR2(100),
                                  MANAGEMENTORGANIZATION VARCHAR2(255),
                                  DATADATE VARCHAR2(255),
                                  PROVIDERCODE VARCHAR2(50),
                                  PROVIDERNAME VARCHAR2(255)
);


CREATE OR REPLACE TRIGGER recycling_center_before_insert
BEFORE INSERT ON recyclingcenters
FOR EACH ROW
BEGIN
SELECT RECYCLING_CENTER_ID_SEQ.NEXTVAL INTO :new.ID FROM dual;
END;

CREATE SEQUENCE zero_seq START WITH 1 INCREMENT BY 1;

CREATE TABLE ZERO (
                      id NUMBER PRIMARY KEY,
                      latitude VARCHAR2(100),
                      longitude VARCHAR2(100),
                      name VARCHAR2(200)
);

CREATE OR REPLACE TRIGGER zero_before_insert
BEFORE INSERT ON ZERO
FOR EACH ROW
BEGIN
SELECT zero_seq.NEXTVAL INTO :new.id FROM dual;
END;

-- 게시판 테이블추가6/13
CREATE TABLE posts (
                       ID NUMBER NOT NULL,
                       AUTHOR_ID NUMBER,
                       TITLE VARCHAR2(255),
                       CONTENT CLOB,
                       CREATED_AT TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                       VIEWS NUMBER DEFAULT 0,
                       LIKES NUMBER DEFAULT 0,
                       IMAGE_PATH VARCHAR2(255),
                       CONSTRAINT posts_pk PRIMARY KEY (ID)
);

-- 마일리지 테이블 6/3 추가
CREATE TABLE mileage_transactions (
                                      id NUMBER PRIMARY KEY,
                                      user_id NUMBER,
                                      amount NUMBER,
                                      transaction_type VARCHAR2(20),
                                      transaction_date DATE DEFAULT SYSDATE,
                                      FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE SEQUENCE mileage_transactions_seq START WITH 1 INCREMENT BY 1;
-- 게시판 시퀀스 생성
CREATE SEQUENCE posts_seq START WITH 1 INCREMENT BY 1;
-- 게시판 트리거 생성
CREATE OR REPLACE TRIGGER trg_posts_id
BEFORE INSERT ON posts
FOR EACH ROW
BEGIN
  :NEW.id := posts_seq.NEXTVAL;
END;



DROP TRIGGER UPDATE_MILEAGE_TRANSACTION;
--마일리지 트리거 생성
CREATE OR REPLACE TRIGGER update_mileage_transaction
AFTER INSERT ON MILEAGE_TRANSACTIONS
FOR EACH ROW
BEGIN
  IF :NEW.TRANSACTION_TYPE = 'add' THEN
UPDATE USERS
SET MILEAGE = MILEAGE + :NEW.AMOUNT
WHERE ID = :NEW.USER_ID;
ELSIF :NEW.TRANSACTION_TYPE = 'use' THEN
UPDATE USERS
SET MILEAGE = MILEAGE - :NEW.AMOUNT
WHERE ID = :NEW.USER_ID;
END IF;
END;
/