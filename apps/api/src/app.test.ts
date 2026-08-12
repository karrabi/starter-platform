import request from "supertest";
import jwt from "jsonwebtoken";
import { describe, expect, it } from "vitest";

import app from "./app";

import { env } from "./config/env";

describe("API smoke tests", () => {
  it("GET /api/health returns API health status", async () => {
    const response = await request(app).get("/api/health").expect(200);

    expect(response.body).toEqual({
      success: true,
      message: "Success",
      data: {
        status: "OK",
        service: "Starter Platform API",
      },
    });
  });

  it("GET /api/auth/me rejects requests without token", async () => {
    const response = await request(app).get("/api/auth/me").expect(401);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unauthorized");
  });

  it("GET /api/auth/me rejects invalid tokens", async () => {
    const response = await request(app)
      .get("/api/auth/me")
      .set("Authorization", "Bearer invalid-token")
      .expect(401);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid token");
  });

  it("POST /api/auth/login rejects invalid payload", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({})
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBeTruthy();
  });

  it("Author cannot create a product", async () => {
    const token = jwt.sign(
      {
        userId: 999999,
        email: "author@test.local",
        role: "Author",
      },
      env.JWT_SECRET,
    );

    const response = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(403);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Forbidden");
  });

  it("Editor cannot update settings", async () => {
    const token = jwt.sign(
      {
        userId: 999999,
        email: "editor@test.local",
        role: "Editor",
      },
      env.JWT_SECRET,
    );

    const response = await request(app)
      .put("/api/settings/general")
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(403);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Forbidden");
  });
});
