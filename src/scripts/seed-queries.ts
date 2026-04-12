export const SEED_SQL = `
INSERT INTO accounts (name, type, balance, currency)
SELECT 'Main Checking', 'checking', 1450, 'EUR'
WHERE NOT EXISTS (
  SELECT 1 FROM accounts WHERE name = 'Main Checking'
);

INSERT INTO accounts (name, type, balance, currency)
SELECT 'Emergency Savings', 'savings', 3200, 'EUR'
WHERE NOT EXISTS (
  SELECT 1 FROM accounts WHERE name = 'Emergency Savings'
);

INSERT INTO categories (name, icon, color)
SELECT 'Salary', 'wallet', '#22c55e'
WHERE NOT EXISTS (
  SELECT 1 FROM categories WHERE name = 'Salary'
);

INSERT INTO categories (name, icon, color)
SELECT 'Food', 'utensils', '#f59e0b'
WHERE NOT EXISTS (
  SELECT 1 FROM categories WHERE name = 'Food'
);

INSERT INTO categories (name, icon, color)
SELECT 'Transport', 'car', '#3b82f6'
WHERE NOT EXISTS (
  SELECT 1 FROM categories WHERE name = 'Transport'
);

INSERT INTO categories (name, icon, color)
SELECT 'Leisure', 'gamepad', '#ec4899'
WHERE NOT EXISTS (
  SELECT 1 FROM categories WHERE name = 'Leisure'
);

INSERT INTO transactions (type, amount, category, date, account_id, notes)
SELECT 'income', 1800, 'Salary', '2026-04-01',
  (SELECT id FROM accounts WHERE name = 'Main Checking'),
  'Monthly salary'
WHERE NOT EXISTS (
  SELECT 1 FROM transactions
  WHERE date = '2026-04-01' AND amount = 1800 AND notes = 'Monthly salary'
);

INSERT INTO transactions (type, amount, category, date, account_id, notes)
SELECT 'expense', 46.9, 'Food', '2026-04-03',
  (SELECT id FROM accounts WHERE name = 'Main Checking'),
  'Groceries'
WHERE NOT EXISTS (
  SELECT 1 FROM transactions
  WHERE date = '2026-04-03' AND amount = 46.9 AND notes = 'Groceries'
);

INSERT INTO transactions (type, amount, category, date, account_id, notes)
SELECT 'expense', 18.5, 'Transport', '2026-04-04',
  (SELECT id FROM accounts WHERE name = 'Main Checking'),
  'Metro top-up'
WHERE NOT EXISTS (
  SELECT 1 FROM transactions
  WHERE date = '2026-04-04' AND amount = 18.5 AND notes = 'Metro top-up'
);

INSERT INTO transactions (type, amount, category, date, account_id, notes)
SELECT 'expense', 27, 'Leisure', '2026-04-06',
  (SELECT id FROM accounts WHERE name = 'Main Checking'),
  'Cinema'
WHERE NOT EXISTS (
  SELECT 1 FROM transactions
  WHERE date = '2026-04-06' AND amount = 27 AND notes = 'Cinema'
);

INSERT INTO transactions (type, amount, category, date, account_id, notes)
SELECT 'income', 250, 'Salary', '2026-04-07',
  (SELECT id FROM accounts WHERE name = 'Emergency Savings'),
  'Freelance payment'
WHERE NOT EXISTS (
  SELECT 1 FROM transactions
  WHERE date = '2026-04-07' AND amount = 250 AND notes = 'Freelance payment'
);

INSERT INTO transactions (type, amount, category, date, account_id, notes)
SELECT 'expense', 39.99, 'Food', '2026-04-08',
  (SELECT id FROM accounts WHERE name = 'Main Checking'),
  'Dinner out'
WHERE NOT EXISTS (
  SELECT 1 FROM transactions
  WHERE date = '2026-04-08' AND amount = 39.99 AND notes = 'Dinner out'
);
`;
