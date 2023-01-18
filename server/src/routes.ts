import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import { number, z } from 'zod';
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  app.post('/habits', async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(number().min(0).max(6))
    })

    const { title, weekDays } = createHabitBody.parse(request.body);

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map(weekDay => ({ week_day: weekDay }))
        }
      }
    })
  });

  app.get('/days', async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date()
    })

    const { date } = getDayParams.parse(request.query)

    const parsedDate = dayjs(date).startOf('day')

    const weekDay = parsedDate.get('day')

    // todos os hábitos possíveis e os já completados

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: { lte: date },
        weekDays: { some: { week_day: weekDay } }
      }
    })

    const day = await prisma.day.findUnique({
      where: { date },
      include: { dayHabits: true }
    })

    const completedHabist = day?.dayHabits.map(dayHabit => dayHabit.habit_id)

    return { possibleHabits, completedHabist }
  })
}
