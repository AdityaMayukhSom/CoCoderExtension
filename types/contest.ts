import * as z from "zod";

export const ContestPlatformSchema = z.enum([
  "CodeChef",
  "Codeforces",
  "LeetCode",
]);

export type ContestPlatform = z.infer<typeof ContestPlatformSchema>;

export const ContestDataSchema = z.object({
  platform: ContestPlatformSchema,
  displayName: z.string(),
  beginTime: z.string(),
  ceaseTime: z.string(),
  duration: z.string(),
  contestLink: z.url(),
});

export type ContestData = z.infer<typeof ContestDataSchema>;
