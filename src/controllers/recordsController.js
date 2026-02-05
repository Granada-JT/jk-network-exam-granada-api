import argon2 from 'argon2';
import prisma from '../lib/prisma.js';

export const getRecords = async (req, res) => {
  try {
    const records = await prisma.employee_records.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const sanitizedRecords = records.map(record => ({
      ...record,
      password: "" 
    }));

    return res.status(200).json(sanitizedRecords);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getRecord = async (req, res) => {
  const { recordId } = req.params;
  try {
    const record = await prisma.employee_records.findUnique({ 
      where: { id: recordId } 
    });
    
    if (!record) return res.status(404).json({ error: "Record not found" });
    return res.status(200).json(record);
  } catch (error) {
		console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const addRecord = async (req, res) => {
  try {
    const { firstName, lastName, email, username, country, accountType, password, imageSrc, phone, address } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }

    const hashed = await argon2.hash(password, {
      type: argon2.argon2id,
    });
    
    const newRecord = await prisma.employee_records.create({ 
      data: {
        firstName,
        lastName,
        email,
        password: hashed,
        username,
        country,
        accountType,
        imageSrc,
        phone,
        address
      } 
    });

    return res.status(201).json({ success: true, id: newRecord.id });
  } catch (error) {
		console.error(error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: "Email already exists" });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const updateRecord = async (req, res) => {
  const { recordId } = req.params;
  const { firstName, lastName, email, username, country, accountType, password, imageSrc, phone, address } = req.body;

  try {
    const updateData = {
      firstName,
      lastName,
      email,
      username,
      country,
      accountType,
      imageSrc,
      phone,
      address
    };

    if (password && password.trim() !== "") {
      if (password.length < 8) {
        return res.status(400).json({ error: "New password must be at least 8 characters" });
      }

      const hashed = await argon2.hash(password, {
        type: argon2.argon2id,
      });
      
      updateData.password = hashed;
    }

    const updated = await prisma.employee_records.update({
      where: { id: recordId },
      data: updateData
    });

    return res.status(200).json({ success: true, id: updated.id });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, error: "Record not found for update" });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ error: "Email or Username already exists" });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const deleteRecord = async (req, res) => {
  const { recordId } = req.params;
  try {
    await prisma.employee_records.delete({ 
      where: { id: recordId } 
    });
    return res.status(200).json({ success: true, message: "Employee record deleted successfully" });
  } catch (error) {
		console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, error: "Record not found for deletion" });
    }
    return res.status(500).json({ error: error.message });
  }
};
