// src/lib/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8082/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
});
