import * as yup from 'yup';

// Validation schemas
export const loginSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
});

export const categorySchema = yup.object().shape({
    name: yup.string()
        .required('Name is required'),
    slug: yup.string()
        .required('Slug is required')
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens'),
    description: yup.string(),
    icon: yup.string().nullable().transform((value) => value === '' ? null : value).url('Invalid URL')
});

export const streamSchema = yup.object().shape({
    title: yup.string()
        .required('Title is required'),
    team1: yup.object().shape({
        name: yup.string()
            .required('Team 1 name is required'),
        logo: yup.string().nullable().transform((value) => value === '' ? null : value).url('Invalid URL')
    }),
    team2: yup.object().shape({
        name: yup.string()
            .required('Team 2 name is required'),
        logo: yup.string().nullable().transform((value) => value === '' ? null : value).url('Invalid URL')
    }),
    date: yup.date()
        .required('Date is required'),
    streamURL: yup.string()
        .url('Invalid URL')
        .required('Stream URL is required'),
    expiryTime: yup.date()
        .required('Expiry time is required')
        .min(yup.ref('date'), 'Expiry time must be after the stream date'),
    category: yup.string()
        .required('Category is required'),
    isLive: yup.boolean()
});

export const liveTvSchema = yup.object().shape({
    channelName: yup.string()
        .required('Channel name is required'),
    logo: yup.string().nullable().transform((value) => value === '' ? null : value).url('Invalid URL'),
    url: yup.string()
        .url('Invalid URL')
        .required('URL is required'),
    category: yup.string()
        .required('Category is required'),
    isLive: yup.boolean(),
    description: yup.string()
});

export const highlightSchema = yup.object().shape({
    title: yup.string()
        .required('Title is required'),
    url: yup.string()
        .url('Invalid URL')
        .required('URL is required'),
    thumbnail: yup.string().nullable().transform((value) => value === '' ? null : value).url('Invalid URL'),
    category: yup.string()
        .required('Category is required'),
    duration: yup.string(),
    tags: yup.array().of(yup.string())
});

export const socialLinkSchema = yup.object().shape({
    platform: yup.string()
        .required('Platform is required'),
    url: yup.string()
        .url('Invalid URL')
        .required('URL is required'),
    icon: yup.string().nullable().transform((value) => value === '' ? null : value).url('Invalid URL'),
    isActive: yup.boolean(),
    order: yup.number()
});

export const baseUrlSchema = yup.object().shape({
    url: yup.string()
        .url('Invalid URL')
        .required('URL is required'),
    description: yup.string(),
    isActive: yup.boolean()
});

export const announcementSchema = yup.object().shape({
    title: yup.string()
        .required('Title is required'),
    message: yup.string()
        .required('Message is required'),
    isActive: yup.boolean(),
    priority: yup.number(),
    expiryDate: yup.date()
});

export const adSchema = yup.object().shape({
    type: yup.string()
        .oneOf(['direct', 'banner'], 'Type must be either direct or banner')
        .required('Type is required'),
    title: yup.string()
        .required('Title is required'),
    content: yup.string()
        .required('Content is required'),
    isActive: yup.boolean(),
    position: yup.string()
        .oneOf(['header', 'sidebar', 'footer', 'in-stream'], 'Invalid position'),
    expiryDate: yup.date()
});

export const changePasswordSchema = yup.object().shape({
    currentPassword: yup.string()
        .required('Current password is required'),
    newPassword: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('New password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm password is required')
});