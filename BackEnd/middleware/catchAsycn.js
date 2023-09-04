let catchAsync = myfn => (req, res, next) => {
    Promise.resolve(myfn(req, res, next)).catch(next)
}

module.exports = catchAsync

