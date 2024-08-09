import postHandler from "@/handlers/post_handler";

export async function createReport(data: any) {
  try {
    const response = await postHandler("/reports/create", data);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  } catch (error: any) {
    throw new Error(error.message ?? "Something went wrong");
  }
}
