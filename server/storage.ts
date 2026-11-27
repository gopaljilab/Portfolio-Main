import { db } from "./db";
import { contactMessages, type CreateContactMessageRequest, type ContactMessageResponse } from "@shared/schema";

export interface IStorage {
  createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessageResponse>;
  getContactMessages(): Promise<ContactMessageResponse[]>;
}

export class DatabaseStorage implements IStorage {
  async createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessageResponse> {
    if (!db) {
      throw new Error("Database is not configured");
    }
    const [result] = await db.insert(contactMessages).values(message).returning();
    return result;
  }

  async getContactMessages(): Promise<ContactMessageResponse[]> {
    if (!db) {
      return [];
    }
    return await db.select().from(contactMessages);
  }
}

export class MemoryStorage implements IStorage {
  private messages: ContactMessageResponse[] = [];
  private nextId = 1;

  async createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessageResponse> {
    const entry: ContactMessageResponse = {
      id: this.nextId++,
      name: message.name,
      email: message.email,
      phone: message.phone ?? null,
      message: message.message,
      createdAt: new Date(),
    };
    this.messages.push(entry);
    return entry;
  }

  async getContactMessages(): Promise<ContactMessageResponse[]> {
    return [...this.messages];
  }
}

export const storage: IStorage = db ? new DatabaseStorage() : new MemoryStorage();

