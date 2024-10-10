const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// Hàm tạo access token
dotenv.config();
const generalAccessToken = (payload) => {
  
    const accessToken = jwt.sign(
        { ...payload }, 
        process.env.ACCESS_TOKEN, 
        { expiresIn: '30d' }
    );

    return accessToken;
};
//refersh token.
const generalRefreshToken = (payload) => {
   
    const refresh_token = jwt.sign(
        { ...payload }, 
        process.env.REFRESH_TOKEN,  
        { expiresIn: '365d' }
    ); 

    return refresh_token;
};
const refreshTokenJwtService = async (token) => {
   
    return new Promise(async(resolve, reject) =>{
        try{
           
            jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) =>{
                if(err){
                    resolve({
                        status:'err',
                        message:'The authemtication '
                    })
                }

                console.log('user',user);
               
                const access_token = generalAccessToken({
                    id:user.id,
                    isAdmin:user.isAdmin
                })
                resolve(
                    {
                        status: 'OK',
                        message: 'susscess',
                        access_token
                    }
                 ) 
            })
            
               
           }catch(e){
                reject(e)
           }
    })
};
module.exports = {
    generalRefreshToken,
    generalAccessToken,
    refreshTokenJwtService
};
