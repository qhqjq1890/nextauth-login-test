import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@libs/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let prisma = new PrismaClient();

  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { name, address, id, password } = data;

  if (!name || !address || !id || !password || password.trim().length < 7) {
    res.status(422).json({
      message: name + address + id + password,
      error: true,
    });
    return;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (existingUser) {
    res.status(422).json({ message: "User ID already exists!", error: true });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await prisma.user.create({
    data: {
      name: name,
      address: address,
      password: hashedPassword,
      id: id,
    },
  });

  if (result) {
    res.status(201).json({ message: "Created user!", error: false });
  } else {
    res.status(422).json({ message: "Prisma error occured!", error: true });
  }
}

export default handler;
