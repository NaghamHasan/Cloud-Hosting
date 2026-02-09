import { Comment } from "@/generated/prisma";
import { Domain } from "@/utils/constance";
import { cookies } from "next/headers";

export const GetComments = async () : Promise<Comment[]> => {
    const token = (await cookies()).get("token")?.value;
      const response = await fetch(`${Domain}/api/comments`,{
        headers: {
          Cookie: `token=${token}`
        }
      });
      if(!response.ok){
        throw new Error("Error in fetch comment")}
    return response.json()
}