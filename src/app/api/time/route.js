let counter = 0;

export const GET = async () => {
    counter++;
    await new Promise(resolve => setTimeout(resolve, 3000));
   return Response.json({
    // currentTime: new Date().toLocaleTimeString(),
    counter: counter,
   })
}


    






