 import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const applyToJob = async (req: Request, res: Response) => {
  try {
    const candidateId = (req as any).userId
    const jobId = parseInt(req.params.id as string)

    const existing = await prisma.application.findFirst({
      where: { jobId, candidateId }
    })
    if (existing) return res.status(400).json({ error: 'Already applied' })

    const application = await prisma.application.create({
      data: { jobId, candidateId }
    })
    res.status(201).json({ message: 'Application submitted', application })
  } catch (error) {
    res.status(500).json({ error: 'Could not apply' })
  }
}

export const getMyApplications = async (req: Request, res: Response) => {
  try {
    const candidateId = (req as any).userId
    const applications = await prisma.application.findMany({
      where: { candidateId },
      include: { job: true }
    })
    res.json(applications)
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch applications' })
  }
}