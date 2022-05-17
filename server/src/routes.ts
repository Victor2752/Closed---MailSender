import express from "express";
import { NodemailMailAdapater } from "./adapters/nodemaller/nodemallerMailAdapter";
import { PrismaFeedbackRepository } from "./repositories/prisma/PrismaFeedbacksRepository";
import { SubmitFeedbackUseCase } from "./service/submitFeedbackService";

export const routes = express.Router();



routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    try {
        const prismaFeedbackRepository = new PrismaFeedbackRepository()
        const nodemailMailAdapater = new NodemailMailAdapater()
    
        const submitFeedbackUseCase = new SubmitFeedbackUseCase(
            prismaFeedbackRepository,
            nodemailMailAdapater
        )
    
        await submitFeedbackUseCase.execute({
            type,
            comment,
            screenshot,
        })

        return res.status(201).send()
    } 
    catch (err) {
        console.error(err);

        return res.status(500).send();
    }
})