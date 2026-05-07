import fs from 'fs/promises';
import path from 'path';

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
  receivedAt: string;
};

const FILE_PATH = path.join(process.cwd(), 'data', 'messages.json');
const REDIS_KEY = 'portfolio:contact:messages';

function hasRedisConfig() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

function isVercelRuntime() {
  return Boolean(process.env.VERCEL);
}

async function readFileMessages(): Promise<ContactMessage[]> {
  try {
    const raw = await fs.readFile(FILE_PATH, 'utf-8');
    const data = JSON.parse(raw || '[]');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeFileMessages(messages: ContactMessage[]) {
  const dataDir = path.dirname(FILE_PATH);
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(messages, null, 2), 'utf-8');
}

async function readRedisMessages(): Promise<ContactMessage[]> {
  const { Redis } = await import('@upstash/redis');
  const redis = Redis.fromEnv();
  const raw = await redis.get<string>(REDIS_KEY);

  if (!raw) {
    return [];
  }

  if (Array.isArray(raw)) {
    return raw as ContactMessage[];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeRedisMessages(messages: ContactMessage[]) {
  const { Redis } = await import('@upstash/redis');
  const redis = Redis.fromEnv();
  await redis.set(REDIS_KEY, JSON.stringify(messages));
}

export async function listContactMessages(): Promise<ContactMessage[]> {
  if (hasRedisConfig()) {
    try {
      return await readRedisMessages();
    } catch (err) {
      console.error('Failed to read contact messages from Redis', err);
    }
  }

  return readFileMessages();
}

export async function storeContactMessage(message: ContactMessage) {
  const existing = await listContactMessages();
  const next = [message, ...existing].slice(0, 100);

  if (hasRedisConfig()) {
    try {
      await writeRedisMessages(next);
      return 'redis' as const;
    } catch (err) {
      console.error('Failed to save contact message to Redis', err);
    }
  }

  if (isVercelRuntime()) {
    console.warn('Contact message storage is disabled because Upstash Redis is not configured.');
    return 'disabled' as const;
  }

  await writeFileMessages(next);
  return 'file' as const;
}
