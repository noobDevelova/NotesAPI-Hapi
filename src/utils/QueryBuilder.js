class QueryBuilder {
  static insert(table, data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 1}`);

    return {
      text: `INSERT INTO ${table} (${columns.join(', ')}) VALUES(${placeholders.join(', ')}) RETURNING id`,
      values,
    };
  }

  static update(table, data, where) {
    const setColumns = Object.keys(data)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');
    const values = [...Object.values(data)];

    let whereClause = '';
    if (where) {
      const whereStart = values.length + 1;
      whereClause = ` WHERE ${Object.keys(where)
        .map((key, index) => `${key} = $${whereStart + index}`)
        .join(' AND ')}`;
      values.push(...Object.values(where));
    }

    return {
      text: `UPDATE ${table} SET ${setColumns}${whereClause} RETURNING id`,
      values,
    };
  }

  static delete(table, where) {
    const values = Object.values(where);
    const whereClause = Object.keys(where)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(' AND ');

    return {
      text: `DELETE FROM ${table} WHERE ${whereClause}`,
      values,
    };
  }

  static select(table, columns = ['*'], where = null) {
    const values = [];
    let whereClause = '';

    if (where) {
      whereClause = ` WHERE ${Object.keys(where)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(' AND ')}`;
      values.push(...Object.values(where));
    }

    return {
      text: `SELECT ${columns.join(', ')} FROM ${table}${whereClause}`,
      values,
    };
  }
}

module.exports = QueryBuilder;
