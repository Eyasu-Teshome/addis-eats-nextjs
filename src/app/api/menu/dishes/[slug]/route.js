export const GET = async (request, { params }) => {
    const { slug } = await params
    const res = await fetch(`https://addis-eats-backend.onrender.com/menu/`)
    const data = await res.json()
    const dish = data.data.find((item) => item.slug === slug)
    if (!dish) {
        return Response.json({ status: 404, message: `Dish with a slug ${slug} not found` })
    }
    
    return Response.json({status: 200, data: dish })
}