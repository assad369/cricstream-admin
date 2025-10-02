const Joi = require('joi');

// Validation schemas
const schemas = {
    userSchema: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('admin', 'moderator')
    }),

    loginSchema: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),

    categorySchema: Joi.object({
        name: Joi.string().required(),
        slug: Joi.string().required(),
        description: Joi.string().allow(''),
        icon: Joi.string().allow('')
    }),

    streamSchema: Joi.object({
        title: Joi.string().required(),
        team1: Joi.object({
            name: Joi.string().required(),
            logo: Joi.string().allow('')
        }).required(),
        team2: Joi.object({
            name: Joi.string().required(),
            logo: Joi.string().allow('')
        }).required(),
        date: Joi.date().required(),
        streamURL: Joi.string().uri().required(),
        expiryTime: Joi.date().required(),
        category: Joi.string().required(),
        isLive: Joi.boolean().default(false)
    }),

    liveTvSchema: Joi.object({
        channelName: Joi.string().required(),
        logo: Joi.string().allow(''),
        url: Joi.string().uri().required(),
        category: Joi.string().required(),
        isLive: Joi.boolean().default(true),
        description: Joi.string().allow('')
    }),

    highlightSchema: Joi.object({
        title: Joi.string().required(),
        url: Joi.string().uri().required(),
        thumbnail: Joi.string().allow(''),
        category: Joi.string().required(),
        duration: Joi.string().allow(''),
        tags: Joi.array().items(Joi.string())
    }),

    socialLinkSchema: Joi.object({
        platform: Joi.string().required(),
        url: Joi.string().uri().required(),
        icon: Joi.string().allow(''),
        isActive: Joi.boolean().default(true),
        order: Joi.number().default(0)
    }),

    baseUrlSchema: Joi.object({
        url: Joi.string().uri().required(),
        description: Joi.string().allow(''),
        isActive: Joi.boolean().default(true)
    }),

    announcementSchema: Joi.object({
        title: Joi.string().required(),
        message: Joi.string().required(),
        isActive: Joi.boolean().default(true),
        priority: Joi.number().default(0),
        expiryDate: Joi.date()
    }),

    adSchema: Joi.object({
        type: Joi.string().valid('direct', 'banner').required(),
        title: Joi.string().required(),
        content: Joi.string().required(),
        isActive: Joi.boolean().default(true),
        position: Joi.string().valid('header', 'sidebar', 'footer', 'in-stream').default('header'),
        expiryDate: Joi.date()
    })
};

// Validation middleware
exports.validate = (schema) => {
    return (req, res, next) => {
        const { error } = schemas[schema].validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        next();
    };
};