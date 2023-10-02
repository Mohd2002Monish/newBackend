const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  vendorName: String,
  bankAccountNo: String,
  bankName: String,
  address: {
    line1: String,
    line2: String,
    city: String,
    country: String,
    zipCode: String,
  },
});

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
