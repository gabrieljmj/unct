-- Up
CREATE TABLE projects (id INTEGER PRIMARY KEY, project TEXT);
CREATE TABLE settings (k TEXT PRIMARY KEY, v TEXT);

-- Down
DROP TABLE projects;
DROP TABLE settings;