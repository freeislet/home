CREATE TABLE auth_user (
    id VARCHAR(255) PRIMARY KEY,
    -- 이하 custom columns
    username VARCHAR(255) NOT NULL,
    email varchar(255) DEFAULT NULL,
    avatar_url TEXT DEFAULT NULL,
    INDEX username (username),
    INDEX email (email)
);

CREATE TABLE auth_user_session (
    id VARCHAR(255) PRIMARY KEY,
    expires_at DATETIME NOT NULL,
    user_id VARCHAR(255) NOT NULL REFERENCES auth_user(id)
);

CREATE TABLE auth_oauth_account (
    provider_id VARCHAR(255) NOT NULL,
    provider_user_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL REFERENCES auth_user(id),
    PRIMARY KEY (provider_id, provider_user_id)
);

-- 쿼리 테스트
SELECT *
FROM auth_user u
LEFT JOIN auth_user_session s ON s.user_id = u.id;
