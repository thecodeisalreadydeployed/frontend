import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const JWT = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const token = await getToken({ req, secret, raw: true });
  res.send(JSON.stringify(token, null, 2));
};

export default JWT;
