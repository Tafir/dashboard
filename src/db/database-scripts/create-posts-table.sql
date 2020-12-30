CREATE TABLE posts(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id BIGSERIAL,
    title VARCHAR(200) NOT NULL,
    content VARCHAR(400),
    date_created DATE NOT NULL,
    date_updated DATE NOT NULL,
    date_due DATE,
    category VARCHAR(10),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
);