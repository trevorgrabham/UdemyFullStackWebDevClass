CREATE TABLE account(
    id                  SERIAL PRIMARY KEY,
    "usernameHash"      CHARACTER(64),
    "passwordHash"      CHARACTER(64),
    "sessionId"         CHARACTER(36)               -- storing sessionId instead of sessionString because there is no uniform length of username (before they are hashed)
);