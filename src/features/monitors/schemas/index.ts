import { z } from 'zod';
import { HttpMethod } from '../types';

export const monitorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.preprocess(
    (value) => {
      if (typeof value !== 'string') return value;
      if (value && !value.startsWith('http://') && !value.startsWith('https://')) {
        return `https://${value}`;
      }
      return value;
    },
    z.string().url('Must be a valid URL')
  ),
  method: z.nativeEnum(HttpMethod),
  interval: z.coerce.number().refine((value) => [60, 300, 600].includes(value), {
    message: 'Interval must be 60, 300, or 600 seconds',
  }),
  timeout: z.coerce.number().min(1, 'Minimum 1 second').max(60, 'Maximum 60 seconds'),
  fail_threshold: z.coerce.number().min(1, 'Minimum 1'),
  notify_email: z.string().email('Must be a valid email'),
  is_active: z.boolean(),
});

export type MonitorFormValues = z.infer<typeof monitorSchema>;
