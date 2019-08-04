var config = require('./../config.js');
var knex = require('knex')(config.mysql);

class basicModel {
  constructor(props) {
    this.table = props;
  }

  knex() {
    return knex(this.table)
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

  update(id,params) {
    return knex(this.table).where('id', '=', id).update(params);
  }

  sortDelete (id) {
    return knex(this.table).where('id', '=', id).update({ isdeleted: 1})
  }

  sortAll () {
    return knex(this.table).whereNull('isdeleted').select();
  }

  count(params) {
    return knex(this.table).where(params).count('id as total');
  }

  pagination (pageSize = 20, currentPage = 1, params={}) {
    let offset = (currentPage - 1) * pageSize;
    return knex(this.table)
      .where(params)
      .offset(offset)
      .limit(pageSize)
      .select()
  }
}

module.exports = basicModel;
