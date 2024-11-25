const asyncHandler = (requestHandler) =>{
    (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next )).
        catch((err)=>next(err))
    }
}


export {asyncHandler}




// const asyncHandler = () =>{}
// const asyncHandler = (func) => () =>{}  it's a wrapper function
// const asyncHandler = (func) => async () => {}


// const asyncHandler = (fn) => async (req,res,next) => {
//     try {
//         await 
//     } catch (error) {
// res.status(err.code || 500).json({success: false, message: err.message})    }
// }

// async await with try catch