import { z } from 'zod';

const schema = z.object({
    title: z.string().min(1,"Title is required"),
    description: z.string().min(1,"Description is required"),
    username: z.string().min(1,"Username is required"),
    password: z.string().min(8,"Minimum 8 characters"),
    email: z.email().min(1, "Email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Invalid Email"),
    telephone: z.string().min(10,"Phone Number required").max(10,"Exact 10 digits").regex(/^[0-9]+?/,"Only Numbers"),
    url: z.url().min(1,"URL is required").regex(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,"Invalid URL"),
    date: z.string().nonempty("Date is required").transform(val => new Date(val)).refine(date => date <= new Date(), "Date cannot be in the future")
});

export { schema };