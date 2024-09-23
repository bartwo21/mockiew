import bcrypt from "bcryptjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function saltAndHashPassword(password: any) {
  // Password'un string olmasını sağla
  const passwordStr = String(password);

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(passwordStr, salt);

  return hash;
}
