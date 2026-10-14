export const GET = async () => {
    const res = await fetch('https://addis-eats-backend.onrender.com/menu/')
    const data = await res.json();
    return Response.json({ status: 200, data: data.data });
} 


