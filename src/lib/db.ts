// Database module — static data mode for Vercel deployment
// All data is served from /lib/catalog.ts (no database required)
// This file is kept for backward compatibility but does not connect to any database

export const db = {
  product: { findMany: async () => [], count: async () => 0, create: async (d: unknown) => d, update: async (d: unknown) => d, delete: async () => ({ success: true }) },
  service: { findMany: async () => [], count: async () => 0, create: async (d: unknown) => d, update: async (d: unknown) => d, delete: async () => ({ success: true }) },
  blogPost: { findMany: async () => [], count: async () => 0, create: async (d: unknown) => d, update: async (d: unknown) => d, delete: async () => ({ success: true }) },
  contact: { findMany: async () => [], count: async () => 0, create: async (d: unknown) => d },
  campaign: { findMany: async () => [], count: async () => 0, create: async (d: unknown) => d, update: async (d: unknown) => d, delete: async () => ({ success: true }) },
  automationLog: { findMany: async () => [], count: async () => 0, create: async (d: unknown) => d },
};
