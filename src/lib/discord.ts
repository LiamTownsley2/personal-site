"use server";
export async function postWebhook(firstName: string, lastName: string, email: string, message: string) {
    if (process.env.DISCORD_WEBHOOK_URL) {
        const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: [
                    `<@867176043987075072>`,
                    `**First Name**: ${firstName}`,
                    `**Last Name**: ${lastName}`,
                    `**Email**: ${email}`,
                    `**Message**:\n\`\`\`${message.replace("`", "'")}\`\`\``,
                ].join('\n')
            }),
        })
        return response.ok;
    }
}