var config = require('./../config.js');
var knex = require('knex')(config.mysql);

class basicModel {
  constructor(props) {
    this.table = props;
  }

  knex() {
    return knex(this.table)
  }

  where(params) {
    return knex(this.table).where(params);
  }

  all() {
    return knex(this.table).select();
  }

  insert (params) {
    return knex(this.table).insert(params);
  }

  show(params) {
    return knex(this.table).where(params).select();
  }

  ArrDelete(params) {
    return knex(this.table).where(params).del()
  }

  update(id,params) {
    return knex(this.table).where('id', '=', id).update(params);
  }

  sortDelete (id) {
    return knex(this.table).where('id', '=', id).update({ isdeleted: 0})
  }

  sortAll (key) {
    return knex(this.table).whereNull(key).select();
  }
}

module.exports = basicModel;
