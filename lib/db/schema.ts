import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index,serial,varchar,integer,pgEnum,uuid,primaryKey} from "drizzle-orm/pg-core";



export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

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
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

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
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));


  
  //
  // 1) Enum pour le rôle utilisateur
  //
  export const userRoleEnum = pgEnum("user_role", ["USER", "ADMIN"]);
  
  //
  // 2) Table users (sans BetterAuth, toute simple)
  //
  export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
  
    name: varchar("name", { length: 100 }).notNull(),
  
    email: varchar("email", { length: 150 }).notNull().unique(),
  
    role: userRoleEnum("role").notNull().default("USER"),
  
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  });
  
  //
  // 3) Table categories
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
  // 4) Table products
  //
  export const products = pgTable("products", {
    id: serial("id").primaryKey(),
  
    title: varchar("title", { length: 150 }).notNull(),
  
    slug: varchar("slug", { length: 160 }).notNull().unique(),
  
    description: text("description"),
  
    // Prix en centimes (ex: 19.99€ -> 1999)
    priceCents: integer("price_cents").notNull(),
  
    imageUrl: text("image_url"),
  
    isPublished: boolean("is_published").notNull().default(false),
  
    // FK vers users.id : propriétaire du produit
    ownerId: uuid("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  
    // FK vers categories.id
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
  
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  });
  
  //
  // 5) Table favorites (pivot user ↔ product)
  //   - PK composite (user_id, product_id)
  //
  export const favorites = pgTable(
    "favorites",
    {
      userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
  
      productId: integer("product_id")
        .notNull()
        .references(() => products.id, { onDelete: "cascade" }),
  
      createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    },
    (table) => ({
      pk: primaryKey({ columns: [table.userId, table.productId] }),
    }),
  );
  
  //
  // 6) Table comments
  //
  export const comments = pgTable("comments", {
    id: serial("id").primaryKey(),
  
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
  
    authorId: uuid("author_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  
    content: text("content").notNull(),
  
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  
    isDeleted: boolean("is_deleted").notNull().default(false),
  });
  