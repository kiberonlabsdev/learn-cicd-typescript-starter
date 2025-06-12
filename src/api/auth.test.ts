import { getAPIKey } from "./auth";
import { IncomingHttpHeaders } from "http";
import { describe, it, expect } from "vitest";

describe("getAPIKey", () => {
  it("should return the API key when header is valid", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey my-secret-key",
    };
    expect(getAPIKey(headers)).toBe("my-secret-key");
  });

  it("should return null if authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return null if authorization header does not start with ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer some-token",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return null if authorization header is malformed", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return null if authorization header is an empty string", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should be case sensitive for 'ApiKey'", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "apikey my-key",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return only the first word after ApiKey as the key", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey key1 key2",
    };
    expect(getAPIKey(headers)).toBe("key1");
  });

  it("should return null if authorization header is not a string", () => {
    const headers: IncomingHttpHeaders = {
      authorization: undefined,
    };
    expect(getAPIKey(headers)).toBeNull();
  });
  it("should return null if authorization header is just 'ApiKey '", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey ",
    };
    expect(getAPIKey(headers)).toBe("");
  });

  it("should return null if authorization header is an empty string", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should be case sensitive for 'ApiKey'", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "apikey my-key",
    };
    expect(getAPIKey(headers)).toBeNull();
  });
});
