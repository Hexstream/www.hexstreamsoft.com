export async function onRequest(context) {
    const response = await context.env.R2.fetch(context.request);
    if (response.status === 404)
        return await context.next();
    else
        return response;
}
