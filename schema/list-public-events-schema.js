const listPublicEventsSchema = {
    properties: {
        id: { type: 'string' },
        type: { type: 'string' },
        actor: { type: 'object' },
        repo: { type: 'object' },
        payload: { type: 'object' },
        public: { type: 'boolean' },
        created_at: { type: 'string' },
        org: { type: 'object' }
    },
    required: ['id', 'type', 'actor', 'repo', 'payload', 'public', 'created_at']
};

const publicActorSchema = {
    properties: {
        "id": { type: 'number' },
        "login": { type: 'string' },
        "display_login": { type: 'string' },
        "gravatar_id": { type: 'string' },
        "url": { type: 'string' },
        "avatar_url": { type: 'string' } 
    },
    required: []
};

exports.listPublicEventsSchema = listPublicEventsSchema;
exports.publicActorSchema = publicActorSchema;