var qiniu = require('qiniu');
var config = require('./../config');
var accessKey = config.qiniu.AccessKey;
var secretKey = config.qiniu.SecretKey
var domain = config.qiniu.domain




const qiniuController = {
    setQiniuToken:function(req, res,next){
        try{
            var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
            var options = {
                scope: config.qiniu.bucket
            };
            var putPolicy = new qiniu.rs.PutPolicy(options);
            var uploadToken=putPolicy.uploadToken(mac);

            res.json({code:200, data:{uploadToken,domain}, message:'请求成功'})
        }catch{
            res.json({code:0, message:"服务器错误"})
        }
    }

};

module.exports = qiniuController;