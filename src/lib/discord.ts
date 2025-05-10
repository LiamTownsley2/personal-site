"use server";
export async function postWebhook(firstName: string, lastName: string, email: string, message: string) {
    const response = await fetch('https://discord.com/api/webhooks/1370471620959010932/xx9b-m7zOOIz5YeJgS8F01HB3Tx2B2v36wjAz7hZSI4GXdtQ0Oo1w195ggmlIueYiN0p', {
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