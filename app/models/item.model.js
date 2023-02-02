/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        description: String,
        price: Boolean,
        dealerId: Number,
        imgUrls: [String],
        make: String,
        model: String,
        year: String

      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Item = mongoose.model("item", schema);
    return Item;
  };