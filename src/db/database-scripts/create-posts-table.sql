CREATE TABLE posts(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id BIGSERIAL,
    title VARCHAR(200) NOT NULL,
    content VARCHAR(400),
    date_created TIMESTAMP WITH TIME ZONE,
    date_updated TIMESTAMP WITH TIME ZONE,
    date_due TIMESTAMP WITH TIME ZONE,
    category VARCHAR(10),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
);