import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createJob = async (req: Request, res: Response) => {
  try {
    const { title, company, location, description, salary } = req.body
    const employerId = (req as any).userId
    const job = await prisma.job.create({
      data: { title, company, location, description, salary, employerId }
    })
    res.status(201).json(job)
  } catch (error) {
    res.status(500).json({ error: 'Could not create job' })
  }
}

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await prisma.job.findMany({
      include: { employer: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    })
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch jobs' })
  }
}

export const getJob = async (req: Request, res: Response) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(req.params.id as string) },
      include: { employer: { select: { name: true, email: true } } }
    })
    if (!job) return res.status(404).json({ error: 'Job not found' })
    res.json(job)
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch job' })
  }
}