create table if not exists accounts(
  id serial primary key,
  balance money not null constraint balance_nonnegative check(balance >= 0::money)
);

create or replace function accounts_deposit(id integer, amount money)
returns void
as
$body$
begin
  if amount <= 0::money then
    raise 'Only positive amounts can be deposited into an account';
  end if;

  update accounts
  set balance = balance + amount
  where accounts.id = accounts_deposit.id;
end;
$body$
language plpgsql;

create or replace function accounts_withdraw(id integer, amount money)
returns void
as
$body$
begin
  if amount <= 0::money then
    raise 'Only positive amounts can be withdrawn from an account';
  end if;

  update accounts
  set balance = balance - amount
  where accounts.id = accounts_withdraw.id;
end;
$body$
language plpgsql;

create or replace function accounts_transfer(account_from integer, account_to integer, amount money)
returns void
as
$body$
begin
  if account_from = account_to then
    raise 'Cannot transfer funds from an account into itself';
  elsif amount <= 0::money then
    raise 'Only positive amounts can be transferred between accounts';
  end if;

  perform accounts_withdraw(account_from, amount);
  perform accounts_deposit(account_to, amount);
end;
$body$
language plpgsql;
