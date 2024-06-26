class APIFeatures {
    queryResult;
  
    constructor(modal, queryObj) {
      this.modal = modal; // Modal that find the data from DB
      this.queryObj = queryObj; // Object that create by express when get request coming with param
    }
  
    filter() {
      const queryObj = { ...this.queryObj };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((el) => delete queryObj[el]);
  
      // console.log(queryObj);
      // 1B) ADVANCED FILTERING
      // From { difficulty: 'easy', page: '2', price: { lte: '1500' } }
      // To { difficulty: 'easy', price: { lte: '1500' } }
  
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // Convert gte -> $gte
  
      this.queryResult = this.modal.find(JSON.parse(queryStr));
  
      return this;
    }
  
    sort() {
      if (this.queryObj.sort) {
        const sortBy = this.queryObj.sort.split(',').join(' ');
        this.queryResult = this.queryResult.sort(sortBy);
      } else {
        // this.queryResult = this.queryResult.sort("-createdAt");
      }
  
      return this;
    }
    
    // For getting specific fields
    limitFields() {
      if (this.queryObj.fields) {
        const fields = this.queryObj.fields.split(',').join(' ');
        this.queryResult = this.queryResult.select(fields);
      } else {
        this.queryResult = this.queryResult.select('-__v');
      }
  
      return this;
    }
  
    paginate() {
      const page = this.queryObj.page * 1 || 1;
      const limit = this.queryObj.limit * 1 || 100;
      const skip = (page - 1) * limit;
  
      this.queryResult = this.queryResult.skip(skip).limit(limit);
  
      // if (this.queryObj.page) {
      //   this.modal.countDocuments().then((numOfDocs) => {
      //     if (skip >= numOfDocs) {
      //       throw new Error('This page does not exist');
      //     }
      //   });
      // }
  
      return this;
    }
  }
  
  module.exports = APIFeatures;