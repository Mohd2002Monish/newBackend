const express = require("express");
const Vendor = require("../Model/Vendor.schema");
const app = express();
app.use(express.json());
app.get("/vendors", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 9;
  const skip = (page - 1) * perPage;

  try {
    const vendors = await Vendor.find({}).skip(skip).limit(perPage);
    const totalVendorsCount = await Vendor.countDocuments();

    if (!vendors) {
      return res.status(404).json({ message: "Vendors not found" });
    }

    const totalPages = Math.ceil(totalVendorsCount / perPage);

    res.json({ vendors, totalPages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/vendor/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ _id: req.params.id });
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/vendors", async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    return res.status(201).send(vendor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/vendor/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.json({ message: "Vendor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/vendor/:id", async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.json({ message: "Vendor updated successfully", updatedVendor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = app;
