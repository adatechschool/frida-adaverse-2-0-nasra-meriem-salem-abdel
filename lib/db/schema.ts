import { relations } from "drizzle-orm";


import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  serial,
  varchar,
  integer,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";

//
// 1) Enum pour le rôle utilisateur
//
export const userRoleEnum = pgEnum("user_role", ["USER", "ADMIN"]);

//
// 2) Table user (BetterAuth + rôle)
//
export const user = pgTable("user", {
  id: text("id").primaryKey(),

  name: text("name").notNull(),

  email: text("email").notNull().unique(),

  emailVerified: boolean("email_verified").default(false).notNull(),

  image: text("image"),

  role: userRoleEnum("role").notNull().default("USER"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

//
// 3) Table session
//
export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),

    expiresAt: timestamp("expires_at").notNull(),

    token: text("token").notNull().unique(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),

    ipAddress: text("ip_address"),

    userAgent: text("user_agent"),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
);

//
// 4) Table account
//
export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),

    accountId: text("account_id").notNull(),

    providerId: text("provider_id").notNull(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),

    accessTokenExpiresAt: timestamp("access_token_expires_at"),

    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),

    scope: text("scope"),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

//
// 5) Table verification
//
export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),

    identifier: text("identifier").notNull(),

    value: text("value").notNull(),

    expiresAt: timestamp("expires_at").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
);

//
// 6) Table categories
//
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 100 }).notNull().unique(),

  slug: varchar("slug", { length: 120 }).notNull().unique(),

  description: text("description"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

//
// 7) Table products
//
export const products = pgTable("products", {
  id: serial("id").primaryKey(),

  title: varchar("title", { length: 150 }).notNull(),

  slug: varchar("slug", { length: 160 }).notNull().unique(),

  description: text("description"),

  priceCents: integer("price_cents").notNull(),

  imageUrl: text("image_url"),

  isPublished: boolean("is_published").notNull().default(false),

  // 🔥 FK vers user.id
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  // 🔥 FK vers categories.id
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

//
// 8) Table favorites (pivot user ↔ product)
//
/* export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
}); */

//
// 9) Table comments
//
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),

  // 🔥 FK vers product
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),

  // 🔥 FK vers user
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  content: text("content").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", { withTimezone: true }),

  isDeleted: boolean("is_deleted").notNull().default(false),
});

  