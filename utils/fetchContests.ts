import {
  ContestData,
  ContestDataSchema,
  ContestPlatform,
  ContestPlatformSchema,
} from "@/types/contest";
import axios, { AxiosError } from "axios";
import z from "zod";

export const ContestListRequestSchema = z.object({
  platforms: z.array(ContestPlatformSchema),
});

export type ContestListRequest = z.infer<typeof ContestListRequestSchema>;

export const ContestListResponseSchema = z.object({
  message: z.string(),
  contests: z.array(ContestDataSchema),
});

export type ContestListResponse = z.infer<typeof ContestListResponseSchema>;

export const fetchContests = async (
  ...platforms: ContestPlatform[]
): Promise<ContestData[]> => {
  try {
    const params: ContestListRequest = { platforms };
    const response = await axios.get<ContestListResponse>(
      `/api/upcoming-contests`,
      { baseURL: "https://www.adityamayukhsom.me", params: params }
    );
    const jsonResponse = response.data;
    const parsedData = ContestListResponseSchema.parse(jsonResponse);
    return parsedData.contests;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error("Axios API Fetch Error:" + axiosError.message);
    } else {
      throw new Error(
        `An unexpected error occurred: ${(error as Error).message}`
      );
    }
  }
};
