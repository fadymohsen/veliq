import { createHmac, randomInt } from "crypto";

// Self-hosted math challenge — no external service, no API keys.
// Signed so a bot can't just POST a=1&b=1&answer=2 without solving the real question.
const SECRET = process.env.CAPTCHA_SECRET || "veliq-checkout-captcha-9f3a1c7e";
const TTL_MS = 10 * 60 * 1000; // 10 minutes to fill the form

function sign(payload: string): string {
  return createHmac("sha256", SECRET).update(payload).digest("hex");
}

export function generateChallenge() {
  const a = randomInt(2, 10);
  const b = randomInt(2, 10);
  const exp = Date.now() + TTL_MS;
  const payload = `${a}.${b}.${exp}`;
  const token = `${payload}.${sign(payload)}`;
  return { a, b, token };
}

export function verifyChallenge(token: unknown, answer: unknown): boolean {
  if (typeof token !== "string" || typeof answer !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 4) return false;
  const [a, b, exp, sig] = parts;
  const payload = `${a}.${b}.${exp}`;
  if (sign(payload) !== sig) return false;
  if (Date.now() > Number(exp)) return false;
  return Number(answer.trim()) === Number(a) + Number(b);
}
