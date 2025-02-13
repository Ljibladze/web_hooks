import { writable } from "svelte/store";

export type Webhook = {
  id: number;
  nickname: string;
  url: string;
  authorization: string;
  events: string[];
  createdAt: string;
  modifiedAt: string;
};

export type WebhookStatus = {
  id: number;
  createDate: string;
  httpCode: number;
  failures: number;
  status: string;
  message: string;
  lastTry: string;
  nextTry: string;
};

export const showModal = writable(false);
export const notificationMessage = writable("");
export const tableData = writable<any[]>([]);
export const statusData = writable<any[]>([
  {
    createDate: "2024-02-12",
    httpCode: 200,
    failures: 0,
    status: "Success",
    message: "Webhook executed",
    lastTry: "2024-02-12T14:00",
    nextTry: "N/A",
  },
  {
    createDate: "2024-02-11",
    httpCode: 500,
    failures: 3,
    status: "Failed",
    message: "Server error",
    lastTry: "2024-02-11T13:00",
    nextTry: "2024-02-12T15:00",
  },
]);
export const selectedFilters = writable<string[]>([]);
export const showCreateModal = writable(false);
export const showFilterModal = writable(false);
export const selectedWebhook = writable(null);
