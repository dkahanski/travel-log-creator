import z from "zod";
import db from "~~/lib/db";
import { insertLocationSchema, location } from "~~/lib/db/schema";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unautorized",
    }));
  }

  // await new Promise((resolve) => {
  //   setTimeout(resolve, 5000);
  // });

  const body = await readValidatedBody(event, insertLocationSchema.safeParse);

  if (!body.success) {
    const errors = z.flattenError(body.error);
    const fieldErrors = Object.fromEntries(Object.entries(errors.fieldErrors).map(([key, value]) => {
      return [key, value.join(";")];
    }));

    return sendError(event, createError({
      statusCode: 422,
      statusMessage: "Invalid Body.",
      data: fieldErrors,
    }));
  }

  const created = db.insert(location).values({
    ...body.data,
    userId: event.context.user.id,
    slug: body.data.name.replaceAll(" ", "-").toLowerCase(),
  }).returning();

  return created;
});
