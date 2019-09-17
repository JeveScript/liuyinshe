var qiniu = require('qiniu');
var config = require('./../config');
var accessKey = config.qiniu.AccessKey;
var secretKey = config.qiniu.SecretKey
var domain = config.qiniu.domain
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var options = {
    scope: 'liuyinshe',
  };
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);

const qiniuController = {
    setQiniuToken:function(req, res,next){
        try{
            console.log(uploadToken,123)
            res.json({code:200, data:{uploadToken,domain}, messsage:'请求成功'})
        }catch{
            res.json({code:0, messsage:"服务器错误"})
        }
    }

};

module.exports = qiniuController;