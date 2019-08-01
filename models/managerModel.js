var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '123456',
    database : 'liuyinshe_v1'
  }
});

const TABLE = 'manager';
const managerModel = {
  insert: function (params) {
    return knex(TABLE).insert(params);
  },
  show: function(params) {
    return knex(TABLE).where(params).select();
  },
  update: function(id,params) {
    return knex(TABLE).where('id', '=', id).update(params);
  },
  sortDelete: function(id) {
    return knex(TABLE).where('id', '=', id).update({ isdeleted: 1})
  },
  index: function() {
    return knex(TABLE).whereNull('isdeleted').select();
  }
}

module.exports = managerModel;
