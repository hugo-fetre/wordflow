"use server";

import { revalidatePath } from "next/cache";

import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import { auth } from "@clerk/nextjs/server";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function findUserByStripeCustomerId(stripeCustomerId: string){
  try {
    await connectToDatabase();

    const user = await User.findOne({ stripeCustomerId: stripeCustomerId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// CHECK USER CREATION
export async function checkUser() {
    const { userId }= await auth();
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });

    if (!user){
      return false;
    }
    return true;
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function updateSelectedPlan(userId: string, updateUserData: updateUserSelectedPlanParams){
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ _id: userId }, updateUserData, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUserSubscription(userId: string, updateUserData: updateUserSubscriptionParams){
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ _id: userId }, updateUserData, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function cancelUserSubscription(userId: string, cancelData: cancelUserSubscriptionParams){
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ _id: userId }, cancelData, {
      new: true,
    });

    if (!updatedUser) throw new Error("Cancel subscription failed");
    
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function blockUserAccess(userId: string, cancelData: cancelUserSubscriptionParams){
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ _id: userId }, cancelData, {
      new: true,
    });

    if (!updatedUser) throw new Error("Cancel subscription failed");
    
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}


// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee }},
      { new: true }
    )

    if(!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}