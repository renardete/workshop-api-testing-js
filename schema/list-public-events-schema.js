const listPublicEventsSchema = {
    properties: {
            id: { type: 'string' },
            type: { type: 'string' },
            actor: { type: 'object' },
            repo:{ type: 'object' },
            payload: { type: 'object' },
            public: { type: 'boolean' },
            created_at: { type: 'string' },
            org: { type: 'object' }
        },
    required: ['id', 'type', 'actor', 'repo', 'payload', 'public', 'created_at', 'org']
};


exports.listPublicEventsSchema = listPublicEventsSchema;