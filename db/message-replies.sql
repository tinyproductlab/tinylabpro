-- Additive migration: existing visitor messages are unchanged.
CREATE TABLE IF NOT EXISTS message_replies (
  message_id TEXT PRIMARY KEY REFERENCES messages(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
