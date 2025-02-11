import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public defaultRes: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(defaultRes: Query<T[], T>, query: Record<string, unknown>) {
    this.defaultRes = defaultRes;
    this.query = query;
  }

  search(searchFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.defaultRes = this?.defaultRes?.find({
        $or: searchFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queries = { ...this?.query };
    const excludeTerms = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeTerms.forEach((element) => {
      delete queries[element];
    });
    this.defaultRes = this.defaultRes.find(queries as FilterQuery<T>);
    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.defaultRes = this.defaultRes.sort(sort);
    return this;
  }

  pagination() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 9;
    const skip = (page - 1) * limit;

    this.defaultRes = this?.defaultRes?.skip(skip).limit(limit);
    return this;
  }

  select() {
    const selectedFields =
      (this?.query?.select as string)?.split('.')?.join(' ') || '-__v';
    this.defaultRes = this.defaultRes.select(selectedFields);
    return this;
  }

  async countTotal() {
    const totQuery = this.defaultRes.getFilter();
    const totalResult = await this.defaultRes.model.countDocuments(totQuery);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 9;
    const totalPage = Math.ceil(totalResult / limit);

    return {
      page,
      limit,
      totalResult,
      totalPage,
    };
  }
}

export default QueryBuilder;
