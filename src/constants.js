const CONSTANTS = {
    allowedOrigin: 'http://localhost:4200',
    allowedOrigin2: 'http://localhost:3000',
    allowedOrigin3: 'http://localhost:3001',
    serCode: {
        success: 200,
        badRequest: 400,
        unauthorized: 401,
        forbidden: 403,
        notFound: 404,
        ISE: 500
    },
    serMsg: {
        '200': 'sussessfull',
        '400': 'Bad Request',
        '401': 'Unauthorized user',
        '403': 'Forbidden error',
        '404': 'Not Found',
        '500': 'Internal Server Error',
        'inValidUser': 'In valid user'
    },
    getSerMsg: (errorCode, msg) => (
        {
            status: (errorCode == 200) ? true : false,
            errorCode: errorCode,
            errorMsg: CONSTANTS.serMsg[errorCode],
            msg: msg || null
        }
    ),
    sessionTimeout: null,
    restro:{
        orderStatus:{
            'PENDING': 1,
            'ACCEPTED': 2,
            'PROCESSING': 3,
            'COMPLETED': 4,
            'DELIVERED': 5
        }
    }
}

module.exports = CONSTANTS;