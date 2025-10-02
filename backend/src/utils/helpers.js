// Generate slug from string
exports.generateSlug = (str) => {
    return str
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
};

// Format date for display
exports.formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Create pagination object
exports.createPagination = (page, limit, total) => {
    const pages = Math.ceil(total / limit);

    return {
        total,
        page,
        limit,
        pages,
        hasNext: page < pages,
        hasPrev: page > 1
    };
};

// Create API response
exports.createApiResponse = (success, message, data = null, pagination = null) => {
    const response = {
        success,
        message
    };

    if (data) {
        response.data = data;
    }

    if (pagination) {
        response.pagination = pagination;
    }

    return response;
};