const noFound=(req,res,next)=>{
    const err=new Error(`not found - ${req.originalUrl}`)
    res.status(404)
    next(err)
}

const errHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode===200?500:res.statusCode
    res.status(statusCode).json({message:err.message})
}

module.exports={
    noFound,
    errHandler
}