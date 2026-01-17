import axios from "axios";

export function normalizeError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    return new Error(
      error.response?.data?.message ||
      error.response?.statusText ||
      "Server error"
    );
  }
  if (error instanceof Error) return error;
  return new Error("Unexpected error occurred");
}
