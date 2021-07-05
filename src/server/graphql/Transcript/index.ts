import { extendType, nonNull, objectType, stringArg } from "nexus";
import prisma from "../../db/prisma";

const Transcript = objectType({
  name: "Transcript",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.transcript();
    t.model.filetype();
    t.model.expirationdate();
    t.model.renderdate();
    t.model.status();
    t.model.userid();
  },
});

const queries = extendType({
  type: "Query",
  definition: (t) => {
    t.list.field("transcript", {
      type: "Transcript",
      resolve: async (_, __, ctx) => {
        if (!ctx.user?.id) return null;
        // if (!userid)
        //   throw new Error(
        //     "Please provide a user ID to the transcript query (/Transcript/index.ts)"
        //   );

        const transcript = await prisma.transcript.findMany({
          where: {
            userid: ctx.user.id,
          },
        });

        if (!transcript) return null;

        return transcript;
      },
    });
  },
});

const mutations = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nullable.field("createTranscript", {
      type: "Transcript",
      args: {
        title: nonNull(stringArg()),
        transcript: nonNull(stringArg()),
        expirationdate: nonNull(stringArg()),
        renderdate: nonNull(stringArg()),
        filetype: nonNull(stringArg()),
        status: nonNull(stringArg()),
        userid: nonNull(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        if (!ctx.user?.id) return null;

        return await prisma.transcript.create({
          data: {
            title: args.title,
            transcript: args.transcript,
            expirationdate: args.expirationdate,
            renderdate: args.renderdate,
            filetype: args.filetype,
            status: args.status,
            userid: args.userid,
          },
        });
      },
    });

    // t.nullable.field("getTranscripts", {
    //   type: "Transcript",
    //   args: {
    //     userid: nonNull(stringArg()),
    //   },
    //   resolve: async (_, args, ctx) => {
    //     if (!ctx.user?.id) return null;

    //     return await prisma.transcript.findMany({
    //       where: { userid: args.userid },
    //     });
    //   },
    // });
  },
});

export default [Transcript, mutations, queries];
