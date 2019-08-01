const listPublicEventsSchema = {
    properties: [
        {
            id: { type: 'string' },
            type: { type: 'string' },
            actor: { type: 'object' },
            repo: {
                id: { type: 'number' },
                name: { type: 'string' },
                url: { type: 'string' }
            },
            "payload": {
                "action": { type: 'string' },
                "number": { type: 'number' },
                "pull_request": {
                    "url": { type: 'string' },
                    "id": { type: 'number' },
                    "node_id": { type: 'string' },
                    "html_url": { type: 'string' },
                    "diff_url": { type: 'string' },
                    "patch_url": { type: 'string' },
                    "issue_url": { type: 'string' },
                    "number": { type: 'number' },
                    "state": { type: 'string' },
                    "locked": { type: 'boolean' },
                    "title": { type: 'string' },
                    "user": { type: 'object' },
                    "body": { type: 'string' },
                    "created_at": { type: 'string' },
                    "updated_at": { type: 'string' },
                    "closed_at": { type: 'string' },
                    "merged_at": { type: 'string' },
                    "merge_commit_sha": { type: 'string' },
                    "assignee": null,
                    "assignees": { type: 'array' },
                    "requested_reviewers": { type: 'array' },
                    "requested_teams": { type: 'array' },
                    "labels": { type: 'array' },
                    "milestone": null,
                    "commits_url": { type: 'string' },
                    "review_comments_url": { type: 'string' },
                    "review_comment_url": { type: 'string' },
                    "comments_url": { type: 'string' },
                    "statuses_url": { type: 'string' },
                    "head": { type: 'object' },
                    "base": { type: 'object' },
                    "_links": { type: 'object' },
                    "comments": { type: 'number' },
                    "review_comments": { type: 'number' },
                    "maintainer_can_modify": { type: 'boolean' },
                    "commits": { type: 'number' },
                    "additions": { type: 'number' },
                    "deletions": { type: 'number' },
                    "changed_files": { type: 'number' }
                }
            },
            "public": { type: 'boolean' },
            "created_at": { type: 'string' },
            "org": {
                "id": { type: 'number' },
                "login": { type: 'string' },
                "gravatar_id": { type: 'string' },
                "url": { type: 'string' },
                "avatar_url": { type: 'string' }
            }
        }
    ],
    required: ['id']
};


exports.listPublicEventsSchema = listPublicEventsSchema;