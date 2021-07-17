import { id } from "common-tags";
import { extendType, nonNull, objectType, stringArg } from "nexus";
import prisma from "../../db/prisma";

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.projects();
    t.model.email();
    t.model.profilepic();
  },
});

const queries = extendType({
  type: "Query",
  definition: (t) => {
    t.field("currentUser", {
      type: "User",
      resolve: (_, __, ctx) => {
        if (!ctx.user?.id) return null;

        return prisma.user.findUnique({
          where: {
            id: ctx.user.id,
          },
        });
      },
    });
  },
});

const mutations = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nullable.field("updateUser", {
      type: "User",
      args: {
        userId: nonNull(stringArg()),
        email: nonNull(stringArg()),
        name: stringArg(),
        profilepic: stringArg(),
      },
      resolve: async (_, { userId, email, name, profilepic }, ctx) => {
        if (!ctx.user?.id || userId !== ctx.user.id) return null;

        return await prisma.user.update({
          where: { id: userId },
          data: { name, email, profilepic },
        });
      },
    });

    t.nullable.field("deleteUser", {
      type: "User",
      args: {
        userId: nonNull(stringArg()),
      },
      resolve: async (_, { userId }, ctx) => {
        // if (!ctx.user?.id) return null;

        const hasAccess = await prisma.user.findFirst({
          where: { id: userId },
        });

        if (!hasAccess) return null;

        const user = await prisma.user.delete({
          where: {
            id: userId,
          },
          // data: {disconnect: {id: userId}}
        });

        return null;
      },
    });

    t.nullable.field("getUserEmail", {
      type: "User",
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, ctx) => {
        // if (!ctx.user?.id) return null;

        return await prisma.user.findFirst({
          where: { id: id },
        });
      },
    });

    t.nullable.field("createUser", {
      type: "User",
      args: {
        email: stringArg(),
        name: stringArg(),
        profilepic: stringArg(),
        id: nonNull(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        // console.log(ctx);
        // if (!ctx.user?.id) return null;

        return await prisma.user.upsert({
          where: {
            id: args.id,
          },
          update: {
            email: args.email,
            name: args.name,
            profilepic: args.profilepic,
          },
          create: {
            id: args.id,
            email: args.email,
            name: args.name,
            profilepic: args.profilepic,
          },
        });
      },
    });
  },
});

export default [User, mutations, queries];
