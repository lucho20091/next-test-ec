"use server";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";

export const createNewUser = async () => {
  try {
    const user = await stackServerApp.getUser();
    if (!user) return null;
    const newUser = await prisma.user.create({
      data: {
        email: user.primaryEmail,
        name: user.displayName || user.primaryEmail,
      },
    });
    return newUser;
  } catch (e) {
    return null;
  }
};

export const getDummyUser = async () => {
  try {
    const user = await stackServerApp.getUser();
    let existingUser;
    if (!user) {
      existingUser = await prisma.user.findUnique({
        where: { email: "johndoe@example.com" },
      });
    }
    if (existingUser.shippingAddress) {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          shippingAddress: {
            fullName: "John Doe",
            phoneNumber: "18004006000",
            address: "123 Main St",
            city: "New York",
            postalCode: "10001",
          },
        },
      });
    }
    return existingUser;
  } catch (e) {
    return null;
  }
};

export const getUserByEmail = async () => {
  try {
    const user = await stackServerApp.getUser();
    if (!user) return null;
    const existingUser = await prisma.user.findUnique({
      where: { email: user.primaryEmail },
    });
    if (!existingUser) return null;
    return existingUser;
  } catch (e) {
    return null;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await stackServerApp.getUser();
    if (!user) return null;
    const adminUser = await prisma.user.findMany({
      where: { email: user.primaryEmail },
    });
    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (adminUser.isAdmin) {
      return existingUser;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const updateShippingAddress = async (data) => {
  try {
    const user = await stackServerApp.getUser();
    if (!user) return null;
    const existingUser = await prisma.user.findUnique({
      where: { email: user.primaryEmail },
    });
    if (!existingUser) return null;
    const updateUser = await prisma.user.update({
      where: {
        email: existingUser.email,
      },
      data: {
        shippingAddress: {
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
        },
      },
    });
    return updateUser;
  } catch (e) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const user = await stackServerApp.getUser();
    if (!user) return null;
    const existingUser = await prisma.user.findUnique({
      where: { email: user.primaryEmail },
    });
    if (!existingUser) return null;
    if (existingUser.isAdmin) {
      const allUsers = await prisma.user.findMany();
      return allUsers;
    }
  } catch (e) {
    return null;
  }
};

export const isAdmin = async () => {
  try {
    const user = await stackServerApp.getUser();
    if (!user) return null;
    const existingUser = await prisma.user.findUnique({
      where: {
        email: user.primaryEmail,
      },
    });
    if (!existingUser) return null;
    if (!existingUser.isAdmin) return null;
    return existingUser;
  } catch (e) {
    return null;
  }
};
