import fs from 'fs';
import path from 'path';

const LOG_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'login-logs.csv');

export interface LogEntry {
  timestamp: string;
  username: string;
  ip_address: string;
  status: 'success' | 'failed';
  action: 'login' | 'logout';
}

function ensureLogFile() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
  if (!fs.existsSync(LOG_FILE)) {
    const header = 'timestamp,username,ip_address,status,action\n';
    fs.writeFileSync(LOG_FILE, header, 'utf-8');
  }
}

export async function appendLog(entry: LogEntry): Promise<void> {
  ensureLogFile();
  const row = `${entry.timestamp},${entry.username},${entry.ip_address},${entry.status},${entry.action}\n`;
  fs.appendFileSync(LOG_FILE, row, 'utf-8');
}

export function getLogs(): LogEntry[] {
  ensureLogFile();
  const content = fs.readFileSync(LOG_FILE, 'utf-8');
  const lines = content.trim().split('\n');
  
  if (lines.length <= 1) {
    return [];
  }

  const logs: LogEntry[] = [];
  for (let i = 1; i < lines.length; i++) {
    const [timestamp, username, ip_address, status, action] = lines[i].split(',');
    logs.push({
      timestamp,
      username,
      ip_address,
      status: status as 'success' | 'failed',
      action: action as 'login' | 'logout',
    });
  }
  
  return logs.reverse();
}

export function getLogsAsCsv(): string {
  ensureLogFile();
  return fs.readFileSync(LOG_FILE, 'utf-8');
}