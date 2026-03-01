import { Request, Response } from "express";
import Contact from "../models/Contact.js";
import { sendEmail } from "../utils/sendEmail.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const createContact = catchAsync(async (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    throw new AppError("All fields are required", 400);
  }

  const newContact = await Contact.create({ name, email, message });

  await sendEmail(name, email, message);

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: newContact,
  });
});

//get all contacts
export const getContacts = catchAsync(async (req: Request, res: Response) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: contacts,
  });
});

//mark as read
export const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const contact = await Contact.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true },
  );
  if (!contact) {
    throw new AppError("Message not found", 404);
  }

  res.status(200).json({
    success: true,
    data: contact,
  });
});

//delete contact
export const deleteContact = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndDelete(id);

  if (!contact) {
    throw new AppError("Message not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Message deleted",
  });
});
