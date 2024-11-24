import { z } from 'zod';

export const AchievementDto = z.object({
  achievementId: z.number(),
  achievementName: z.string(),
  achievementDescription: z.string().optional(),
  achievementImageUrl: z.string().optional(),
  achievementLevelId: z.number(),
  achievementLevelName: z.string(),
  achievementLevelImgUrl: z.string().optional(),
  achievementHasProgressTracking: z.boolean(),
  achievedAt: z.date().optional(),
  userId: z.number(),
  periodId: z.number(),
  progress: z
    .object({
      quantity: z.number(),
      required: z.number(),
    })
    .optional(),
});

export type AchievementDto = z.input<typeof AchievementDto>;
